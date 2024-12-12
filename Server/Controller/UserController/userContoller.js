
const bcrypt = require("bcryptjs")
const userDb = require("../../Model/User/userModel")

const Register = async(req,res)=>{
    try {
        const {Firstname,Lastname,email,mobile,password,confirmpassword} = req.body;

        if(!Firstname || !Lastname || !email || !password || !confirmpassword || !mobile){
            return res.status(400).json({error:"all fields are required"})
        }

        const userValid = await userDb.findOne({email});
        const mobilevalid = await userDb.findOne({mobile});

        if(userValid){
           return res.status(400).json("user is alreday an axist")
        }

        if(mobilevalid){
          return res.status(400).json({error:"mobile number is already an use"})
        }

        if(password !==confirmpassword){
            return res.status(400).json({error:"both passwords does not matched"})
        }else{

        

           const newuser = new userDb({
            Firstname,Lastname,email,password,mobile
           })

           await newuser.save();

           res.status(200).json(newuser)

        }
        
    } catch (error) {
        console.log(error);
    }

}


const Login = async(req,res)=>{
    try {
        const { email, password } = req.body;

    
        if (!email || !password) {
            return res.status(400).json({ error: "Both fields are required" });
        }
    
        const validuser = await userDb.findOne({ email });
        if (!validuser) {
            return res.status(400).json({ error: "Please register first" });
        }
    
        const validpassword = await bcrypt.compare(password, validuser.password);
    
        if (!validpassword) {
            return res.status(400).json({ error: "Password is incorrect" });
        }
    
        const token = await validuser.generateToken();
        const result = {
            validuser,
            token
        };
    
        res.status(200).json(result);
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

const logout = async (req, res) => {
    try {
      req.rootUser.tokens = req.rootUser.tokens.filter((element) => {
        return element.token !== req.token;
      });
  
      
      await req.rootUser.save();
  
   
      res.status(200).json({ message: "User has logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "An error occurred while logging out" });
    }
  };
  



module.exports = {Register,Login,logout}