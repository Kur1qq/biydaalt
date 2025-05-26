import News from "../models/news.model.js";
import mongoose from "mongoose";
import fs from 'fs';
import saveNewsImage from "../utils/newsSaveImage.js";
export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Мэдээ татаж чадсангүй" });
  }
};

export const getNewsByIdPublic = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.json(news);
  } catch (error) {
    res.status(404).json({ error: "Мэдээ олдсонгүй" });
  }
};

export const postNews = async (req, res) => {
  try {
    const { title, content, source } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Зураг оруулна уу" });
    }

    const fileData = fs.readFileSync(req.file.path, { encoding: 'base64' });
    const savedFilePath = saveNewsImage(fileData, req.file.originalname);
    const fileName = req.file.originalname;

    const newNews = new News({ title, content, source, image: fileName });
    await newNews.save();

    fs.unlinkSync(req.file.path); // түр файл устгана

    res.status(201).json({ success: true, data: newNews });
  } catch (error) {
    console.error("Error creating news:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const putNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Мэдээ засахад алдаа гарлаа" });
  }
};

export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Мэдээ устгагдлаа" });
  } catch (error) {
    res.status(500).json({ error: "Мэдээ устгахад алдаа гарлаа" });
  }
};
