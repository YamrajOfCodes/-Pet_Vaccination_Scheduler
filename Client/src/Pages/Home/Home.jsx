import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePet, getPets } from '../../Redux/Slice/PetSlice/petSlice';
import AddPet from '../../Components/AddPet/AddPet';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CalendarView from '../../Components/Calender/Calender';
import { userLogin, userLogout } from '../../Redux/Slice/UserSlice/userSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const { getpets, removepet, addpet } = useSelector((state) => state.Pet);
  const [pets, setpets] = useState(getpets[0]);
  const [search, setsearch] = useState('');
  const [filter, setFilter] = useState('all'); 

  const [showPopup,setshowpopup] = useState(false);


  const searchPet = () => {
    const data = getpets[0]?.filter((pet) => {
      return pet.name.toLowerCase().includes(search.toLowerCase());
    });
    setpets(data);
  };

  const upcoming = getpets[0]?.filter((pet) => {
    const today = new Date();
        const vaccineDate = new Date(pet.nextVaccinationDue);
       if(today < vaccineDate) return pet
});


const logout = ()=>{
  dispatch(userLogout()).then((res)=>{
    if(res.payload){
      navigate("/register")
    }
  })
}


  const applyFilter = () => {
    if (filter === 'all') {
      setpets(getpets[0]);
    } else if (filter === 'upcoming') {
      const upcoming = getpets[0]?.filter((pet) => {
        const today = new Date();
        const vaccineDate = new Date(pet.nextVaccinationDue);
       if(today < vaccineDate) return pet
      });
      setpets(upcoming);
    } else if (filter === 'completed') {
      const completed = getpets[0]?.filter((pet) => {
        const today = new Date();
        const vaccineDate = new Date(pet.nextVaccinationDue);
        return today > vaccineDate;
      });
      setpets(completed);
    }
  };

  const deletepet = (id) => {
    dispatch(deletePet(id))
  };

  useEffect(() => {
    dispatch(getPets());
  }, [removepet, addpet]);

  useEffect(() => {
    applyFilter(); // Reapply filter whenever filter state or getpets changes
  }, [filter, getpets]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Pet Management Dashboard</h1>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900"onClick={()=>{setshowpopup(true)}}>Calender</a>
            <a href="#" className="text-gray-600 hover:text-gray-900" onClick={logout}>Logout</a>
          </nav>
        </header>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search pets by name"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <button
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
                onClick={searchPet}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              </button>
            </div>

            {/* Filter Options */}
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">Show All Pets</option>
                <option value="upcoming">Upcoming Vaccinations</option>
                <option value="completed">Completed Vaccinations</option>
              </select>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* <!-- Card 1 --> */}
          <div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold">Total Pets</h2>
            <p class="text-2xl font-bold">{getpets[0]?.length}</p>
          </div>
          {/* <!-- Card 2 --> */}
          <div class="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold">Upcoming Vaccinations</h2>
            <p class="text-2xl font-bold">{upcoming?.length}</p>
          </div>
          {/* <!-- Card 3 --> */}
          <div class="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold">Overdue Vaccinations</h2>
            <p class="text-2xl font-bold">{getpets[0]?.length - upcoming?.length}</p>
          </div>
        </div>

        {/* Pet List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4 sm:mb-0">Pet List</h2>
            <NavLink to={"/addData"}><button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Add New Pet
            </button>
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Species</th>
                  <th className="px-4 py-2 border">Next Vaccination</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pets?.map((pet) => (
                  <tr key={pet._id} className="bg-white text-gray-700">
                    <td className="px-4 py-2 border">{pet.name}</td>
                    <td className="px-4 py-2 border">{pet.species}</td>
                    <td className="px-4 py-2 border">{pet.nextVaccinationDue}</td>
                    <td className="px-4 py-2 border">
                     <NavLink to={`/updateData/${pet._id}`}state={pet}> <button className="text-blue-500 hover:text-blue-700">Edit</button></NavLink>
                      <button
                        className="text-red-500 hover:text-red-700 ml-2"
                        onClick={() => deletepet(pet._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-11/12 max-w-3xl p-6 rounded-lg shadow-lg relative">
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        onClick={() => setshowpopup(false)}
      >
        &times;
      </button>
      <CalendarView getpets={getpets} />
    </div>
  </div>
)}       

    </div>
    
  );
};

export default Home;
