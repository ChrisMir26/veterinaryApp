import Patients from "../models/Patients.js";
import mongoose from 'mongoose'; 

export const addPatient = async (req, res) => {
    const patient = new Patients(req.body);
    patient.vet = req.veterinario?._id;

    try {
        const patientSave = await patient.save();
        res.json(patientSave);
    } catch (error) { }
};

export const getPatients = async (req, res) => {

    const patients = await Patients.find().where("vet").equals(req.veterinario?._id)

    res.json(patients)


};


export const patientByID = async (req, res) =>{

    const {id} = req.params

    const patient = await Patients.findById(id)

    if(patient.vet._id.toString() !== req.veterinario._id.toString()){
       return res.json({msg:"Action denegade"})
    }else{
       
        return res.json(patient)
    }
    

  
}

export const deletePatient = async (req,res)=>{
    const { id } = req.params;

    // Verificar si el ID es un ObjectId válido
 if (!mongoose.Types.ObjectId.isValid(id)) {
   return res.status(400).json({ msg: "Invalid patient ID format" });
 }

   try {
       
   const patient = await Patients.findById(id);
 
   if (!patient) {
     return res.status(404).json({ msg: 'Patient not found' });
   }
 
   if (patient.vet._id.toString() !== req.veterinario._id.toString()) {
    return res.status(403).json({ msg: 'Action denied' }); // Cambiado a código de estado 403 (Prohibido)
  }
   
   const deletePatient = await patient.deleteOne()
 
     res.json(deletePatient);
   } catch (error) {
     console.error(error.message);
     res.status(500).json({ msg: 'Internal server error' });
   }
 }; 

export const updatePatient = async (req, res) => {
    const { id } = req.params;

     // Verificar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid patient ID format" });
  }

    try {
        
    const patient = await Patients.findById(id);
  
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
  
    if (patient.vet._id.toString() !== req.veterinario._id.toString()) {
      return res.status(404).json({ msg: 'Action denied' });
    }
  
    patient.name = req.body.name || patient.name;
    patient.owner = req.body.owner || patient.owner;
    patient.date = req.body.date || patient.date;
    patient.email = req.body.email || patient.email;
    patient.symptoms = req.body.symptoms || patient.symptoms;
  

      const updatedPatient = await patient.save();
      res.json(updatedPatient);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };
  