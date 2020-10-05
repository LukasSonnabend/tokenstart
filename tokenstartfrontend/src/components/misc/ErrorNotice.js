import React  from "react";

export default function ErrorNotice(props){
    return <div className={"alert alert-"+props.message[1]} role="alert">
        <span>{props.message[0]}</span>
        <button className="btn" onClick={props.clearError}>X</button>
    </div>
}