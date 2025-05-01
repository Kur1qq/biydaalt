import Drugs from "../models/drugs.model.js"
import mongoose from "mongoose";

export const getDrugs = async (req, res) => {
    try {
        const drugs = await Drugs.find({});
        res.status(200).json({ success: true, data: drugs }); // Бүх эмийг буцаах
    } catch (error) {
        console.log("Error in fetching drugs: ", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const searchDrugsByName = async (req, res) => {
    try {
        const { name } = req.query;  // Хайлтаар ирсэн нэр
        if (!name) {
            return res.status(400).json({ success: false, message: "Please provide a drug name" });
        }

        const drugs = await Drugs.find({
            name: { $regex: name, $options: "i" }  // Бүтэн нэрээр хайх, case-insensitive
        });

        res.status(200).json({ success: true, data: drugs });
    } catch (error) {
        console.log("Error in searching drugs:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const postDrugs = async(req, res) => {
    const drugs = req.body;
    if(!drugs.name || !drugs.drug_class || !drugs.warnings || !drugs.side_effect || !drugs.discription || !drugs.drug_file){
        return res.status(400).json({success: false, message: "please provide fields"});
    }
    const newDrugs = new Drugs(drugs);
    try {
        await newDrugs.save();
        res.status(200).json({success: true, data: newDrugs});
    } catch (error) { 
        console.log("Error in create drug:", error.message);
        res.status(500).json({success: false, message: "server error"});
        
    }
};

export const putDrugs = async(req, res) => {
    const {id} = req.params;

    const drugs = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "invalid drug id"});
    }

    try {
        const UpdetedDrug = await Drugs.findByIdAndUpdate(id, drugs, {new: true});
        res.status(200).json({success : true, data: UpdetedDrug}); 
    } catch (error) {
        res.status(500).json({success : false, message: "server error"});
    }
};

export const deleteDrugs = async(req, res) => {
    const {id} = req.params;

    try {
        await Drugs.findByIdAndDelete(id);
        res.status(200).json({success : true, message : "Drug deleted"});
    } catch (error) {
        console.log("error in deleting drug: ", error.message);
        res.status(404).json({success : false, message : "drug not found"});
    }
};
