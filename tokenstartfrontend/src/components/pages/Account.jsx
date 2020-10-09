import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';

export default function Account(){

    const {userData} = useContext(UserContext);
    const [password, setPassword] = useState();
    const [userDescription, setUserDescription] = useState();
    const [error, setError] = useState();
    
    const token = userData.token;

    const history = useHistory();
    // let user = userData.user;
    let user = undefined;
    localStorage.getItem("userData").length > 0 ? user = JSON.parse(localStorage.getItem("userData")) : user = "";




    useEffect(() => {
        console.log(userData)
        if(user === "") history.push("/login");

        async function validateRefreshToken(){
        const accessToken = await Axios.post("http://localhost:1234/users/refreshtokenisvalid",{},
        {
            headers: { "refresh-token": localStorage.getItem("refresh-token") } 
        })
    //     if(accessToken === undefined) history.push("/login")
        console.log(accessToken)


}    
    
    validateRefreshToken()

}, [])

    
    const submit = async (e) => {
        try {
            e.preventDefault();
            const updateUser = {
                password: password,
                userDescription: userDescription
            
            };
            const accessToken = await Axios.post("http://localhost:1234/users/refreshtokenisvalid",{},
            {
                headers: { 
                    "refresh-token": localStorage.getItem("refresh-token")
                } 
            })
            //console.log(accessToken)
            
            localStorage.setItem("auth-token", accessToken.data.AccessToken)
            console.log(accessToken.data.AccessToken);

            const updateUserFunc = await Axios.post("http://localhost:1234/users/update", updateUser,
            {
                headers: { "auth-token": localStorage.getItem("auth-token") } 
            }
            );

            updateUserFunc.data.msg && setError([updateUserFunc.data.msg, "success"])

        } catch (err) {
            err.response.data.msg && setError([err.response.data.msg, "warning"])
        }
    }

    return <div>
        {user == undefined ? <p>Please Log in </p> : (
            <>
                <h2>Account: {user.fullname}</h2>
                {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                <form className="col-10 margin0a" onSubmit={submit}>
                    <label>Display Name</label>
                    <input id="update-display-name" value={user.displayname} type="text"/>
                    <label>User Bio</label>
                    <textarea className="w-100" id="update-user-description" placeholder={user.userDescription} cols="25" type="text" onChange={e => setUserDescription(e.target.value)}/>
                    <label>Full Name</label>
                    <input id="update-full-name" value={user.fullname} type="text"/>
                    <label>Email</label>
                    <input id="update-email" value={user.email} type="email"/>
                    <label>Passwort</label>
                    <input id="update-password" type="password" placeholder="*****" onChange={e => setPassword(e.target.value)}/>
                    <input type="submit"></input>
                </form>
            </>
        )
        }
        </div>



}
