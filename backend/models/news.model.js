import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    source: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const News = mongoose.model('News', newsSchema);
export default News;
