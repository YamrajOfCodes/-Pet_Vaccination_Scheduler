import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userLogout, userRegister, userVerify } from '../../Redux/Slice/UserSlice/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginSignup = () => {

    const [login,setlogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();


   


    const [registers,setregister]=useState({
      Firstname:"",
      Lastname:"",
      email:"",
      password:"",
      confirmpassword:"",
      phone:"",
  })

  const [logins,setlogins]=useState({
    email:"",
    password:""
  });

 





  const submitdata = (e)=>{

    console.log(registers);

    const {Firstname,Lastname,email,password,phone,confirmpassword} = registers;



    if(Firstname == ""){
      toast.error("Firstname is required")
    }else if(Lastname == ""){
      toast.error("Lastname is required");
    }else if(email == ""){
      toast.error("email is required")
    }else if(!email.includes("@")){
      toast.error("please enter valid email")
    }else if(phone == ""){
      toast.error("please enter your phone number")
    }else if(password == ""){
      toast.error("please enter a password");
    }else if( confirmpassword == ""){
      toast.error("Confirm your password")
    }else{ 

      const data = new FormData();
      data.append("Firstname",Firstname);
      data.append("Lastname",Lastname);
      data.append("email",email);
      data.append("mobile",phone);
      data.append("password",password);
      data.append("confirmpassword",confirmpassword);


      dispatch(userRegister(data)).then((res)=>{
        if(res.payload){
          setlogin(true);
        }
      })
    }
}



  const callanapi= ()=>{
    dispatch(userLogin(logins)).then((res)=>{
      if(res.payload){
        navigate("/");
        dispatch(userVerify());
      }
    })
  }

    const signupbtn = ()=>{
        setlogin(false)
    }

    const set = ()=>{
        setlogin(true)
    }


  

  return (
    <>
    {
        login ?  <>
        
        <div className='w-10/12 sm:w-9/12 md:w-6/12 lg:w-4/12 mx-auto my-7'style={{height:'72vh'}}>
            <h1 className='text-2xl font-bold'>Welcome,</h1>
            <p className='text-sm'>Sign in to continue</p>

            <form className='my-10 flex flex-col gap-3' >
            <div className='flex flex-col gap-2'>
       <label htmlFor="firstname" className='text-sm'>Email</label>
       <input type="email" className='styles h-10 w-full outline-none px-4 rounded-sm' id='email' name='email' value={logins.email} onChange={(e)=>{setlogins({...logins,email:e.target.value})}} style={{backgroundColor:"rgb(241 241 241)"}} placeholder='Enter your email' />
       </div>

       <div className='flex flex-col gap-2'>
       <label htmlFor="password" className='text-sm'>Password</label>
       <input type="password" className='styles h-10 w-full outline-none px-4 rounded-sm'   name='password' value={logins.password} onChange={(e)=>{setlogins({...logins,password:e.target.value})}} style={{backgroundColor:"rgb(241 241 241)"}} placeholder='Enter valid password'  />
       </div>
            </form>

            <div className='text-center'><button className='bg-green-500 active:bg-green-600 hover:bg-green-400 px-10 py-2 w-full text-white rounded-sm shadow-md cursor-pointer' onClick={callanapi}>Login</button></div>
        <p className='text-sm mx-2 my-5'>Not have an account? <strong className='text-green-400 cursor-pointer' onClick={signupbtn}>Sign up</strong></p>
        </div>
        
        </>   :<>
        
        <div className='w-10/12 sm:w-9/12 md:w-6/12 mx-auto my-5 h-full'>
  <h1 className='font-bold text-2xl'>Hello,</h1>
  <p className='capitalize text-sm'>Sign up to continue</p>

  <form className='my-10 flex flex-col px-2 gap-4 p-5'>
    {/* First Name */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="firstname" className='text-sm'>First Name</label>
      <input 
        type="text" 
        className='h-9 w-full outline-none px-4 rounded-sm' 
        id='firstname' 
        name='Firstname'  
        onChange={(e) => setregister({ ...registers, Firstname: e.target.value })}
        style={{ backgroundColor: "rgb(241 241 241)" }} 
        placeholder='John' 
      />
    </div>

    {/* Last Name */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="lastname" className='text-sm'>Last Name</label>
      <input 
        type="text" 
        className='h-9 w-full outline-none px-4 rounded-sm' 
        id='lastname' 
        name='Lastname'  
        onChange={(e) => setregister({ ...registers, Lastname: e.target.value })}
        style={{ backgroundColor: "rgb(241 241 241)" }} 
        placeholder='Doe' 
      />
    </div>

    {/* Email */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="email" className='text-sm'>Email</label>
      <input 
        type="email" 
        className='h-9 w-full outline-none px-4 rounded-sm' 
        id='email' 
        name='email'  
        onChange={(e) => setregister({ ...registers, email: e.target.value })}
        style={{ backgroundColor: "rgb(241 241 241)" }} 
        placeholder='abc@gmail.com' 
      />
    </div>

    {/* Phone */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="phone" className='text-sm'>Phone</label>
      <input 
        type="text" 
        className='h-9 w-full outline-none px-4 rounded-sm' 
        id='phone' 
        name='phone'  
        onChange={(e) => setregister({ ...registers, phone: e.target.value })}
        style={{ backgroundColor: "rgb(241 241 241)" }} 
        placeholder='91-000000000' 
      />
    </div>

    {/* Password */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="password" className='text-sm'>Password</label>
      <input 
        type="password" 
        className='h-9 w-full outline-none px-4 rounded-sm' 
        id='password' 
        name='password'  
        onChange={(e) => setregister({ ...registers, password: e.target.value })}
        style={{ backgroundColor: "rgb(241 241 241)" }} 
        placeholder='Enter a strong password' 
      />
    </div>

    <div className='flex flex-col gap-2'>
      <label htmlFor="password" className='text-sm'>Confirm Your Password</label>
      <input 
        type="password" 
        className='h-9 w-full outline-none px-4 rounded-sm' 
        id='password' 
        name='confirmpassword'  
        onChange={(e) => setregister({ ...registers, confirmpassword: e.target.value })}
        style={{ backgroundColor: "rgb(241 241 241)" }} 
        placeholder='Confirm a password' 
      />
    </div>
  </form>

  {/* Submit Button */}
  <div className='text-center'>
    <button 
      className='bg-green-500 px-10 py-2 w-full active:bg-green-600 hover:bg-green-400 text-white rounded-sm shadow-md' 
      onClick={(e) => {
        e.preventDefault(); 
        submitdata();
      }}
    >
      Signup
    </button>
  </div>

  {/* Sign-in Redirect */}
  <p className='my-7 text-sm px-4'>
    Have an account? 
    <strong className='text-green-400 cursor-pointer' onClick={set}>Sign in</strong>
  </p>
</div>

        </>
    }
    </>
  )
}

export default LoginSignup
