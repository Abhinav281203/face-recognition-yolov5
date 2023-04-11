import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("YOUR MONGOBD URL", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected");
}).catch((e) => {
    console.log(e);
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

app.post("/login", (req, res) => {
    const { email, password } = req.body
    const user = new User({
        email,
        password
    })
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "True" })
            } else {
                res.send({ message: "False" })
            }
        } else {
            res.send({ message: "No user" })
        }
    })
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    const user = new User({
        name,
        email,
        password
    })
    console.log(user)
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "False" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "True" })
                }
            })
        }
    })

})

app.listen(9002, () => {
    console.log("BE started at port 9002")
})