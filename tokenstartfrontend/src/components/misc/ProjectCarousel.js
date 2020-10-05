import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import UserContext from "../../context/UserContext";
import Axios from "axios";
import {useHistory} from "react-router-dom";

export default function ProjectCarousel(props) {
    const { userData, setUserData } = useContext(UserContext);
    const [projectList, setProjectList] = useState();
    const history = useHistory();
    console.log(props.data)
    

    var carousel;
    
    let projectData = [props.data];
    //let projectData = [userData.projectList];
    let projectDataList = projectData[0];
    console.log(projectData);
    console.log(projectDataList);

    const numbers = [1, 2, 3, 4, 5];
    let listItems;

    async function getProjects(){
        const projectRes = await Axios.get("http://localhost:1234/projects") 
        setProjectList({
            list: projectRes.data
        });
        // setUserData({
        //     token: userData.token,
        //     user: userData.user,               
        //     list: projectRes.data
        // });
    }

    if (carousel){

     

        getProjects();
    }

    useEffect(() => {

        //console.log(projectData)
        if (projectDataList) {
            console.log("running list")
            carousel = projectDataList.map((project, index) => {
                return <div key={index} id="projectCard" className="card">
                    <img className="card-img-top" src="https://images.unsplash.com/photo-1580670029149-5c00eec8bb66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=560&q=80" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{project.projectName}</h5>
                        <p className="card-text">{project.sDescription}<br />Von: { project.projectOwnerName }</p>
                        <button className="btn btn-primary" onClick={ () => history.push("/project/" + project._id)}>Zum Token</button>
                        {/* <a href={"/project/" + project._id} className="btn btn-primary">Zum Token</a> */}
                    </div>
                </div>
            })
        }


        console.log(carousel);
        //renders carousel to dom
        ReactDOM.render(carousel, document.getElementById('projectCarousel'));
        // document.getElementById("projectCarousel").innerHTML = carousel;
    }, []);


    console.log(carousel)

    return <>
        <div>
            {!projectData ? <p>No Data {listItems}</p> : (
                <>
                    <div id="otherProjects">

                        <div id="projectCarousel"></div>
                        {carousel}
                    </div>
                </>
            )}
        </div>
    </>

}