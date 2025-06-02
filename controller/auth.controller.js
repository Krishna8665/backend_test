import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register= async (req,res)=>{
    try {
        const {name,email,password} = req.body

        //if check
        if(!name || !email || !password){
            console.log("All fields required!")
            res.status(400).json({message:"All fields required!"})
        }

        //json web token

        //token -> header store huni info 
        // const salt = bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, 10)

        // console.log(password)
        // console.log(hashedPassword)

//         const token = jwt.sign(
//   { id: user.id, email: user.email },
//   process.env.JWT_SECRET,
//   { expiresIn: "1h" }
// );

        const token =jwt.sign({email,hashedPassword},process.env.JWT_SECRET, { expiresIn: "1h" })
        console.log(token)

        
        // console.log(name,email,password)
        res.status(200).json({message:"Data received!"})
    } catch (error) {
        console.log(error)
    }
}

export const login= (req,res)=>{
    try {
        res.json("It is get methods")
    } catch (error) {
        res.json('Error encountered!')
    }
}