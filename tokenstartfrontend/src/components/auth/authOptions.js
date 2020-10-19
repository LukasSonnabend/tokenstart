import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function AuthOptions(){
    //Destructure userContext Object
    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory();

    //const register = () => history.push("/register")
    //const login = () => history.push("/login")
    const accSettings = () => history.push("/account")
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        Axios.post("http://localhost:1234/users/logout", {}, 
        {
            headers: { "refresh-token": localStorage.getItem("refresh-token") } 
        })


        localStorage.setItem("auth-token", "");
        localStorage.setItem("refresh-token", "");
        localStorage.setItem("userData", "");


    }

    return (
        <div>
            {
                userData.user ? (
                <>
                <button className="btn btn-danger mr-2" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /></button>
                <button className="btn btn-info" onClick={accSettings}><FontAwesomeIcon icon={faUserCircle} /></button>
                </>
                ) :
                (
                <> 
                {/* <Link to="/register"><button className="btn btn-info" onClick={register}>Register</button></Link> */}
                    <Link to="/register"><button className="btn btn-info">Register</button></Link>
                    {/* <button className="btn btn-primary" onClick={login}>Login</button> */}
                    <Link to="/login"><button className="btn btn-primary">Login</button></Link>
                </>
                )
            }   


        </div>

    )

}