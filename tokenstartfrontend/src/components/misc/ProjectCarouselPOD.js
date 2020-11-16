import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";
import {useHistory, Link} from "react-router-dom";


export default function ProjectCarouselPOD() {

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
                if (index >= 4)
                return <div key={index} id="projectCard" className="card mx-3 my-4">
                    <a href={"./project/" + project._id} className="text-dark">
                    <div className="card-img-top" style={{background: "url(" + project.projectPictureURL + ")"}}>
                    <div className="carousel-card-body">
                        <h5 className="card-title pt-1 mb-0">{project.projectName}</h5>
                        <p className="m-0"><a className="text-dark" href={"./user/" + project.projectOwnerName.split(" ").join("")} >Created by: {project.projectOwnerName}</a></p>
                    </div>
                    </div>
                    </a>
                </div>
            })
        }

        //renders carousel to dom
        ReactDOM.render(carousel, document.getElementById('projectCarouselPOD'));
        // document.getElementById("projectCarousel").innerHTML = carousel;
    }, [projectDataList]);
    
    return <>
        <div>
            {!projectData ? <p>No Data {listItems}</p> : (
                <>
                    <div id="Featured Projects">
                        <h2 className="mt-2">Projects of the Day</h2>
                        <div className="projectCarousel" id="projectCarouselPOD"></div>
                        {carousel}
                    </div>
                </>
            )}
        </div>
    </>

}