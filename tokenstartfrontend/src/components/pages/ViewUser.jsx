import React, { useState, useEffect, useContext } from 'react';

import UserContext from "../../context/UserContext";
import Chart from '../misc/Chart';
import ProjectCarouselGuest from '../misc/ProjectCarouselGuest';
import { BrowserRouter, RouteLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ChainIcons from "../misc/chainIcon";



export default function ViewUser(props) {
    const { userData } = useContext(UserContext);
    const [projectInfo, setProjectInfo] = useState();

    let investors = {
        "djhd83838hnfiehi":{
            "name":"Big Mama",
            "_id":"djhd83838hnfiehi",
            "image":"https://i.ibb.co/sRPw3rp/photo-1573878221136-9b03f3d976b7.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..` 
        },
        "ijd9j8j9j9fd":{
            "name":"Uncle Jeff",
            "_id":"ijd9j8j9j9fd",
            "image":"https://i.ibb.co/NTY8zrZ/photo-1573878416776-932ce6911da2.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..` 
        },
        "ijd9mai9j9fd":{
            "name":"Mia Anderson",
            "_id":"ijd9mai9j9fd",
            "image":"https://i.ibb.co/GCBSYmD/photo-1565128936512-e7333b8325ce.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..` 
        }
    }

    let currentUser = investors[props.match.params.userId]



    // let editLink = "";

    // useEffect(() => {
    //     if (!Project._id) {
    //         getProjects();
    //     }


    // }, [props.match.params.projectId]);

    // async function getProjects() {
    //     const projectRes = await Axios.post("https://tokenstart.herokuapp.com/projects/" + props.match.params.projectId)
    //     setProjectInfo({
    //         Project: projectRes.data
    //     });

    // }

    // if (projectInfo && userData.user) {
    //     if (projectInfo["Project"].projectOwnerID == userData.user.id) {
    //         editLink = <Link to={"/edit/project/" + props.match.params.projectId}><button className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /> Edit project</button></Link>;
    //     }
    // }


    return <div>
        {currentUser === undefined ? (<h1>Error 404: We could not find your user</h1>) : (
            <>
                
                {/* { userData.user.id == projectInfo._id  && <Link to={"/edit/project/" + props.match.params.projectId}>Edit project</Link> } */}

                {/* <div className="col-6">
                    <Link to="/projects"> Go to projects overview</Link>
                </div> */}


                <div className="">
                    <div className="investor-profile-box-wrapper ourBox d-flex col-10 margin0a my-2">
                    <div className="investor-profile-box d-flex m-3">
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

                    <h2>Projects {currentUser.name.split(" ")[0]} invested in:</h2>
                    <ProjectCarouselGuest></ProjectCarouselGuest>
                </div>
            </>

        )
        }
    

    </div >



}
