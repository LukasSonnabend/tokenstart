import React from 'react';

export default function ProgressBar(props) {

    const circulating = (props.tokenData.toOwner * 8900) / props.tokenData.tokenSupply
    
    return <div className="d-none d-sm-block">
        <div className="progress-bar-wrapper mb-2" style={{ background: "grey", display: "grid", padding: 0, gridTemplateColumns: circulating.toString(10) + "% auto" }}>
            <div className="progress-bar" style={{ width: "100%" }}></div>
    </div>
    </div>

}