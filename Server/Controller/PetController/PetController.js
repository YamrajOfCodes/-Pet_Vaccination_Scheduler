const PetDb = require("../../Model/Pet/PetModel")


const addPet = async(req,res)=>{
 
    try {
        const { name, species, breed, owner, vaccinationHistory, nextVaccinationDue} = req.body; 

        if( !name || !species || !breed || !owner || !vaccinationHistory || !nextVaccinationDue){
            return res.status(400).json({error:"all fields are required"})
        }
      
        const available = await PetDb.findOne({ name: name, owner: owner });
      
        if(available){
          return res.status(400).json({error:"Owner's Pet is already exists"})
        }
      
        const addpet = new PetDb({
          name, species, breed, owner, vaccinationHistory, nextVaccinationDue
        })
      
        await addpet.save();
      
        return res.status(200).json(addpet);
      
    } catch (error) {
       console.log(error);
               
    }
  
}


const getPets = async(req,res)=>{
try {
    const allpetsInfo = await PetDb.find({});
    return res.status(200).json(allpetsInfo);
} catch (error) {
    console.log(error);
    
}
}

const updatePet = async(req,res)=>{
    const petId = req.params.id;  
    const updatedFields = req.body;  
  
    try {
     
      if (!updatedFields) {
        return res.status(400).json({ message: "No update data provided." });
      }
  
      const updatedPet = await PetDb.findByIdAndUpdate(petId, updatedFields, { new: true });
  
      if (!updatedPet) {
        return res.status(404).json({ message: `Pet with ID ${petId} not found.` });
      }
  
   
     return res.status(200).json({
        message: "Pet updated successfully.",
        pet: updatedPet,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while updating pet." });
    }
}

const removePet = async(req,res)=>{
  const {id} = req.params;
  try {
    const deletePet = await PetDb.findByIdAndDelete({_id:id})
    return res.status(200).json(deletePet)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting pet." });
  }
}


module.exports = {
    addPet,
    getPets,
    removePet,
    updatePet
}