import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import ChainIcons from "../misc/chainIcon";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';

import QRCode from "qrcode.react";

export default function Payment(props) {

    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    //const { projectInfo } = props;
    const projectInfo = props.location.projectProps

    const [paymentType, setPaymentType] = useState();
    const [investment, setInvestment] = useState();
    const [showQR, setShowQR] = useState();

    const qrMessage = "Fuck you you little Bitch \n Send " + investment + " to " + paymentType + " Wallet ID " + "DFOHJIUDF8834840dkdkkd45848kejdvoih§(%/jdj";

    useEffect(() => {
        if (localStorage.getItem("auth-token").length === 0) {
            history.push("/login");
            
        }


    }, []);



    return <div>
        {projectInfo === undefined ? (<p>Please Log in </p>) : (
            <>
                <div className="col-12 col-md-12 col-xl-8 margin0a">
                    <h2>Payment</h2>
                    <div className="row">
                        <div className="col-10 col-md-6 margin0a">
                            <>
                                <div className="horizontalCard">
                                    <div className="horizontalCardLeft">
                                        <div className="TokenModel">

                                            {ChainIcons(projectInfo.project.tokenChain)}
                                        </div>
                                        {/* <p className="noMargin">Created <br /> {projectInfo.project.date.slice(0, 10)}</p> */}
                                    </div>
                                    <div className="horizontalCardRight">
                                        <p>{projectInfo.project.projectName}</p>
                                        <p><span style={{ fontWeight: "bold" }}>[{projectInfo.project.tokenShort}]</span></p>
                                        <p>{projectInfo.project.sDescription}</p>
                                        <div className="collapse" id={"collapseCard"}>

                                            <p>{projectInfo.project.lDescription}</p>

                                        </div>


                                        <p>Created by {projectInfo.project.projectOwnerName}</p>
                                        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={"#collapseCard"} aria-expanded="false" aria-controls={"collapseCard"} >
                                            More Info
                                                </button>
                                    </div>
                                </div>
                            </>

                        </div>
                        <form className="col-10 col-md-4 margin0a">
                            <div className="form-group">
                            <label for="paymentFormControlTokenShort">Token</label>
                                <input className="form-control" type="text" placeholder={projectInfo.project.tokenName + " [" + projectInfo.project.tokenShort +"]"} disabled/>

                                {/* <label for="exampleFormControlInput1">Email address</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" /> */}
                            </div>
                            <div className="form-group">
                                <label for="paymentFormControlBlockchain">Select Payment</label>
                                <select className="form-control" id="exampleFormControlSelect1" placeholder="Please select Blockchain for payment" onChange={e => setPaymentType(e.target.value) }>
                                    <option value="" disabled selected>Select your option</option>
                                    <option>TRON</option>
                                </select>
                            </div>

                            {/* <div className="form-group">
                                <label for="exampleFormControlSelect2">Example multiple select</label>
                                <select multiple className="form-control" id="exampleFormControlSelect2">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div> */}

                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Investment</label>
                                <input className="form-control" type="number" onChange={e => setInvestment(e.target.value)} placeholder={"Smallest tradable unit " + projectInfo.project.smallestTradable} min={projectInfo.project.smallestTradable} step={projectInfo.project.smallestTradable}/>
                            </div>
                            <button className="btn btn-primary mb-3" onClick={e => {
                                        e.preventDefault();
                                        if (investment > 0 && investment % projectInfo.project.smallestTradable === 0 && paymentType){
                                        setShowQR(true);}
                                        else {alert("Please set payment type and investment amount")}
                                    
                                    }
                                    }>Generate Payment QR-Code</button>

                        </form>


                        { showQR && <QRCode className="mb-3 margin0a" 
                        value={qrMessage}
                        />}
      
                    </div>


                </div>
            </>
        )
        }</div>
}