import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPet, updatePet } from '../../Redux/Slice/PetSlice/petSlice';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddPet = () => {
   const {id} = useParams();
   const navigate = useNavigate();
   
    const location = useLocation();
     let data = undefined
    
     if(location.state !== null){
       data = location.state
    }

   
    const dispatch = useDispatch();


    const [input,setinput] = useState({
        name:data !== undefined ? data.name : "",
        species:data !== undefined ? data.species : "",
        owner:data !== undefined ? data.owner : "",
        breed:data !== undefined ? data.breed : "",
        vaccinationHistory:data !== undefined ? data.vaccinationHistory : "",
        nextVaccinationDue:data !== undefined ? data.nextVaccinationDue : ""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setinput({...input,[name]:value})
    }

    const submitdata = (e)=>{
        e.preventDefault();
        const {name,species,breed,owner,nextVaccinationDue,vaccinationHistory} = input;

        if(name === ""){
          toast.error("please Enter name")
        }else if(species === ""){
          toast.error("please Enter species")
        }else if(owner === ""){
          toast.error("owner name is mandatory")
        }else if(breed==""){
          toast.error("Enter breed")
        }else if(vaccinationHistory == ""){
          toast.error("please Enter history of the vaccination of the pet")
        }else if(nextVaccinationDue == ""){
          toast.error("please enter next date for vaccine");
        }else{

          if(data !== undefined){
            dispatch(updatePet({input,id})).then((res)=>{
                  if(res.payload){
                  setTimeout(() => {
                    navigate("/")
                  }, 2000);
                  }
                });
          }else{
            dispatch(addPet(input)).then((res)=>{
                  if(res.payload){
                   setTimeout(() => {
                    navigate("/")
                   }, 2000);
                  }
                });
          }
          

        }
    }

  return (
    <>
   
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-100" style={{width:"100%"}}>
    {/* <!-- Form Container --> */}
    <div class="bg-white p-6 rounded-lg shadow-md">
      <form class="space-y-6">
        {/* <!-- Pet Name --> */}
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Pet Name</label>
          <input type="text" id="name" name="name"  onChange={handleChange} value={input.name} placeholder="Enter pet's name" class="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-400 focus:ring-2"/>
        </div>

        {/* <!-- Species --> */}
        <div>
  <label for="species" class="block text-sm font-medium text-gray-700">Species</label>
  <select
    id="species"
    name="species"
    class="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-400 focus:ring-2"
    onChange={handleChange}
    value={input.species}
  >
    <option value="">Select species</option>
    <option value="Dog">Dog</option>
    <option value="Cat">Cat</option>
    <option value="Bird">Bird</option>
    <option value="Other">Other</option>
  </select>
 </div>

        {/* <!-- Owner --> */}
        <div>
          <label for="owner" class="block text-sm font-medium text-gray-700">Owner</label>
          <input type="text" id="owner" name="owner"  onChange={handleChange} value={input.owner} placeholder="Enter owner's name" class="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-400 focus:ring-2"/>
        </div>

          {/* <!-- Owner --> */}
          <div>
          <label for="breed" class="block text-sm font-medium text-gray-700">Breed</label>
          <input type="text" id="breed" name="breed"  onChange={handleChange} value={input.breed} placeholder="Enter breed" class="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-400 focus:ring-2"/>
        </div>

        {/* <!-- Vaccination History --> */}
        <div>
          <label for=" vaccinationHistory" class="block text-sm font-medium text-gray-700">Vaccination History</label>
          <textarea id=" vaccinationHistory" name="vaccinationHistory"  onChange={handleChange} value={input.vaccinationHistory} rows="4" placeholder="Enter vaccination history, separated by commas" class="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-400 focus:ring-2"></textarea>
        </div>

        {/* <!-- Next Vaccination Due --> */}
        <div>
          <label for="nextVaccinationDue" class="block text-sm font-medium text-gray-700">Next Vaccination Due</label>
          <input type="date" id="nextVaccinationDue" name="nextVaccinationDue" onChange={handleChange} value={input.nextVaccinationDue}  class="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-400 focus:ring-2"/>
        </div>

        {/* <!-- Submit Button --> */}
        <div class="text-right">
          <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" onClick={submitdata}>
            Save Pet
          </button>
        </div>
      </form>
    </div>
  </div>

    </>
  )
}

export default AddPet
