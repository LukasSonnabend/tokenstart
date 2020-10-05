import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";

export default function ProjectCarouselGuest() {

    const [projectList, setProjectList] = useState();

    var carousel;
    let projectData = [projectList];
    console.log(projectList)
    let projectDataList = projectData[0];
    console.log(projectData);
    console.log(projectDataList);

    //const numbers = [1, 2, 3, 4, 5];
    let listItems;

    async function getProjects(){
        const projectRes = await Axios.get("http://127.0.0.1:1234/projects") 
        setProjectList({
            list: projectRes.data
        });
    }

    if (carousel){

     

        getProjects();
    }

    useEffect(() => {
        async function getProjects(){
            const projectRes = await Axios.get("http://127.0.0.1:1234/projects") 
            setProjectList({
                list: projectRes.data
            });
        }
        getProjects();

        //console.log(projectData)
        if (projectDataList) {
            console.log("running list")
            carousel = projectList.list.map((project, index) => {
                return <div key={index} id="projectCard" className="card">
                    <img className="card-img-top" src="https://images.unsplash.com/photo-1580670029149-5c00eec8bb66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=560&q=80" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{project.projectName}</h5>
                        <p className="card-text">{project.sDescription}<br />Von: { project.projectOwnerName }</p>
                        <a href="#" className="btn btn-primary">Zum Token</a>
                    </div>
                </div>
            })
        }

        //renders carousel to dom
        ReactDOM.render(carousel, document.getElementById('projectCarousel'));
        // document.getElementById("projectCarousel").innerHTML = carousel;
    }, [projectData]);


    console.log(carousel)


    
    return <>
        <div>
            {!projectData ? <p>No Data {listItems}</p> : (
                <>
                    <div id="Featured Projects">

                        <div id="projectCarousel"></div>
                        {carousel}
                    </div>
                </>
            )}
        </div>
    </>

}