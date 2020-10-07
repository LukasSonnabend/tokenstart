import React, { useState, useEffect, useContext } from 'react';
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';
import UserContext from "../../context/UserContext";
import ProgressBar from '../misc/ProgressBar';
import ProjectCarouselGuest from '../misc/ProjectCarouselGuest';
import { Link } from 'react-router-dom';
import ChainIcons from "../misc/chainIcon";
import Payment from './payment';


export default function Project(props) {
    const { userData } = useContext(UserContext);
    const [projectInfo, setProjectInfo] = useState();

    let editLink = "";

    useEffect(() => {

        async function getProjects() {
            const projectRes = await Axios.post("http://localhost:1234/projects/" + props.match.params.projectId)
            setProjectInfo({
                Project: projectRes.data
            });

        }

        getProjects();



    }, []);


    if (projectInfo && userData.user) {
        if (projectInfo["Project"].projectOwnerID == userData.user.id) {
            editLink = <Link to={"/edit/project/" + props.match.params.projectId}>Edit project</Link>;
        }
    }


    return <div>
        {projectInfo == undefined ? (<p>Please Log in </p>) : (
            <>
                {/* { userData.user.id == projectInfo._id  && <Link to={"/edit/project/" + props.match.params.projectId}>Edit project</Link> } */}

                <div className="editLink">{editLink}</div>

                <div className="col-6">
                    <Link to="/projects"> Go to projects overview</Link>
                </div>



                <div id="carouselExampleControls" className="carousel slide col-12 col-md-8 margin0a p-2" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <img height="315" src="https://images.unsplash.com/photo-1580670029149-5c00eec8bb66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=560&q=80" alt="..." />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/0ZrzQYzWq68" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <img height="315" src="https://images.unsplash.com/photo-1549070419-1a0fb71f1302?ixlib=rb-1.2.1&auto=format&fit=crop&w=560&q=80" alt="..." />
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

                <ProgressBar tokenData={projectInfo.Project} />

                <div onClick="" className="horizontalCard col-11 col-md-6 margin0a">
                    <div className="horizontalCardLeftProject">
                        <div className="tokenModel1">

                            {ChainIcons(projectInfo.Project.tokenChain)}
                        </div>
                        
                    </div>
                    <div className="text-left horizontalCardRightProject pl-2">
                        <div className="mt-2">
                        <p>{projectInfo.Project.projectName} <span style={{ fontWeight: "bold" }}>{projectInfo.Project.tokenShort}</span></p>
                        <p className="mb-0">{projectInfo.Project.sDescription}</p>
                        <span>
                        <p className="noMargin">Token Supply: {projectInfo.Project.tokenSupply}</p>
                        <p className="noMargin">Creation Date: {projectInfo.Project.date.slice(0, 10)}</p>
                        <p className="noMargin">Funding Deadline: 2020-25-01</p>
                        </span>
                        </div>
                    </div>
                </div>


                <div className="tableDiv col-10 margin0a card">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Owner</th>
                                {/* <th scope="col">Description</th> */}
                                <th scope="col">Creation Date</th>
                                <th scope="col">Token Name</th>
                                <th scope="col">Token Supply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {


                                <tr>
                                    <td>{projectInfo.Project.projectName}</td>
                                    <td>{projectInfo.Project.projectOwnerName}</td>
                                    {/* <td>{projectInfo.Project.sDescription}</td> */}
                                    <td>{projectInfo.Project.date.slice(0, 10)}</td>
                                    <td>{projectInfo.Project.tokenName}</td>
                                    <td>{projectInfo.Project.tokenSupply}</td>
                                </tr>


                            }
                        </tbody>
                    </table>
                </div>
                <div className="mb-2">
                    <h2>Project description</h2>
                    <p className="col-10 col-md-10 margin0a mb-3">
                        {projectInfo.Project.lDescription}
                    </p>
                </div>
                <div className="row col-md-11 margin0a mb-3">
                    <div className="col-12 col-md-6">
                        <h2>About the creator {projectInfo.Project.projectOwnerName}</h2>
                        <p className="col-12">
                            Is own and differentiates officer as and good alphabet odd farther of no we're and eager. Would the hologram over myself fresh before continues business approved he seven incurred about every so phase the long, and slide is actually person, away, because way. A of after their be more the.
                    <br /><br />Intention he his shall gain, he entrance don't lamps, were more by they example, dreams, agreed few the practice a have live river and a takes hollow more the frequently the where the her self-interest, question. To you in such be affected shine. We of on word countries.
                </p>
                    </div>
                    <div className="col-md-6">
                        <h2>Project overview</h2>
                        <table className="table table-bordered margin0a mb-4">

                            <tr>
                                <th>Available supply</th>
                                <td>{projectInfo.Project.tokenSupply - projectInfo.Project.toOwner}</td>
                            </tr>
                            <tr>
                                <th>Project start</th>
                                <td>{projectInfo.Project.date.slice(0, 10)}</td>
                            </tr>
                            <tr>
                                <th>Token price</th>
                                <td>50$</td>
                            </tr>
                        </table>
                        <Link to={{
                                pathname: '/checkout',
                                state: {
                                    project: projectInfo
                                }
                        }} className="btn btn-primary">Buy Token</Link>
                    </div>
                </div>
                <div>
                    <h2>Suggested projects for you</h2>
                    <ProjectCarouselGuest></ProjectCarouselGuest>
                </div>
            </>

        )
}


    </div >




}
