const users = require("../modals/userSchema");
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
   

    console.log("userController:register function");
    const { username, email, password, } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    try {
        const existinguser = await users.findOne({ email: email });
        console.log("existing user");
        console.log(existinguser)


        if (existinguser) {

            res.status(406).json('Accound already exit ,please login')
        }
        else {
            const newuser = new users({
                username: username,
                email: email,
                password: password,
        
               
            })
            await newuser.save()
            res.status(200).json("registration request received successfully")

        }


    } catch (err) {
        req.status(401).json('register request failed due to ', err)
    }



}




exports.login = async (req, res) => {
    console.log("login controller function");
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        const existinguser = await users.findOne({ email: email, password: password })
        if (existinguser) {

            const token = jwt.sign({ userId: existinguser._id },'supersecrectkey12345')
            console.log(token);
            res.status(200).json({
                existinguser:existinguser ,
                token:token
            })
        //   res.status(200).json("login successfull")
        
            
        }
        else {
            res.status(404).json("invalid email id or password")
        }

    } catch (err) {
        res.status(401).json("login request failed due to", err)
    }
}

