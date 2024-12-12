import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddPet from './Components/AddPet/AddPet.jsx'
import {Provider} from "react-redux"
import { store } from './Redux/App/Store/store.js'
import {BrowserRouter} from "react-router-dom"
import {Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <BrowserRouter>
     <App/>
    </BrowserRouter>
   </Provider>
   <Toaster/>
  </StrictMode>,
)
