import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import { Link } from 'react-router-dom';
import ChainIcons from "../misc/chainIcon";

export default function ProjectsOverview() {

    const [projectList, setProjectList] = useState();
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const goToProject = (id) => history.push("/project/"+id);
    const goToUser = (userName) => history.push("/showuser/" + userName);


    let user = "";
    if (localStorage.getItem("userData")) {
        localStorage.getItem("userData") ? user = localStorage.getItem("userData") : user = "";

    }

    useEffect(() => {
        if (user == "") {
                 history.push("/login")
        } else {
            async function getProjects() {
                const projectRes = await Axios.get("https://tokenstart.herokuapp.com/projects/")
                let allProjectsList = projectRes.data;
                setProjectList({
                    allProjects: allProjectsList
                });
            }

            getProjects();
        }



    }, [])

    return (
        <div>
            {projectList == undefined ? (
                <>
                    <p>Please Log in to Create a Project</p>
                </>
            ) : (
                    <>
                        <h4>Projects Overview</h4>
                        <div class="view">
                        <div class="wrapper">
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
                                    {
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
                                                            <td onClick={() => goToUser(item.projectOwnerName)}>{item.projectOwnerName}</td>
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
