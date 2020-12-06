import React, { useState, useEffect, useContext } from 'react';
import Axios from "axios";
import ReactDOM from 'react-dom';
import UserContext from "../../context/UserContext";
import Chart from '../misc/Chart';
import ProjectCarouselGuest from '../misc/ProjectCarouselGuest';
import { useHistory, BrowserRouter, RouteLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ChainIcons from "../misc/chainIcon";



export default function ViewUser(props) {
    const { userData } = useContext(UserContext);


    let investors = {
        "djhd83838hnfiehi":{
            "name":"LucyTS",
            "_id":"djhd83838hnfiehi",
            "image":"https://i.ibb.co/zbmj03w/linkedin-sales-navigator-p-Mqs-NUZlz-CY-unsplash-min-1.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..` 
        },
        "ijd9j8j9j9fd":{
            "name":"Uncle Jeff",
            "_id":"ijd9j8j9j9fd",
            "image":"https://i.ibb.co/bHc4gZV/photo-1562788869-4ed32648eb72.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..` 
        },
        "ijd9mai9j9fd":{
            "name":"Invest24/7",
            "_id":"ijd9mai9j9fd",
            "image":"https://i.ibb.co/cXw5khJ/photo-1514222709107-a180c68d72b4.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..` 
        },
        "5f577182f8249b0004465e4e":{
            "name": "Lukas Sonnabend",
            "_id:":"5f577182f8249b0004465e4e",
            "image":"/static/media/Founder_Lukas.91916898.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..`,
        },
        "5f578e1af8249b0004465ea0":{
            "name": "Konstantin Klein",
            "_id:":"5f577182f8249b0004465e4e",
            "image":"/static/media/Founder_Konstantin.2b201eff.png",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..`,
        }
    }

    const [projectList, setProjectList] = useState();

    var carousel;
    let projectData = [projectList];

    let projectDataList = projectData[0];

    const history = useHistory();


    let currentUser = investors[props.match.params.userId]

    let listItems;

    useEffect(() => {
        async function getProjects(){
            const projectRes = await Axios.get("http://localhost:1234/projects") 
            setProjectList({
                list: projectRes.data
            });
        }
        if (!projectDataList){
        getProjects();}

        if (projectDataList && !carousel) {
            console.log("running list")
            carousel = projectList.list.filter(project => project.projectOwnerID === props.match.params.userId).map((project, index) => {
                return <div key={index} id="projectCard" className="card mx-3 my-4">
                    <a href={"./project/" + project._id} className="text-dark">
                    <div className="card-img-top" style={{background: "url(" + project.projectPictureURL + ")"}}>
                    <div className="carousel-card-body">
                        <h5 className="card-title pt-1 mb-0">{project.projectName}</h5>
                        <p className="m-0"><a className="text-dark" href={"./user/" + project.projectOwnerID} >Created by: {project.projectOwnerName}</a></p>
                    </div>
                    </div>
                    </a>
                </div>
            })
        }

        //renders carousel to dom
        ReactDOM.render(carousel, document.getElementById('projectCarouselfeatured'));
        // document.getElementById("projectCarousel").innerHTML = carousel;
    }, [projectDataList]);

















    // useEffect(() => {

    //     async function getProjects() {
    //         const projectRes = await Axios.get("http://localhost:1234/projects/")
    //         let allProjectsList = projectRes.data;


    //         setProjectList({
    //             ownProjects: allProjectsList.filter(project => project.projectOwnerID === props.match.params.userId),
    //         });
    //     }

    //     getProjects();

        
    //     for (let project in projectList) {
    //         if (projectList[project].projectOwnerID === props.userID) {
    //             ownedProjects.push(projectList[project].projectOwnerID)
    //         }
    //     }


    //     if (projectList && !carousel) {
    //         console.log("running list")
    //         carousel = projectList.ownProjects.map((project, index) => {
    //             if (index <= 2)
    //             return <div key={index} id="projectCard" className="card mx-3 my-4">
    //                 <a href={"./project/" + project._id} className="text-dark">
    //                 <div className="card-img-top" style={{background: "url(" + project.projectPictureURL + ")"}}>
    //                 <div className="carousel-card-body">
    //                     <h5 className="card-title pt-1 mb-0">{project.projectName}</h5>
    //                     <p className="m-0"><a className="text-dark" href={"./user/" + project.projectOwnerID} >Created by: {project.projectOwnerName}</a></p>
    //                 </div>
    //                 </div>
    //                 </a>
    //             </div>
    //         })
    //     }




    //     ReactDOM.render(carousel, document.getElementById('projectCarouselfeatured'));




    // }, []);    






    return <div>
        {currentUser === undefined ? (<h1>Error 404: We could not find your user</h1>) : (
            <>
                
                {/* { userData.user.id == projectInfo._id  && <Link to={"/edit/project/" + props.match.params.projectId}>Edit project</Link> } */}

                {/* <div className="col-6">
                    <Link to="/projects"> Go to projects overview</Link>
                </div> */}


                <div className="userProfile">
                    <div className="investor-profile-box-wrapper ourBox d-flex col-10 margin0a my-2">
                    <div className="investor-profile-box d-md-flex m-3">
                    <div className="investor-img-wrapper">
                    <div className="investorShowcaseImage m-1" style={{backgroundImage: "url(" + currentUser.image + ")"}}></div>
                    </div>
                    <div className="ml-2">
                        <h3 className="m-0 tal">TSID {currentUser.name} #{Math.ceil(Math.random() * 1000)}</h3>
                        <p className="m-0 tal"><b>About me:</b></p>
                        <p className="mb-0 tal">{currentUser.description}</p>
                    </div>
                    </div>
                    </div>
                    <div className="investor-profile-box-wrapper ourBox col-10  p-3 margin0a">
                        <h5>Portfolio Performance</h5>
                                <Chart className="investor-profile-box col-12"></Chart>
                    </div>
                    { !projectList ? "" : ( <h2>{currentUser.name.split(" ")[0]}'s Projects</h2>

                        
                        
                    )

                    }
<div className="projectCarousel" id="projectCarouselfeatured"></div>

                    <h2>Projects {currentUser.name.split(" ")[0]} invested in:</h2>
                    <ProjectCarouselGuest></ProjectCarouselGuest>
                </div>
            </>

        )
        }
    

    </div >



}
