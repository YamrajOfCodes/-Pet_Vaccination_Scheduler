import Home from './Pages/Home/Home'
import {Route,Routes} from "react-router-dom"
import AddPet from './Components/AddPet/AddPet'
import LoginSignup from './Pages/Login or Signup/LoginSignup'
import Protected from './Components/Protected/Protected'

function App() {
  

  return (
    <>
    <Routes>

     <Route path='/' element={ <Protected Component={Home}/>}/>
     <Route path='/register' element={<LoginSignup/>}/>
     <Route path='/addData' element={ <Protected Component={AddPet}/>}/>
     <Route path='/updateData/:id' element={<Protected Component={AddPet}/>}/>
    </Routes>
    </>
  )
}

export default App
