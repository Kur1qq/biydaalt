import mongoose from "mongoose";

const drugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    drug_class: {
        type: String,
        required: true
    },
    warnings: {
        type: String,
        required: true
    },
    similiar_drug: {
        type: String,
        required: false
    },
    side_effect: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    drug_file: {
        type: String,
        required: true
    }

}, {
    timestamps: true 
});

const Drugs = mongoose.model('Drugs', drugSchema);
export default Drugs;