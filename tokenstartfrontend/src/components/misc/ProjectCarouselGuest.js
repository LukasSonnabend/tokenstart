import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";
import {useHistory} from "react-router-dom";


export default function ProjectCarouselGuest() {

    const [projectList, setProjectList] = useState();

    var carousel;
    let projectData = [projectList];

    let projectDataList = projectData[0];

    const history = useHistory();


    let listItems;

    useEffect(() => {
        async function getProjects(){
            const projectRes = await Axios.get("https://tokenstart.herokuapp.com/projects") 
            setProjectList({
                list: projectRes.data
            });
        }
        if (!projectDataList){
        getProjects();}

        if (projectDataList && !carousel) {
            console.log("running list")
            carousel = projectList.list.map((project, index) => {
                return <div key={index} id="projectCard" className="card">
                    <div className="card-img-top" style={{background: "url(" + project.projectPictureURL + ")"}}>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{project.projectName}</h5>
                        <p className="card-text">{project.sDescription}<br />Von: { project.projectOwnerName }</p>
                        <button className="btn btn-primary" onClick={ () => history.push("/project/" + project._id)}>{project.tokenShort} Token</button>
                    </div>
                </div>
            })
        }

        //renders carousel to dom
        ReactDOM.render(carousel, document.getElementById('projectCarousel'));
        // document.getElementById("projectCarousel").innerHTML = carousel;
    }, [projectDataList]);
    
    return <>
        <div>
            {!projectData ? <p>No Data {listItems}</p> : (
                <>
                    <div>

                        <div className="d-flex" className="projectBottomSection" id="projectCarousel"></div>
                        {carousel}
                    </div>
                </>
            )}
        </div>
    </>

}