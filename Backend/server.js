import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Server is running...")
})

const PORT = process.env.PORT || 5000 //port number is protected in .env file
app.listen(5000, () => console.log('Server is running on port: 5000'))