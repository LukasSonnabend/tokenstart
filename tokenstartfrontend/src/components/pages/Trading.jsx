import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';
import UserContext from "../../context/UserContext";
import ChartTrading from '../misc/ChartTrading';
import ProgressBar from '../misc/ProgressBar';
import ProjectCarouselGuest from '../misc/ProjectCarouselGuest';
import { BrowserRouter, RouteLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ChainIcons from "../misc/chainIcon";
import Button from 'react-bootstrap/Button';


export default function Trading(props) {
    const { userData } = useContext(UserContext);
    const [projectInfo, setProjectInfo] = useState();
    const history = useHistory();

    const goToProject = (id) => history.push("/project/"+id);

    let editLink = "";

    useEffect(() => {
        getProjects();



    }, [props.match.params.projectId]);

    async function getProjects() {
        const projectRes = await Axios.post("http://localhost:1234/projects/" + props.match.params.projectId)
        setProjectInfo({
            Project: projectRes.data
        });

    }

    if (projectInfo && userData.user) {
        if (projectInfo["Project"].projectOwnerID == userData.user.id) {
            editLink = <Link to={"/edit/project/" + props.match.params.projectId}><button className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /> Edit project</button></Link>;
        }
    }


    return <div>
        {projectInfo === undefined ? (<p>Please Log in </p>) : (
            <>

                <div className="d-md-flex ml-4">

                    <ChartTrading className="investor-profile-box "></ChartTrading>
        
                    <table className="table table-striped ml-4">
                        <thead>
                            <tr>
                                {/* <th scope="col">Edit</th> */}
                                <th className="p-0">Price(USD)</th>
                                <th className="p-0">Amount</th>
                                <th className="p-0">Total $</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="down p-1 last-offer-cell ">{Math.floor(Math.random() * 20) + 5}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 10) + 2}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 100)}</td>
                            </tr>
                            <tr>
                                <td className="down p-1">{Math.floor(Math.random() * 20) + 5}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 10) + 2}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 100)}</td>
                            </tr>
                            <tr>
                                <td className="down p-1">{Math.floor(Math.random() * 20) + 5}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 10) + 2}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 100)}</td>
                            </tr>
                            <tr>
                                <td className="down p-1">{Math.floor(Math.random() * 20) + 5}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 10) + 2}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 100)}</td>
                            </tr>
                            <tr>
                                <td className="down p-1">{Math.floor(Math.random() * 20) + 5}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 10) + 2}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 100)}</td>
                            </tr>
                            <tr>
                                <td className="down p-1">{Math.floor(Math.random() * 20) + 5}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 10) + 2}</td>
                                <td className="down p-1">{Math.floor(Math.random() * 100)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div>



                    </div>

                </div>

                <button onClick={() => goToProject(projectInfo.Project._id)} className="btn btn-success mt-4">Make Trade</button>



                <div className="d-flex justify-content-center">
                    <h2>Project description</h2>
                    {ChainIcons(projectInfo.Project.tokenChain)}
                </div>

                <p className="">
                Bacon ipsum dolor amet turducken short loin ball tip shankle, filet mignon porchetta kevin drumstick brisket sirloin pork belly beef ribs. Hamburger salami bresaola strip steak. Buffalo tail pork flank landjaeger meatloaf. Hamburger beef fatback flank, swine bresaola ground round burgdoggen. Ground round flank frankfurter drumstick prosciutto buffalo. Frankfurter pork pork belly jowl shank chislic pork chop sausage beef alcatra. Rump burgdoggen frankfurter, beef ribs ham hock boudin turkey pancetta bresaola kielbasa short loin bacon alcatra drumstick pork belly.
                    </p>

                <button onClick={() => goToProject(projectInfo.Project._id)} className="btn btn-primary mb-4">Got To Project Page</button>

                <ProjectCarouselGuest></ProjectCarouselGuest>

            </>

        )
        }


    </div >




}
