import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';


export default function Login(){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();


    // if(userData.user) {
    //     history.push("/");
    
    // }

    const submit = async (e) => {

        try{
        e.preventDefault();
        const loginUser = {email, password};
        const loginRes = await Axios.post("http://localhost:1234/users/login", loginUser,
        {
            headers: { "refresh-token": localStorage.getItem("refresh-token") } 
        }
        );

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        });
        
        const userString = JSON.stringify(loginRes.data.user);

        localStorage.setItem("auth-token", loginRes.data.token);
        localStorage.setItem("refresh-token", loginRes.data.refreshToken);
        localStorage.setItem("userData", userString);

        history.push("/");
        } catch (err){
            err.response.data.msg && setError([err.response.data.msg, "danger"])
        }
        window.location.reload(true)
    }



    return <div>
          {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
        <h2>Login</h2>
        <form className="col-10 margin0a" onSubmit={submit}>
            <label>Email</label>
            <input id="login-email" type="email" onChange={e => setEmail(e.target.value)}/>
            <label>Passwort</label>
            <input id="login-password" type="password" onChange={e => setPassword(e.target.value)}/>
            <input type="submit"></input>
         </form>
        </div>

}
