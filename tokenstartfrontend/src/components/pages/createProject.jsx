import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ImageUploader from 'react-images-upload';
import ErrorNotice from '../misc/ErrorNotice';
import ProgressBar from '../misc/ProgressBar';
import { BrowserRouter, RouteLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ChainIcons from "../misc/chainIcon";

export default function CreateProject() {
    const [projectName, setProjectName] = useState();
    const [tokenChain, setTokenChain] = useState();
    const [shortDescription, setShortDescription] = useState();
    const [longDescription, setLongDescription] = useState();
    const [tokenName, setTokenName] = useState();
    const [category, setCategory] = useState();
    const [tokenShort, setTokenShort] = useState();
    const [tokenSupply, setTokenSupply] = useState("Token Supply");
    const [smallestTradable, setSmallestTradable] = useState();
    const [pictures, setPictures] = useState([]);
    const [toOwner, setToOwner] = useState();
    const [error, setError] = useState();

    const { userData } = useContext(UserContext);
    const history = useHistory();

    let user = "";
    localStorage.getItem("userData") ? user = localStorage.getItem("userData") : user = "";

    useEffect(() => {
        if (user == "") history.push("/login")


        if (pictures.length > 0) document.getElementById("imgViewer").src = pictures[0]

    }, [pictures])


    const onDrop = (e, picture) => {
        // console.log(e)
        // console.log(picture)
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


    //user = userData.user;
    let imgUrl
    useEffect(() => {


        if (pictures.length > 0) document.getElementById("imgViewer").src = pictures[0]

    }, [pictures])

    const submit = async (e) => {
        try {
            e.preventDefault();
            const newProject = {
                projectName: projectName,
                projectPicture: pictures[0],
                tokenChain: tokenChain,
                category: category,
                sDescription: shortDescription,
                lDescription: longDescription,
                tokenName: tokenName,
                tokenShort: tokenShort,
                tokenSupply: tokenSupply,
                smallestTradable: smallestTradable,
                toOwner: toOwner,
                projectOwnerName: userData.user.displayname,
                projectOwnerDescription: userData.user.userDescription,
                projectOwnerID: userData.user.id,

            };

            console.log(newProject)

            const accessToken = await Axios.post("http://localhost:1234/users/refreshtokenisvalid", {},
                {
                    headers: {
                        "refresh-token": localStorage.getItem("refresh-token")
                    }
                })
            localStorage.setItem("auth-token", accessToken.data.AccessToken)


            const createNewProject = await Axios.post("http://localhost:1234/projects/new", newProject,
                {
                    headers: { "auth-token": localStorage.getItem("auth-token") }
                }
            );

            createNewProject.data.msg && setError([createNewProject.data.msg, "success"])
            history.push("/");

        } catch (err) {
            err.response.data.msg && setError([err.response.data.msg, "warning"])
        }
    }
    useEffect(() => {
        if (user == "") {
            history.push("/login");

        }


    }, []);
    return <div>
        {user == "" ? history.push("/login") :
            (<>
                <h2>Create new project</h2>
                <form className="col-10 margin0a" onSubmit={submit}>
                    <div className="card">
                        <label>Project name</label>
                        <input id="new-ProjectName" type="text" placeholder='e.g. Community project"' onChange={e => setProjectName(e.target.value)} />

                        {pictures.length < 1 &&
                            <ImageUploader
                                withIcon={true}
                                singleImage={true}
                                onChange={onDrop}
                                label="Max file size: 5mb, accepted: jpg|gif|png|jpeg"
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                            />
                        }

                        {pictures.length > 0 &&
                            <>
                                <div>
                                    <button className="btn btn-danger" onClick={() => setPictures([])}>X</button>
                                    <div>
                                        <img id="imgViewer" />
                                    </div>
                                </div>
                            </>

                        }





                        <div className="card-deck">
                            <div id="Ethereum" className="card cryptoCard">
                                <img className="card-img-top cryptoCardImg" src="https://upload.wikimedia.org/wikipedia/commons/7/70/Ethereum_logo.svg" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Ethereum</h5>
                                    <button className="btn btn-primary" value="Ethereum" onClick={e => {
                                        e.preventDefault();
                                        setSelection(e.target.value);
                                    }
                                    }>select</button>
                                </div>
                            </div>
                            <div id="TRON" className="card cryptoCard">
                                <img className="card-img-top cryptoCardImg" src="https://banner2.cleanpng.com/20180824/vuw/kisspng-cryptocurrency-blockchain-tron-logo-ethereum-top-2-ethereum-tokens-to-invest-in-bit-world-5b7f9cbfb1e3f4.7066100315350898557287.jpg" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">TRON</h5>
                                    <button className="btn btn-primary" value="TRON" onClick={e => {
                                        e.preventDefault();
                                        setSelection(e.target.value);
                                    }
                                    }>select</button>
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
                                    }>select</button>
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
                                    }>select</button>
                                </div>
                            </div>
                        </div>
                        <select name="cars" id="cars" onChange={e => setCategory(e.target.value)}>
                        <option value="" disabled selected>Select Category</option>
                            <option value="Technology">Technology</option>
                            <option value="Games">Games</option>
                            <option value="Music">Music</option>
                            <option value="Journalism">Journalism</option>
                            <option value="Technology">Design</option>
                            <option value="Games">Film & Video</option>
                            <option value="Music">Fashion</option>
                            <option value="Journalism">Publishing</option>
                        </select>
                        <label>Short description</label>
                        <input id="new-ShortDescription" type="text" placeholder='z.B. "Cleaning of community gardens"' onChange={e => setShortDescription(e.target.value)} />
                        <label>Project description</label>
                        <textarea id="new-LongDescription" type="text" onChange={e => setLongDescription(e.target.value)} rows="3" />
                        <label>Project owner</label>
                        <input id="new-ProjektOwner" type="text" value={JSON.parse(user).displayname} disabled />
                    </div>
                    <div className="card">
                        
                        <label>Token name</label>
                        <input id="new-TokenName" type="text" onChange={e => setTokenName(e.target.value)} />
                        <label>Token Short (e.g. BTC)</label>
                        <input className="is-invalid" id="new-TokenShort" placeholder="Max. 3 signs" type="text" onChange={e => setTokenShort(e.target.value)} />
                        <label>Total token amount</label>
                        <input id="new-TokenSupply" type="number" onChange={e => setTokenSupply(parseInt(e.target.value))} />
                        <label>Individual minimum contribution</label>
                        <input id="new-smallestTradable" step=".01" type="number" onChange={e => setSmallestTradable(parseInt(e.target.value))} />
                        <label>Tokens owned by creator</label>
                        <input id="new-toOwner" placeholder={"Max. " + tokenSupply} type="number" onChange={e => setToOwner(parseInt(e.target.value))} />
                    </div>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                    <input className="btn btn-primary" type="submit" value="Create project" />
                </form>
            </>
            )
        }
    </div>
}