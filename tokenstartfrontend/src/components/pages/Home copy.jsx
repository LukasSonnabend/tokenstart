import React, { useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import GetProjects from "../../components/misc/GetProjects";
import ProjectCarouselGuest from '../misc/ProjectCarouselGuest';

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
        <ProjectCarouselGuest status="guest"></ProjectCarouselGuest>
        </>
        ) : (
            <>
            <p>Hello {JSON.parse(user).fullname}</p>

            <h2>Featured Projects</h2>
            <div className="col-12 col-lg-10 margin0a">
                
            <GetProjects userID={JSON.parse(user).id}/>
            </div>

            {/* <h2>Your backed Projects</h2>
            {user.backedProjects} */}
            </>
        )
        }
        </div>
     )
    }


export default Home;
  