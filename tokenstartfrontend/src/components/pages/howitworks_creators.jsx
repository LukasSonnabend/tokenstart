import React from 'react';
import { Link } from 'react-router-dom';

export default function howitworks_creators() {
    return <div>
        <h2>How it works! -Creators</h2>
        <div class="tal">
            <p>
            1. Create your account: <Link to="register">Register for free</Link> <br></br>
            2. Go to <Link to="project/new">Create Project</Link><br></br>
            3. Fill in your project name.<br></br>
            4. Choose the blockchain platform for the token.<br></br>
            5. Upload a project image<br></br>
            6. ... <br></br>
            Note: The projects will be published after manual inspection. <br></br>
            
           </p> 
         </div>  
         <h2>Your benefit as a creator:</h2>
        <div class="tal">
        Creators will only be charged if the project is successfully financed.
        By receiving a token after a succesuful funding, you:
            <p>-keep your liquidity after a succesful funding,<br></br> 
            -can benefit from token price appreciation,<br></br>  
            -can trade your tokens if you are not interested in the project anymore <br></br>
            -have a voucher to receive a limited product in the future <br></br>
            -and much more...</p>
        
        <p>Moreover </p>

        <p>Since many people are new to the blockchain world we offer first class support in all steps along the funding process.</p>
         
            <ol>
                <li>
                    Platform: Provide an easy to use platform to connect creators and donators in the best way
                    possible.
            </li>
            <br/>
                <li>
                    Tokenization: Creators give token to donators based on predetermined ratios. These Tokens can
                    represent claims for products or might not have any value.
            </li>
            <br/>
                <li>
                    Different blockchain protocols: We offer token creation on multiple different blockchain protocols
                    like Ethereum, Polkadot, Tron.
            </li>
            <br/>
                <li>
                    Payment methods: Donators can choose to pay using FIAT or cryptocurrency.
            </li>
            <br/>
                <li>
                    Costs: Creators will only be charged if the project is successfully financed.
            </li>
            </ol>
        </div>
    </div>
}
