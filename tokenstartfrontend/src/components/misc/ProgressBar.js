import React from 'react';

export default function ProgressBar(props) {

    const circulating = (props.tokenData.toOwner * 100) / props.tokenData.tokenSupply
    
    return <div className="d-none d-sm-block">
        <div className="mt-2 mb-2 col-10 margin0a" style={{ background: "grey", display: "grid", padding: 0, gridTemplateColumns: circulating.toString(10) + "% auto" }}>
            <div className="progress-bar" style={{ width: "100%" }}>Circulating Supply</div>
        Held by Owner
    </div>
    </div>

}