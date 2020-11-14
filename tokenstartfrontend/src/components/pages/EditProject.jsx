import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ImageUploader from 'react-images-upload';
import ErrorNotice from '../misc/ErrorNotice';

export default function EditProject(props) {
    const [projectName, setProjectName] = useState();
    const [tokenChain, setTokenChain] = useState();
    const [shortDescription, setShortDescription] = useState();
    const [longDescription, setLongDescription] = useState();
    const [tokenName, setTokenName] = useState();
    const [tokenShort, setTokenShort] = useState();
    const [tokenSupply, setTokenSupply] = useState("Token Supply");
    const [smallestTradable, setSmallestTradable] = useState();
    const [pictures, setPictures] = useState([]);
    const [toOwner, setToOwner] = useState();
    const [tokenOwner, setTokenOwner] = useState();
    const [error, setError] = useState();

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    let user = undefined;
    localStorage.getItem("userData").length > 0 ? user = localStorage.getItem("userData") : user = "";


    const onDrop = (e, picture) => {
        console.log(e)
        console.log(picture)
        setPictures([...pictures, picture]);
    };

    function setSelection(chain) {
        // 0 are selected

        var selectedChain = document.getElementsByClassName("selected");

        if (selectedChain.length !== 0) {
            document.getElementById(selectedChain[0].id).classList.remove("selected");
            document.getElementById(chain).classList.add("selected");
            setTokenChain(chain);

        } else {
            document.getElementById(chain).classList.add("selected");
            setTokenChain(chain);
        }
    }

    useEffect(() => {
        if (user == undefined) history.push("/login")

        if (pictures.length > 0) document.getElementById("imgViewer").src = pictures[0]

        async function getProjects() {
            const projectRes = await Axios.post("https://tokenstart.herokuapp.com/projects/" + props.match.params.projectId)
            setProjectName(projectRes.data.projectName);
            setPictures(projectRes.data.picture)
            setTokenChain(projectRes.data.tokenChain);
            setShortDescription(projectRes.data.sDescription);
            setLongDescription(projectRes.data.lDescription);
            setTokenName(projectRes.data.tokenName);
            setTokenShort(projectRes.data.tokenShort);
            setTokenSupply(projectRes.data.tokenSupply);
            setSmallestTradable(projectRes.data.smallestTradable);
            setToOwner(projectRes.data.toOwner);
            setTokenOwner(projectRes.data.projectOwnerName);


            document.getElementById(projectRes.data.tokenChain).classList.add("selected");

            if (!userData.user) {
                return history.push("/404")
            }

        }

        getProjects();
        console.log(userData)




        //document.getElementById(tokenChain).classList.add("selected");       

    }, [user]);


    const deleteProject = async (e) => {
        try {
            const toDeleteProject = {
                projectId: props.match.params.projectId,
                projectOwnerID: userData.user.id,

            };

            const accessToken = await Axios.post("https://tokenstart.herokuapp.com/users/refreshtokenisvalid", {},
                {
                    headers: {
                        "refresh-token": localStorage.getItem("refresh-token")
                    }
                })

            localStorage.setItem("auth-token", accessToken.data.AccessToken)

            const deleteProject = await Axios.post("https://tokenstart.herokuapp.com/projects/delete", toDeleteProject,
                {
                    headers: { "auth-token": localStorage.getItem("auth-token") }
                }
            );

            deleteProject.data.msg && setError([deleteProject.data.msg, "success"])

            history.push("/");

        } catch (err) {
            //err.response.data.msg && setError([err.response.data.msg, "warning"])
        }
    }







    const submit = async (e) => {
        try {
            e.preventDefault();
            if (!userData){
                return setError([{msg: "Please set User Bio in Account Settings"}, "warning"])
            }
            const projectTemplate = {
                projectId: props.match.params.projectId,
                projectName: projectName,
                picture: pictures,
                tokenChain: tokenChain,
                sDescription: shortDescription,
                lDescription: longDescription,
                // tokenName: tokenName,
                // tokenShort: tokenShort,
                // tokenSupply: tokenSupply,
                // smallestTradable: smallestTradable,
                // toOwner: toOwner,
                projectOwnerName: userData.user.displayname,
                projectOwnerDescription: userData.user.userDescription,
                projectOwnerID: userData.user.id,

            };

            console.log(projectTemplate)

            const accessToken = await Axios.post("https://tokenstart.herokuapp.com/users/refreshtokenisvalid", {},
                {
                    headers: {
                        "refresh-token": localStorage.getItem("refresh-token")
                    }
                })
            localStorage.setItem("auth-token", accessToken.data.AccessToken)


            const editedProject = await Axios.post("https://tokenstart.herokuapp.com/projects/update", projectTemplate,
                {
                    headers: { "auth-token": localStorage.getItem("auth-token") }
                }
            );

            editedProject.data.msg && setError([editedProject.data.msg, "success"])
            history.push("/project/" + props.match.params.projectId);

        } catch (err) {
            console.log("this is error: " + err)
            //err.response.data.msg && setError([err.response.data.msg, "warning"])
        }
    }
    return <div>
        {user == undefined ? <p>Please Log in </p> :
            (<>
                <h2>Edit Token</h2>
                <form className="col-10 margin0a" onSubmit={submit}>
                    <div className="card">
                        <label>Project name</label>
                        <input id="new-ProjectName" value={projectName} type="text" placeholder='z.B. "AI Roboterarm"' onChange={e => setProjectName(e.target.value)} />

                        {/* {pictures.length < 1 &&
                            <ImageUploader
                                withIcon={true}
                                singleImage={true}
                                onChange={onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                            />
                        } */}

                       
                            <>
                                <div>
                                    <button className="btn btn-danger" onClick={() => setPictures([])}>X</button>
                                    <div>
                                        <img id="imgViewer" />
                                    </div>
                                </div>
                            </>
                        

                        <div className="card-deck">
                            <div id="Ethereum" className="card cryptoCard">
                                <div className="cryptoCardImg">
                                    <img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/7/70/Ethereum_logo.svg" alt="Card image cap" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Ethereum</h5>
                                    <button className="btn btn-primary" value="Ethereum" onClick={e => {
                                        e.preventDefault();
                                        setSelection(e.target.value);
                                    }
                                    }>wählen</button>
                                </div>
                            </div>
                            <div id="TRON" className="card cryptoCard">
                                <div className="cryptoCardImg">
                                    <img className="card-img-top" src="https://banner2.cleanpng.com/20180824/vuw/kisspng-cryptocurrency-blockchain-tron-logo-ethereum-top-2-ethereum-tokens-to-invest-in-bit-world-5b7f9cbfb1e3f4.7066100315350898557287.jpg" alt="Card image cap" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">TRON</h5>
                                    <button className="btn btn-primary" value="TRON" onClick={e => {
                                        e.preventDefault();
                                        setSelection(e.target.value);
                                    }
                                    }>wählen</button>
                                </div>
                            </div>
                            <div id="EOS" className="card cryptoCard">
                                <img className="card-img-top cryptoCardImg" src="https://ethereum-balance.de/img/token/eos_1.png" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">EOS</h5>
                                    <button className="btn btn-primary" value="EOS" onClick={e => {
                                        e.preventDefault();
                                        setSelection(e.target.value);
                                    }
                                    }>wählen</button>
                                </div>
                            </div>
                            <div id="Polkadot" className="card cryptoCard">
                                <img className="card-img-top cryptoCardImg" src="https://polkadot.network/content/images/2019/05/Polkadot_symbol_color.png" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Polkadot</h5>
                                    <button className="btn btn-primary" value="Polkadot" onClick={e => {
                                        e.preventDefault();
                                        setSelection(e.target.value);
                                    }
                                    }>wählen</button>
                                </div>
                            </div>
                        </div>



                        {/* <label for="exampleFormControlSelect1">Blockchain</label>
                        <select className="form-control" id="exampleFormControlSelect1" onChange={e => setTokenChain(e.target.value)}>
                            <option>Bitcoin</option>
                            <option>Ethereum</option>
                            <option>Ripple</option>
                            <option>Solidity</option>
                            <option>EOS.IO</option>
                            <option>Tezos</option>
                        </select> */}


                        <label>Short description</label>
                        <input id="new-ShortDescription" value={shortDescription} type="text" placeholder='z.B. "Anteilstoken für Roboterarm"' onChange={e => setShortDescription(e.target.value)} />
                        <label>Project description</label>
                        <textarea id="new-LongDescription" value={longDescription} type="text" onChange={e => setLongDescription(e.target.value)} rows="3" />
                        <label>Project owner</label>
                        <input id="new-ProjektOwner" type="text" value={tokenOwner} disabled />
                    </div>
                    <div className="card">
                        <label>Token name</label>
                        <input id="new-TokenName" value={tokenName} type="text" disabled />
                        <label>Token shortcut</label>
                        <input className="is-invalid" value={tokenShort} id="new-TokenShort" placeholder="Max. 3 Zeichen" type="text" onChange={e => setTokenShort(e.target.value)} disabled />
                        <label>Total token amount</label>
                        <input id="new-TokenSupply" value={tokenSupply} type="number" disabled />
                        <label>Individual minimum contribution</label>
                        <input id="new-smallestTradable" value={smallestTradable} type="number" disabled />
                        <label>Tokens owned by creator</label>
                        <input id="new-toOwner" value={toOwner} placeholder={"Max. " + tokenSupply} type="number" disabled />
                    </div>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                    <div className="row">
                        <input className="btn btn-primary" type="submit" onClick={() => submit()} value="Edit Project" />
                    </div>
                </form>
                <button className="btn btn-danger" type="submit" onClick={() => deleteProject()}>Delete Project</button>
            </>
            )
        }
    </div>
}