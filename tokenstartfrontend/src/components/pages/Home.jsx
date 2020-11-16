import React, { useState, useEffect, useContext} from "react";
import ReactDOM from 'react-dom';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import GetProjects from "../../components/misc/GetProjects";
import ProjectCarouselFeatured from '../misc/ProjectCarouselFeatured';
import ProjectCarouselPOD from '../misc/ProjectCarouselPOD';
import InvestorShowcase from '../misc/InvestorShowcase'
import Alert from 'react-bootstrap/Alert';

function Home() {
    const [projectList, setProjectList] = useState();
        const {userData} = useContext(UserContext);
        const history = useHistory();
        let user = "";
        if (localStorage.getItem("userData")){
            localStorage.getItem("userData") ? user = localStorage.getItem("userData") : user = "";
    
    }

        useEffect(() => {
            if(user == "") {
            //     history.push("/login")
            }

        }, [])

    return (
        <div>
        {user == "" ? (
        <>
        <p>Please Log in to Create a Project</p>
        <ProjectCarouselFeatured status="guest"></ProjectCarouselFeatured>
        <InvestorShowcase></InvestorShowcase>
            <ProjectCarouselPOD status="guest"></ProjectCarouselPOD>
        </>
        ) : (
            <>
            {/* <Alert variant="primary">primary</Alert>
            <Alert variant="secondary">secondary</Alert>
            <Alert variant="success">success</Alert>
            <Alert variant="danger">danger</Alert>
            <Alert variant="warning">warning</Alert>
            <Alert variant="info">info</Alert>
            <Alert variant="light">light</Alert>
            <Alert variant="dark">dark</Alert> */}

            <ProjectCarouselFeatured status="guest"></ProjectCarouselFeatured>
            <InvestorShowcase></InvestorShowcase>
            <ProjectCarouselPOD status="guest"></ProjectCarouselPOD>
            {/* <p>Hello {JSON.parse(user).fullname}</p>

            <h2>Featured Projects</h2>
            <div className="col-12 col-lg-10 margin0a">
                
            <GetProjects userID={JSON.parse(user).id}/>
            </div>

            {/* <h>Your backed Projects</h
            2>
            {user.backedProjects} */} 
            </>
        )
        }
        </div>
     )
    }


export default Home;
  