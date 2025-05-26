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
    },
    uses_indications: {
        type: String,
        required: false
    },
    dosage_use: {
        type: String,
        required: false
    },

    Allergies_contraindications: {
        type: String,
        required: false
    },

    Manufacturer_nationlaty: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Drugs = mongoose.model('Drugs', drugSchema);
export default Drugs;