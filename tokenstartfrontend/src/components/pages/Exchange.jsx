import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


export default function Exchange() {
    const { userData } = useContext(UserContext);
    const [projectList, setProjectList] = useState();

    const history = useHistory();
    const goToProject = (id) => history.push("/project/"+id);
    const goToUser = (userName) => history.push("/user/" + userName);
    const goToTrade = (id) => history.push("/trade/" + id);

    let allProjectsList;

    let exchangeInfo = {

    }

    useEffect(() => {

        async function getProjects() {
            const projectRes = await Axios.get("https://tokenstart.herokuapp.com/projects/")
            setProjectList(projectRes.data);

        }

        getProjects();


    }, []);


    let investors = {
        "djhd83838hnfiehi": {
            "name": "Big Mama",
            "_id": "djhd83838hnfiehi",
            "image": "https://i.ibb.co/sRPw3rp/photo-1573878221136-9b03f3d976b7.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..`
        },
        "ijd9j8j9j9fd": {
            "name": "Uncle Jeff",
            "_id": "ijd9j8j9j9fd",
            "image": "https://i.ibb.co/NTY8zrZ/photo-1573878416776-932ce6911da2.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..`
        },
        "ijd9mai9j9fd": {
            "name": "Mia Anderson",
            "_id": "ijd9mai9j9fd",
            "image": "https://i.ibb.co/GCBSYmD/photo-1565128936512-e7333b8325ce.jpg",
            "description": `Spicy jalapeno bacon ipsum dolor amet shank picanha frankfurter nostrud, aliqua nulla quis.
            Andouille sausage. Pork chop quis cupim, chicken picanha non aliquip sirloin lorem in. Pig pastrami. 
            Shankle anim velit. Ham incididunt shank anim t-bone fatback dolor frankfurter spare ribs landjaeger 
            occaecat nulla ball tip. Cupim sausage proident..`
        }
    }





    // let editLink = "";

    // useEffect(() => {
    //     if (!Project._id) {
    //         getProjects();
    //     }


    // }, [props.match.params.projectId]);

    // async function getProjects() {
    //     const projectRes = await Axios.post("https://tokenstart.herokuapp.com/projects/" + props.match.params.projectId)
    //     setProjectInfo({
    //         Project: projectRes.data
    //     });

    // }

    // if (projectInfo && userData.user) {
    //     if (projectInfo["Project"].projectOwnerID == userData.user.id) {
    //         editLink = <Link to={"/edit/project/" + props.match.params.projectId}><button className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /> Edit project</button></Link>;
    //     }
    // }


    return <div>
        {projectList === undefined ? (<h1>Getting Exhange Info</h1>) : (
            <>

                {/* { userData.user.id == projectInfo._id  && <Link to={"/edit/project/" + props.match.params.projectId}>Edit project</Link> } */}

                {/* <div className="col-6">
                    <Link to="/projects"> Go to projects overview</Link>
                </div> */}


                <div>
                    <div>
                        <div className="d-inline-flex col-10 justify-content-between w-100">
                    <h2><img style={{maxHeight: "2rem"}} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/263/coin_1fa99.png"/>Popular Trades Crypto</h2>
                    <div className="d-inline-flex">
                    <h3>Show: </h3>
                    <DropdownButton id="dropdown-basic-button" title="All">
                            <Dropdown.Item>ETH</Dropdown.Item>
                            <Dropdown.Item>DOT</Dropdown.Item>
                            <Dropdown.Item>EOS</Dropdown.Item>
                            <Dropdown.Item>All</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    </div>
                    <div className="ourBox d-flex col-10 margin0a my-2">    
                        <Table className="m-2" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Project Owner</th>
                                    <th>Blockchain</th>
                                    <th>Last offer</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {projectList.map(
                        (item, i) =>
                        <>
                        <tr>
                        <td style={{color: "blue"}} onClick={() => goToProject(item._id)}>{item.projectName}</td>
                        <td onClick={() => goToUser(item.projectOwnerName)}>{item.projectOwnerName}</td>
                        <td>{item.tokenChain}</td>
                            <td className="last-offer-cell"><span className={ Math.random() > 0.5 ? "up" : "down"}>{ 
                            Math.ceil(Math.random()* 100 + 30 )}</span>
                        </td>
                        <td><Button variant="success" onClick={() => goToTrade(item._id)}>Buy</Button></td>

                        </tr>
                        </>
                        )}
                            </tbody>
                        </Table>
                        </div>
                    </div>


                    <div>
                        <div className="d-inline-flex col-10 w-100">
                    <h2>🏦 Popular Trades Fiat</h2>
                    {/* <div className="d-inline-flex">
                    <h3>Show: </h3>
                    <DropdownButton id="dropdown-basic-button" title="All">
                            <Dropdown.Item>ETH</Dropdown.Item>
                            <Dropdown.Item>DOT</Dropdown.Item>
                            <Dropdown.Item>EOS</Dropdown.Item>
                            <Dropdown.Item>All</Dropdown.Item>
                        </DropdownButton>
                    </div> */}
                    </div>
                    <div className="ourBox d-flex col-10 margin0a my-2">    
                        <Table className="m-2" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Project Owner</th>
                                    <th>Blockchain</th>
                                    <th>Last offer</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {projectList.map(
                        (item, i) =>
                        <>
                        <tr>
                        <td style={{color: "blue"}} onClick={() => goToProject(item._id)}>{item.projectName}</td>
                        <td onClick={() => goToUser(item.projectOwnerName)}>{item.projectOwnerName}</td>
                        <td>{item.tokenChain}</td>
                            <td className="last-offer-cell"><span className={ Math.random() > 0.5 ? "up" : "down"}>{ 
                            Math.ceil(Math.random()* 100 + 30 )}€</span>
                        </td>
                        <td><Button variant="success" onClick={() => goToTrade(item._id)}>Buy</Button></td>

                        </tr>
                        </>
                        )}
                            </tbody>
                        </Table>
                        </div>
                    </div>

                </div>
            </>

        )
        }


    </div >



}
