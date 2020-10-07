import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import ChainIcons from "./chainIcon";
import Axios from "axios";
import { Link } from 'react-router-dom';


export default function GetProjects(props) {

    const [searchTerm, SetSearchTerm] = useState();

    // const dynamicSearch = () => {
    //     return 
    // }https://levelup.gitconnected.com/building-a-simple-dynamic-search-bar-in-react-js-f1659d64dfae

    // useEffect(() => {

        //get project names + ids

    //     async function getProjects() {
    //         const projectRes = await Axios.get("http://localhost:1234/projects/")
    //         let allProjectsList = projectRes.data;


    //         setProjectList({
    //             ownProjects: allProjectsList.filter(project => project.projectOwnerID === props.userID),
    //             otherProjects: allProjectsList.filter(project => project.projectOwnerID !== props.userID)
    //         });
    //         setUserData({
    //             token: userData.token,
    //             user: userData.user,
    //             list: projectRes.data
    //         });
    //     }

    //     getProjects();

    //     let ownedProjects = [];
    //     for (let project in projectList) {
    //         if (projectList[project].projectOwnerID === props.userID) {
    //             ownedProjects.push(projectList[project].projectOwnerID)
    //         }
    //     }

    // }, []);

    return <div>
        <input type="text" placeholder="Search TokenStart Projects" onChange={ (e) => SetSearchTerm(e.target.value)}/>
</div>

}