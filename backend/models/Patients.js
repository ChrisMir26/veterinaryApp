import mongoose from "mongoose";

const patientsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: false,
    },
    symptoms: {
      type: String,
      require: true,
    },
    vet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinario",
    },
  },
  {
    timestamps: true,
  }
);

const Patients = mongoose.model("Patients", patientsSchema);

export default Patients;
