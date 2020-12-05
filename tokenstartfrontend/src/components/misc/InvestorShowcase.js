import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";
import {useHistory, Link} from "react-router-dom";


export default function InvestorsShowcase() {

    const [projectList, setProjectList] = useState();

    var carousel;
    let projectData = [projectList];

    let projectDataList = projectData[0];

    const history = useHistory();


    //mock hoe
    let investors = [
        {
            "name":"LucyTS",
            "_id":"djhd83838hnfiehi",
            "image":"https://i.ibb.co/zbmj03w/linkedin-sales-navigator-p-Mqs-NUZlz-CY-unsplash-min-1.jpg"
        },
        {
            "name":"Uncle Jeff",
            "_id":"ijd9j8j9j9fd",
            "image":"https://i.ibb.co/bHc4gZV/photo-1562788869-4ed32648eb72.jpg"
        },
        {
            "name":"Invest24/7",
            "_id":"ijd9mai9j9fd",
            "image":"https://i.ibb.co/cXw5khJ/photo-1514222709107-a180c68d72b4.jpg"
        }
    ]


    let invShowCase;

    useEffect(() => {
        // async function getProjects(){
        //     const projectRes = await Axios.get("http://localhost:1234/projects") 
        //     setProjectList({
        //         list: projectRes.data
        //     });
        // }
        // if (!projectDataList){
        // getProjects();}

   


        if (investors && !invShowCase) {
            console.log("running list")
            invShowCase = investors.map((investor, index) => {
                return <div key={index} id="investorPic" className="mx-3 my-4">
                        <a href={"/user/" + investor._id}>
                        <div className="investorShowcaseImage" style={{backgroundImage: "url(" + investor.image + ")"}}></div>
                        </a>
                        <h3>{investor.name}📈🔥</h3>
                </div>
            });
        }
        console.log(invShowCase)
        //renders carousel to dom
        ReactDOM.render(invShowCase, document.getElementById('investorShowcase'));
        //document.getElementById("investorShowcase").innerHTML = invShowCase;
    }, [projectDataList]);
    
    return <>
        <div>
            {!investors ? <p>No Data {investors}</p> : (
                <>
                    <div>
                        <h2 className="mt-2">Notable Investors</h2>
                        <div className="investorShowcaseWrapper">
                        <div className="investorShowcase" id="investorShowcase">
                        </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    </>

}