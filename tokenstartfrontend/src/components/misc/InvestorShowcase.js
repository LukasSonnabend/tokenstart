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
            "name":"Big Mama",
            "_id":"djhd83838hnfiehi",
            "image":"https://images.unsplash.com/photo-1573878221136-9b03f3d976b7"
        },
        {
            "name":"Uncle Jeff",
            "_id":"ijd9j8j9j9fd",
            "image":"https://images.unsplash.com/photo-1573879030843-d4b38a33131d"
        },
        {
            "name":"Mia Anderson",
            "_id":"ijd9j8j9j9fd",
            "image":"https://images.unsplash.com/photo-1565125177606-32fdffcb85a3"
        }
    ]


    let invShowCase;

    useEffect(() => {
        // async function getProjects(){
        //     const projectRes = await Axios.get("https://tokenstart.herokuapp.com/projects") 
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
                        <div class="investorShowcaseImage" style={{backgroundImage: "url(" + investor.image + ")"}}></div>
                        <h2>{investor.name}🍔🔥</h2>
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