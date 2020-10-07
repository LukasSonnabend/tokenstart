import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ChainIcons from "./chainIcon";
import Axios from "axios";


export default function GetProjects() {

    const [searchTerm, SetSearchTerm] = useState();
    const [resultList, setResultList] = useState();
    const [showSearch, setShowSearch] = useState();
    const history = useHistory();

    //https://levelup.gitconnected.com/building-a-simple-dynamic-search-bar-in-react-js-f1659d64dfae

    const goToProject = id => {
        setShowSearch(false);
        SetSearchTerm(undefined);
        console.log(document.getElementById("searchField").value = '');
        history.push("/project/" + id);

    }

    useEffect(() => {

        //get project names + ids

        async function getProjects() {
            const projectRes = await Axios.get("http://localhost:1234/projects/")
            let allProjectsList = projectRes.data;


            setResultList({
                matchingProjects: allProjectsList.filter(project => project["projectName"].toLowerCase().includes(searchTerm.toLowerCase())),
            });

        }

        if (searchTerm) {
            setShowSearch(true);
            getProjects();
        }

    }, [searchTerm]);

    return <div className="mb-0" >

         { showSearch &&<div className="focusCatch" onClick={(e) => setShowSearch(false)}>
        LIt
        </div>}

        <input id="searchField" className="searchField mb-0" type="text" placeholder="Search TokenStart Projects" onChange={(e) => SetSearchTerm(e.target.value)} />
        <div className="col-12 searchResults position-absolute">
            <ul className="my-0">
                { showSearch &&
                resultList !== undefined &&

                    resultList.matchingProjects.map(
                        (item, i) =>
                            <>
                                <li onClick={ () => goToProject(item._id)}>
                                    <div key={i} className="d-flex">
                                        <div className="col-3">
                                            {ChainIcons(item.tokenChain)}
                                        </div>
                                        <div className="col-9">
                                            <p className="my-1">{item.projectName} <span style={{ fontWeight: "bold" }}>[{item.tokenShort}]</span></p>
                                            <p className="my-1">Created by {item.projectOwnerName}</p>
                                            <small className="noMargin">{item.date.slice(0, 10)}</small>
                                        </div>
                                    </div>
                                </li>
                            </>
                    )

                
                }
            </ul>
        </div>
    </div>

}