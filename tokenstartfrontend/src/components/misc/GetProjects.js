import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ChainIcons from "./chainIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";
import ProjectCarousel from '../misc/ProjectCarousel';
import { Link } from 'react-router-dom';


export default function GetProjects(props) {

    const [projectList, setProjectList] = useState();

    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const goToProject = (id) => history.push({
        pathname: "/project/" + id,
        state: { projectList: userData.list },
    });


    const goToUser = (userName) => history.push("/showuser/" + userName);

    if (props.userID != "undefined") {
        const userID = props.userID
    } else {
        const userID = ""
    }

    useEffect(() => {

        async function getProjects() {
            const projectRes = await Axios.get("http://localhost:1234/projects/")
            let allProjectsList = projectRes.data;


            setProjectList({
                ownProjects: allProjectsList.filter(project => project.projectOwnerID === props.userID),
                otherProjects: allProjectsList.filter(project => project.projectOwnerID !== props.userID)
            });
            setUserData({
                token: userData.token,
                user: userData.user,
                list: projectRes.data
            });
        }

        getProjects();

        let ownedProjects = [];
        for (let project in projectList) {
            if (projectList[project].projectOwnerID === props.userID) {
                ownedProjects.push(projectList[project].projectOwnerID)
            }
        }

    }, []);

    return <div>


        {projectList == undefined ? (<p>Please Log in </p>) : (
            <>
                <ProjectCarousel data={projectList.otherProjects} />


                <h2>Own Projects</h2>
                <div style={{ overflowY: "scroll" }} className="col-11 margin0a">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Edit</th>
                                <th scope="col">Name</th>
                                <th scope="col">Blockchain</th>
                                {/* <th scope="col">Description</th> */}
                                <th scope="col">Creation Date</th>
                                <th scope="col">Token Name</th>
                                <th scope="col">Token Supply</th>
                                <th scope="col">In circulation</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                React.Children.toArray(
                                    projectList.ownProjects.map(
                                        (item, i) =>
                                            <>
                                                <tr>
                                                    <td><Link to={"/edit/project/" + item._id}><FontAwesomeIcon icon={faEdit} /></Link></td>
                                                    <td style={{ color: "blue" }} onClick={() => goToProject(item._id)}>{item.projectName}</td>
                                                    <td class="iconCell">{ChainIcons(item.tokenChain)}</td>
                                                    {/* <td>{item.sDescription}</td> */}
                                                    <td>{item.date.slice(0, 10)}</td>
                                                    <td>{item.tokenName}</td>
                                                    <td>{item.tokenSupply}</td>
                                                    <td>{item.tokenSupply - item.toOwner}</td>
                                                </tr>
                                            </>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <p className="d-block d-sm-none">Scroll -></p>
                <div className="d-block d-sm-none">
                    {
                        React.Children.toArray(
                            projectList.ownProjects.map(
                                (item, i) =>
                                    <>
                                        <div className="horizontalCard">
                                            <div className="horizontalCardLeft">
                                                <div className="TokenModel">

                                                    {ChainIcons(item.tokenChain)}
                                                </div>
                                                <p className="noMargin">Created <br/> {item.date.slice(0, 10)}</p>
                                            </div>
                                            <div className="horizontalCardRight">
                                                <p>{item.projectName}</p>
                                                <p>{item.tokenName} <span style={{ fontWeight: "bold" }}>[{item.tokenShort}]</span></p>
                                                <p>{item.sDescription}</p>
                                                
                                                <div className="collapse" id={"collapseCard" + i}>
                                            
                                                <p>{item.lDescription}</p>
                                            
                                                </div>

                                                
                                                <p>Created by {item.projectOwnerName}</p>
                                                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={"#collapseCard" + i} aria-expanded="false" aria-controls={"collapseCard" + i} >
                                                    More Info
                                                </button>
                                            </div>
                                        </div>


                                        {/* <tr>
                                        <td><Link to={"/edit/project/" + item._id}><FontAwesomeIcon icon={faEdit} /></Link></td>
                                        <td style={{ color: "blue" }} onClick={() => goToProject(item._id)}>{item.projectName}</td>
                                        <td class="iconCell"></td>
                                       
                                        

                                        <td>{item.tokenSupply}</td>
                                        <td>{item.tokenSupply - item.toOwner}</td>
                                    </tr> */}
                                    </>
                            )
                        )
                    }
                </div>
            </>

        )}


    </div>

}