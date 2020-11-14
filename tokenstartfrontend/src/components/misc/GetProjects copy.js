import React, { useState, useEffect, useContext}from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";


export default function GetProjects(props){

    const [projectList, setProjectList] = useState();
    const [projectOwnedList, setProjectOwnedList] = useState();

    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const goToProject = (id) => history.push("/project/"+id);
    const goToUser = (userName) => history.push("/showuser/" + userName);

    if (props.userID != "undefined"){
        const userID = props.userID
    } else{
        const userID = "" 
    }

    useEffect(() => {
        
        async function getProjects(){
            const projectRes = await Axios.get("https://tokenstart.herokuapp.com/projects/") 
            setProjectList({
                list: projectRes.data
            });
            setUserData({
                token: userData.token,
                user: userData.user,               
                list: projectRes.data
            });
        }

        getProjects();

    }, []);

    return <div>
        <span>Projects</span>
        {/* {JSON.stringify(projectList)} */}


        {projectList == undefined ? (<p>Please Log in </p>) : (
            <>
                <div className="tableDiv">
                     <table className="table table-striped">
                     <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Description</th>
                            <th scope="col">Creation Date</th>
                            <th scope="col">Token Name</th>
                            <th scope="col">Token Supply</th>
                            <th scope="col">In circulation</th>
                        </tr>
                    </thead>
                    <tbody>
            {
                React.Children.toArray(
                    projectList.list.map(
                        (item, i) =>
                        <>
                        <tr>
                        <td style={{color: "blue"}} onClick={() => goToProject(item._id)}>{item.projectName}</td>
                        <td onClick={() => goToUser(item.projectOwnerName)}>{item.projectOwnerName}</td>
                        <td>{item.sDescription}</td>
                        <td>{item.date.slice(0, 10)}</td>
                        <td>{item.tokenName}</td>
                        <td>{item.tokenSupply}</td>
                        <td>{item.tokenSupply-item.toOwner}</td>
                        </tr>

                        {/* <td>{item.projectOwner}</td>
                        <td>{item.description}</td>
                        <td>{item.date}</td> */}
                        </>
                        )
                )
            }
                        </tbody>
                    </table>
                    <h2>Own Projects</h2>
                    <table className="table table-striped">
                     <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Creation Date</th>
                            <th scope="col">Token Name</th>
                            <th scope="col">Token Supply</th>
                            <th scope="col">In circulation</th>
                        </tr>
                    </thead>
                    <tbody>
            {
                React.Children.toArray(
                    projectList.list.filter( function(project) {
                        return project.projectOwnerID === props.userID;
                    }).map(
                        (item, i) =>
                        <>
                        <tr>
                        <td style={{color: "blue"}} onClick={() => goToProject(item._id)}>{item.projectName}</td>
                        <td>{item.sDescription}</td>
                        <td>{item.date.slice(0, 10)}</td>
                        <td>{item.tokenName}</td>
                        <td>{item.tokenSupply}</td>
                        <td>{item.tokenSupply-item.toOwner}</td>
                        </tr>

                        {/* <td>{item.projectOwner}</td>
                        <td>{item.description}</td>
                        <td>{item.date}</td> */}
                        </>
                        )
                )
            }
                        </tbody>
                    </table>
        </div>
        </>
        
        )}


    </div>

}