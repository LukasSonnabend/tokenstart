const { restart } = require("nodemon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Project = require("../models/projectModel");
const authOps = require("../middleware/authOps");
const FormData = require('form-data');
const axios = require('axios');
const qs = require('querystring')


const router = require("express").Router();

//needs validation projectOwner musst be set automatically using jwt token route is logged in.
router.post('/new', authOps, async (req, res) => {
    try {

        let imgString = req.body.projectPicture[0].split('base64,')
        //console.log(imgString[1])
        const { projectName, projectPicture, tokenChain, sDescription, lDescription, tokenName, tokenShort, tokenSupply, smallestTradable, toOwner, projectOwnerID, projectOwnerDescription, projectOwnerName } = req.body;
        if (!projectName || !projectPicture || !tokenChain || !sDescription || !lDescription || !tokenName || !tokenShort || !tokenSupply || !toOwner || !projectOwnerID || !projectOwnerDescription || !smallestTradable)
            return res.status(400).json({ msg: "Insufficient Parameters" })

        if (parseInt(toOwner, 10) > parseInt(tokenSupply, 10)) {
            return res.status(400).json({ msg: "Amount to Owner musst be smaller than total token supply" })
        }

        const existingProject = await Project.findOne(
            {
                $or: [
                    { projectName: projectName },
                    { tokenName: tokenName }]
            })

    
        let projectPictureURL; 

        const requestBody = {
            image: imgString[1]
          }
          
          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }


        await axios.post("https://api.imgbb.com/1/upload?key=e75c6b7d56a8abd6ffe26b7b2a9722e0", qs.stringify(requestBody), config)
            .then(response => {
                //console.log(response.data.data.image.url)
                projectPictureURL = response.data.data.image.url;
            })
            .catch(error => {
                console.log(error);
            });


        const newProject = new Project({
            projectName,
            projectPictureURL,
            tokenChain,
            sDescription,
            lDescription,
            tokenName,
            tokenShort,
            tokenSupply,
            smallestTradable,
            toOwner,
            projectOwnerName,
            projectOwnerDescription, //set automatically
            projectOwnerID //set automatically
        });

        const savedProject = await newProject.save();
        res.json(savedProject);

    } catch (err) {
        res.status(400).json(err)
    }


});

// private route for editing projects

// private route for deletingprojects


//public route query all projects
router.get("/", async (req, res) => {
    await Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json("Error: " + err));
});

// router.get("/:ownerId", async (req, res) => {


// update project
router.post("/update", authOps, async (req, res) => {
    try {
        //console.log(req.body.projectId)

        const project = await Project.findById(req.body.projectId)


        if (project.projectOwnerID === req.body.projectOwnerID) {

            if (project.projectName === req.body.projectName) {

                const savedProject = await Project.updateOne(
                    { _id: req.body.projectId },
                    {
                        $set: {
                            "projectName": req.body.projectName,
                            "tokenChain": req.body.tokenChain,
                            "sDescription": req.body.sDescription,
                            "lDescription": req.body.lDescription,
                        }
                    }
                );
                return res.status(200).json({ msg: "Success" });
            }
            else {
                // console.log(project.projectOwnerID)
                // console.log(req.body.projectOwnerID)

                // const savedProject= await Project.updateOne(
                //     { _id : req.body.projectId},
                //     { $set : { 
                //         "projectName": req.body.projectName, 
                //        "tokenChain": req.body.tokenChain,
                //         "sDescription": req.body.sDescription, 
                //         "lgDescription": req.body.lDescription,
                //     } }
                // );
                return res.status(400).json({ msg: "You are not the project owner" });
            }

        }
    } catch (err) {
        res.status(500).json(err)
    }
    return res.status(200).json({ msg: "Success" });


})

// delete project
router.post("/delete", authOps, async (req, res) => {
    try {
        //console.log(req.body.projectId)

        const project = await Project.findById(req.body.projectId)

        if (project.projectOwnerID === req.body.projectOwnerID) {
            Project.deleteOne({
                _id: req.body.projectId
            }, function (err, result) {
                if (err) {
                    return res.status(400).json({ msg: "klues" });
                } else {
                    return res.status(200).json({ msg: "Success" });
                }
            });

        }
    } catch (err) {
        res.status(400).json({ msg: "Project ID not found" });
    }
    //return res.status(200).json({msg: "Success"});


})



//public route for specific project
router.post("/:projectId", async (req, res) => {
    await Project.findById(req.params.projectId)//.select("-projectOwnerID")
        .then((project => { res.json(project) }))
        .catch(err => res.status(400).json("Project ID nicht gefunden"))
});







module.exports = router;
