import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';

export default function Register(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayname, setDisplayName] = useState();
    const [paymentPlan, setPaymentPlan] = useState();
    const [fullname, setFullName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [error, setError] = useState();

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    //if(userData.user) history.push("/");

    const submit = async (e) => {
        e.preventDefault();
        
        try {
        const newUser = {email, password, passwordCheck, displayname, fullname, userDescription};
        console.log(newUser);
        
        await Axios.post("http://localhost:1234/users/register", newUser);
        const loginRes = await Axios.post("http://localhost:1234/users/login", {
        email,
        password
        });

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });

        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    
    } catch(err){
        err.response.data.msg && setError([err.response.data.msg, "warning"])
    }

}


    return <div>
        <h2>Registrieren</h2>
        {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
        <form className="col-10 margin0a" onSubmit={submit}>
            <label>Email</label>
            <input id="register-email" type="email" onChange={e => setEmail(e.target.value)}/>
            <label>Passwort</label>
            <input id="register-password" placeholder="Mind. 5 Zeichen" type="password" onChange={e => setPassword(e.target.value)}/>
            <label>Passwort wiederholen</label>
            <input id="password" placeholder="Passwort wiederholen" type="password" onChange={e => setPasswordCheck(e.target.value)}/>
            <label>Display Name</label>
            <input id="register-display-name" type="text" onChange={e => setDisplayName(e.target.value)}/>
            <label>User Description</label>
            <textarea id="register-user-description" style={{width: "100%"}} type="text" onChange={e => setUserDescription(e.target.value)} rows="3" />
            <label>Full Name</label>
            <input id="register-full-name" placeholder="Max Mustermann" type="text" onChange={e => setFullName(e.target.value)}/>

            <div className="card-deck mb-2 text-center">
                {paymentPlan != "pro" &&
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title pricing-card-title">Free</h5>
                        {paymentPlan && 
                            <button className="btn btn-md btn-warning" onClick={e => setPaymentPlan()} >Auswahl zurücksetzen</button>
                        }
                    </div>
                        <div className="card-body">
                        <h3>0€ <small class="text-muted">/ Monat</small></h3>
                        <ul className="list-unstyled mt-3 mb-4">
                            <li>1 user</li>
                            <li>Get funding for your project</li>
                            <li>Email support</li>
                            <li>Help center access</li>
                        </ul>
                        <button className="btn btn-lg btn-block btn-outline-primary" value="free" onClick={e => setPaymentPlan(e.target.value)}>Kostenlos registrieren</button>
                    </div>
                </div>
                }

                {paymentPlan != "free" &&
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title pricing-card-title">Pro</h5>
                        {paymentPlan && 
                            <button className="btn btn-md btn-warning" onClick={e => setPaymentPlan()} >Auswahl zurücksetzen</button>
                        }
                    </div>
                    <div className="card-body">
                        <h3>10€ <small class="text-muted">/ Monat</small></h3>
                        <ul className="list-unstyled mt-3 mb-4">
                            <li>Create an 0rganisation</li>
                            <li>Top Visibility</li>
                            <li>Marketing Package</li>
                            <li>Premium Support</li>
                        </ul>
                        <button className="btn btn-lg btn-block btn-primary" value="pro" onClick={e => setPaymentPlan(e.target.value)}>Pro Account anlegen</button>
                    </div>
                </div>
                }
            </div>
            <br/>
            <input className="btn btn-primary"type="submit" value="Register"/>
         </form>
    </div>
}