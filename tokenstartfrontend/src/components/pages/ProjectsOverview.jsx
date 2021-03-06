import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import { Link } from 'react-router-dom';
import ChainIcons from "../misc/chainIcon";

export default function ProjectsOverview(props) {

    const [projectList, setProjectList] = useState();
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const goToProject = (id) => history.push("/project/"+id);
    const goToUser = (userName) => history.push("/user/" + userName);


    let user = "";
    if (localStorage.getItem("userData")) {
        localStorage.getItem("userData") ? user = localStorage.getItem("userData") : user = ""; 

    }


    useEffect(() => {

            async function getProjects() {
                const projectRes = await Axios.get("http://localhost:1234/projects/")
                let allProjectsList = projectRes.data;
                setProjectList({
                    allProjects: allProjectsList
                });
            }

            getProjects();




    }, [])

    return (
        <div>
            {projectList == undefined ? (
                <>
                    <p>Cannot load Projects</p>
                </>
            ) : (
                    <>
                        {props.match.params.catName == "equity" ? (<div class="alert alert-warning" role="alert">
                        Hopefully coming soon,  😌
</div>) : (<></>)} 



                        <h4>{ props.match.params.catName ?  props.match.params.catName[0].toUpperCase() + props.match.params.catName.slice(1) + " Projects Overview"   : "Projects Overview"      }</h4>
                        <div className="view">
                        <div className="wrapper">
                        <div style={{ overflowY: "scroll" }} className="col-12 margin0a">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">Edit</th> */}
                                        <th className="sticky-col first-col">Blockchain</th>
                                        <th className="">Name</th>
                                        
                                        {/* <th scope="col">Description</th> */}
                                        
                                        <th scope="col">In circulation</th>
                                        <th scope="col">Token Supply</th>
                                        <th scope="col">Token Name</th>
                                        <th scope="col">Creator</th>
                                        <th scope="col">Creation Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   props.match.params.catName ? React.Children.toArray(
                                            projectList.allProjects.filter( projects => projects.category == (props.match.params.catName[0].toUpperCase() + props.match.params.catName.slice(1)) ).map(
                                                (item, i) =>
                                                    <>
                                                        <tr>
                                                        <td  className="iconCell sticky-col first-col">{ChainIcons(item.tokenChain)}</td>
                                                            {/* <td><Link to={"/edit/project/" + item._id}><FontAwesomeIcon icon={faEdit} /></Link></td> */}
                                                            <td className="" style={{ color: "blue" }} onClick={() => goToProject(item._id)}>{item.projectName}</td>
                                                            
                                                            {/* <td>{item.sDescription}</td> */}
                                                            
                                                            <td>{item.tokenSupply - item.toOwner}</td>
                                                            <td>{item.tokenSupply}</td>
                                                           
                                                            <td>{item.tokenName}</td>
                                                            <td onClick={() => goToUser(item.projectOwnerID)}>{item.projectOwnerName}</td>
                                                            <td>{item.date.slice(0, 10)}</td>
                                                        </tr>
                                                    </>
                                            )
                                        )
                                    
                                    
                                    
                                    :
                                        React.Children.toArray(
                                            projectList.allProjects.map(
                                                (item, i) =>
                                                    <>
                                                        <tr>
                                                        <td  className="iconCell sticky-col first-col">{ChainIcons(item.tokenChain)}</td>
                                                            {/* <td><Link to={"/edit/project/" + item._id}><FontAwesomeIcon icon={faEdit} /></Link></td> */}
                                                            <td className="" style={{ color: "blue" }} onClick={() => goToProject(item._id)}>{item.projectName}</td>
                                                            
                                                            {/* <td>{item.sDescription}</td> */}
                                                            
                                                            <td>{item.tokenSupply - item.toOwner}</td>
                                                            <td>{item.tokenSupply}</td>
                                                           
                                                            <td>{item.tokenName}</td>
                                                            <td>{item.category ? item.category : "Technology"}</td>
                                                            <td onClick={() => goToUser(item.projectOwnerID)}>{item.projectOwnerName}</td>
                                                            <td>{item.date.slice(0, 10)}</td>
                                                        </tr>
                                                    </>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}
