import User from "../models/User"

export const registerUser = async (req,res,next) => {
    try {
        const { name,email,password } = req.body
        
        //Check whther user exists or not
        let user = await User.findOne({email})
        if(user) {
            //If user exists --> bad request
            throw new Error("User have already registered")
        }
        //creating a new user if it's not exist
        user = await User.create({
            name,
            email,
            password,
        })

        return res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generateJWT(),
        })
    } catch (error) {
        //return res.status(500).json({message: "Something went wrong!"})
        next(error)
    }
}

export const loginUser = async (req,res,next) => {
    try {
        const { email, password } = req.body //pull email and pw from req.body

        let user = await User.findOne({ email })

        if(!user) {
            throw new Error("Email not found!")
        }
    } catch (error) {
        next(error)
    }
}

export { registerUser }