import { uploadPicture } from "../middleware/uploadPictureMiddleware"
import User from "../models/User"
import { fileRemover } from "../utils/fileRemover"

const registerUser = async (req,res,next) => {
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

const loginUser = async (req,res,next) => {
    try {
        const { email, password } = req.body //pull email and pw from req.body

        let user = await User.findOne({ email })

        if(!user) {
            throw new Error("Email not found!")
        }

        //if password matched
        if(await user.comparePassword(password)) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
                token: await user.generateJWT(),
            })
        } else {
            throw new Error("Invalid email or password")
        }
    } catch (error) {
        next(error)
    }
}

const userProfile = async (req,res,next) => {
    try {
        let user = await User.findById(req.user._id) //from authMiddleWare.js line 12: req.user
        if(user) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
            })
        } else {
            let error = new Error("User not found")
            error.statusCode = 404
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

const updateProfile = async (req,res,next) => { 
    try {
        let user = await User.findById(req.user._id)

        if(!user) {
            throw new Error('User not found')
        }

        user.name = req.body.name || user.name //right side is default
        user.email = req.body.email || user.email
        //Must have password and the length < 6
        if(req.body.password && req.body.password.length < 6) {
            throw new Error('Password length must be at least 6 characters')
        } else if (req.body.password) {
            user.password = req.body.password
        }
        //Update to the db
        const updatedUserProfile = await user.save(); //save method
        res.json({
            _id: updatedUserProfile._id,
            avatar: updatedUserProfile.avatar,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            verified: updatedUserProfile.verified,
            admin: updatedUserProfile.admin,
            token: await updatedUserProfile.generateJWT(),
        })
    } catch (error) {
        next(error)
    }
}

const updateProfilePicture = async (req, res, next) => {
    try {
        const upload = uploadPicture.single('profilePicture')

        upload( req, res, async function(err) {
            if(err) {
                const error = new Error("An unknown error occured when uploading " + err.message)
                next(error)
            } else {
                //every thing went well
                if(req.file) {
                    
                    let filename
                    const updatedUser = await User.findById(req.user._id)
                    filename = updatedUser.avatar
                    if(filename) {
                        fileRemover(filename) //Remove old avatar
                    }
                    updatedUser.avatar = req.file.filename //Update Avatar
                    await updatedUser.save()

                    res.json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token: await updatedUser.generateJWT(),
                    })
                } else {
                    let filename
                    let updatedUser = await User.findById(req.user._id)
                    filename = updatedUser.avatar
                    updatedUser.avatar = "" //remove updatedUser avatar
                    await updatedUser.save() //save to database
                    fileRemover(filename)
                    res.json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token: await updatedUser.generateJWT(),
                    })
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

export { registerUser, loginUser, userProfile, updateProfile, updateProfilePicture }