const { restart } = require("nodemon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const RefreshToken = require("../models/rTokenModel");
const auth = require("../middleware/auth");
const authOps = require("../middleware/authOps");
const { mailFunc } = require("../auxilliary/mailer");
const { route } = require("./projectRouter");



const router = require("express").Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password, passwordCheck, fullname, displayname, userDescription } = req.body;
        //validate data
        if (!email || !password || !passwordCheck || !fullname || !userDescription)
            return res.status(400).json({ msg: "Not all fields have been entered" });
        if (password.length < 5)
            return res.status(400).json({ msg: "Password musst be longer than 5 characters" });
        if (password !== passwordCheck)
            return res.status(400).json({ msg: "Passwords musst be matching" });

        if (userDescription.length < 60)
            return res.status(400).json({ msg: "User bio musst be longer than 60 characters" });


        const existingUser = await User.findOne({ email: email })
        if (existingUser)
            return res.status(400).json({ msg: "E-mail already registered" });


        if (!displayname) displayname = email;


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //setup Projects
        const ownProjects = [];
        const backedProjects = [];


        const newUser = new User({
            email,
            password: passwordHash,
            userDescription,
            fullname,
            displayname,
            ownProjects,
            backedProjects,

        });

        console.log("email: " + email)
        mailFunc(email, fullname);
        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json(err);
    }


});
//user Authentication

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered" });
        const user = await User.findOne({ email: email });

        if (!user)
            return res.status(400).json({ msg: "Kein Account besteht mit dieser Email" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({ msg: "Passwort falsch" });

        //check for refreshToken 
        if (!req.header("refresh-token")) {
            console.log("No refresh token in login request")
            refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET);

            function addDays(date, days) {
                var result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }
            const date = Date.now();

            const newRToken = new RefreshToken({
                token: refreshToken,
                expires: addDays(date, 14),
                isExpired: false,
                createdByIp: "0.0.0.0",
                isActive: true,
            });
            const savedToken = await newRToken.save();
        } else {
            //check if refresh token is in db
            refreshTokenAns = await RefreshToken.findOne(
                { token: req.header("refresh-token") }
            );

            let refreshToken = undefined;
            if (!refreshTokenAns) {
                //no token in db create new refreshToken
                console.log("need to create new refresh Token")
                refreshToken = await jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET);

                function addDays(date, days) {
                    var result = new Date(date);
                    result.setDate(result.getDate() + days);
                    return result;
                }
                const date = Date.now();

                const newRToken = new RefreshToken({
                    token: refreshToken,
                    expires: addDays(date, 14),
                    isExpired: false,
                    createdByIp: "0.0.0.0",
                    isActive: true,
                });
                const savedToken = await newRToken.save();
            }

        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15s" });




        res.json({
            token,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                userDescription: user.userDescription,
                fullname: user.fullname,
                displayname: user.displayname,
                ownProjects: user.ownProjects,
                backedProjects: user.backedProjects,
            }

        })




        // let refreshToken = "";
        // let refreshTokenAns ="";
        // if (req.header("refresh-token")){
        //     refreshToken = req.header("refresh-token");

        //     refreshTokenAns =  await RefreshToken.findOne(
        //         {token: refreshToken}
        //     );
        // }
        // console.log(refreshTokenAns)

        // let refreshTokenNew = undefined;

        // if (refreshTokenAns === "" || refreshToken === ""){
        //     //if there is no Refresh token for user create new
        //     refreshTokenNew = jwt.sign({ id: user._id}, process.env.JWT_REFRESH_SECRET);
        //     //next save refreshToken in db

        //     function addDays(date, days) {
        //         var result = new Date(date);
        //         result.setDate(result.getDate() + days);
        //         return result;
        //     }
        //     const date = Date.now();

        //     const newRToken = new RefreshToken({
        //         token: refreshToken,
        //         expires: addDays(date, 14), 
        //         isExpired: false,
        //         createdByIp: "0.0.0.0",
        //         isActive: true,
        //     });   
        //     const savedToken = await newRToken.save();
        //     console.log("test")
        // } 

        //this generates an access Token for valid refreshToken
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/delete", auth, async (req, res) => {
    //make sure only validated users can access
    //console.log(req.user)
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
    //https://www.youtube.com/watch?v=BKiiXXVb69Y
    //delete works looking up which user the token belongs to

})

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json("false");

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json("false");
        //verify user is in db next
        const user = await User.findById(verified.id);
        if (!user) return res.json("false");

        const name = user.displayname == undefined ? user.fullname : user.displayname;
        return res.json(name + " logged in true");

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post("/refreshtokenIsValid", async (req, res) => {
    try {
        const token = req.header("refresh-token");
        if (!token) return res.json("No refresh token in request");

        const verified = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        if (!verified) return res.json("false");

        //verify token is in db next

        const tokeninDb = await RefreshToken.find(
            { token: token }
        );
        if (tokeninDb == "") return res.json("Token not in DB");

        const user = await User.findById(verified.id);
        if (!user) return res.json("false");

        const name = user.displayname == undefined ? user.fullname : user.displayname;

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15s" });
        //answer musst be access token

        return res.json({ "AccessToken": accessToken });

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayname: user.displayname,
        fullname: user.fullname,
        userDescription: user.userDescription,
        // email: user.email,
        id: user._id,
        ownProjects: user.ownProjects,
        backedProjects: user.backedProjects,
        //add more info needed like ownedProjectss
    });
});


//private route to update User
router.post("/update", authOps, async (req, res) => {
    try {
        const user = await User.findById(req.user);

        // const { email, password } = req.body;
        const { password, userDescription } = req.body;

        // //validate data
        // if (user.email == email ) {
        //     email = user.email;
        // }
        // if (user.password == password ) {
        //     password = user.password;
        // }



        if (!password)
            return res.status(400).json({ msg: "Password field has not been entered" });
        if (password.length < 5)
            return res.status(400).json({ msg: "Password musst be longer than 5 characters" });

        if (!userDescription)
            return res.status(400).json({ msg: "User bio field has not been entered" });
        if (userDescription.length < 60)
            return res.status(400).json({ msg: "User bio musst be longer than 60 characters" });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (!isMatch) {
            const oldData = await user
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const savedUser = await User.updateOne(
                { _id: user._id },
                { $set: { "password": passwordHash} }
            );




            res.status(200).json({ msg: "Password updated!" })

            // res.json({
            //             displayname: user.displayname,
            //             fullname: user.fullname,
            //             id: user._id,
            //             ownProjects: user.ownProjects,
            //             backedProjects: user.backedProjects,
            //             password: user.password
            //             })

        



        } else {
            
            const savedUser = await User.updateOne(
                { _id: user._id },
                { $set: { "userDescription": userDescription} }
            );
            


            res.status(400).json({ msg: "Password has not changed" })
        }


    } catch (err) {
        res.status(500).json({ error: err.message })
    }


})

router.post("/logout", auth, async (req, res) => {
    const refreshToken = req.header("refresh-token")
    const tokenToDelete = await RefreshToken.findOneAndDelete({ token: refreshToken })
    if (!tokenToDelete) {
        res.status(401).json("Token not here")
    } else {
        res.status(200).json("Token deleted")
    }
});


router.get("/test", (req, res) => {
    res.send("Hello, its working!");

});

//TODO://https://www.youtube.com/watch?v=Rdbs2W6R23c

module.exports = router;