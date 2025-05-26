import Drugs from "../models/drugs.model.js"
import mongoose from "mongoose";
import fs from 'fs';
import saveImageFromBase64 from '../utils/saveImageFromBase64.js';


export const getDrugs = async (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;
  
      let query = {};
      if (search && search.trim() !== "") {
        query.name = { $regex: search, $options: "i" };
      }
  
      const [drugs, total] = await Promise.all([
        Drugs.find(query)
          .select('name drug_class warnings side_effect discription') 
          .skip(skip)
          .limit(limit),
        Drugs.countDocuments(query)
      ]);
  
      res.status(200).json({ 
        success: true, 
        data: drugs,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      });
    } catch (error) {
      console.error("Error in fetching drugs:", error.message);
      res.status(500).json({ success: false, message: "Серверийн алдаа" });
    }
  };
export const getDrugByIdPublic = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "invalid drug id" });
    }

    try {
        const drug = await Drugs.findById(id);
        if (!drug) {
            return res.status(404).json({ success: false, message: "drug not found" });
        }
        res.status(200).json({ success: true, data: drug });
    } catch (error) {
        console.log("Error fetching drug by id:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};


export const postDrugs = async (req, res) => {
    try {
      const { name, drug_class, warnings, similiar_drug, side_effect, discription } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Файл оруулна уу" });
      }
  
      if (!name || !drug_class || !warnings || !side_effect || !discription) {
        return res.status(400).json({ success: false, message: "Заавал бөглөх талбарууд дутуу байна" });
      }
  
      const fileData = fs.readFileSync(req.file.path, { encoding: 'base64' });
  
      const savedFilePath = saveImageFromBase64(fileData, req.file.originalname);
  
      const fileName = req.file.originalname;
  
      const newDrugs = new Drugs({
        name,
        drug_class,
        warnings,
        similiar_drug,
        side_effect,
        discription,
        drug_file: fileName, // base64 биш файлын нэр
      });
  
      await newDrugs.save();
  
      fs.unlinkSync(req.file.path); // Түр файл устгах
  
      res.status(201).json({ success: true, data: newDrugs });
  
    } catch (error) {
      console.error("Error in create drug:", error.message);
      res.status(500).json({ success: false, message: "server error" });
    }
  };
  

const exportImage = (req, res) => {
  const { drug_file } = req.body; // base64 өгөгдөл

  if (!drug_file) {
    return res.status(400).json({ message: 'Зураг олдсонгүй' });
  }

  try {
    const savedPath = saveImageFromBase64(drug_file, 'exported_drug.jpg');
    res.status(200).json({ message: 'Зураг хадгалагдлаа', path: savedPath });
  } catch (err) {
    res.status(500).json({ message: 'Хадгалах үед алдаа гарлаа', error: err });
  }
};


export const putDrugs = async (req, res) => {
    const { id } = req.params;

    const drugs = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "invalid drug id" });
    }

    try {
        const UpdetedDrug = await Drugs.findByIdAndUpdate(id, drugs, { new: true });
        res.status(200).json({ success: true, data: UpdetedDrug });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const deleteDrugs = async (req, res) => {
    const { id } = req.params;

    try {
        await Drugs.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Drug deleted" });
    } catch (error) {
        console.log("error in deleting drug: ", error.message);
        res.status(404).json({ success: false, message: "drug not found" });
    }
};


export const browseDrugs = async (req, res) => {
    try {
        const { search, startsWith } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        } else if (startsWith) {
            // Том/жижиг үсгийг үл тоомсорлох
            query.name = { 
                $regex: `^${startsWith}`,
                $options: 'i'  // Case-insensitive
            };
        }

        const drugs = await Drug.find(query);
        res.status(200).json({ data: drugs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};