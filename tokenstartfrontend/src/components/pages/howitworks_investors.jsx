import React from 'react';
import { Link } from 'react-router-dom';

export default function howitworks_investors() {
    return <div>
        <h2>How it works! -Investors</h2>
        <div class="tal">
            <p>
            1. Create your account: <Link to="/register">Register for free</Link> <br></br>
            2. Browse through the <Link to="/projects-overview">projects</Link> and pick the one you want to invest in. <br></br>
            3. Select the amount of token you want to buy.<br></br>
            4. Pick your payment method and follow the instructions <br></br>
            5. After the distribution you can start trading and building your portfolio. <br></br>
            6. Follow your favorite investors and stay up to date! <br></br>
            Note: The tokens will be distributed as soon as the funding campaign ends. <br></br>
            Once the creator finishes the project, TokenStart lets you redeem your tokens for the product on the predefined ratio.
           </p> 
         </div>  
         <h2>Your benefit as an investor:</h2>
        <div class="tal">
        By receiving a token after a succesuful funding, you:
            <p>-keep your liquidity after a succesful funding,<br></br> 
            -can benefit from token price appreciation,<br></br>  
            -can trade your tokens if you are not interested in the project anymore <br></br>
            -have a voucher to receive a limited product in the future <br></br>
            -and much more...</p>
        
        <p>Moreover we offer: <br></br>
        -first class support in all steps along the funding process<br></br>
        -an easy to use platform to connect creators and donators in the best way possible <br></br>
        -token creation on multiple different blockchain protocols like Ethereum, Polkadot, Tron <br></br>
        -multiple payment methods: donators can choose to pay using FIAT or cryptocurrency
        </p>
        </div>
    </div>
}
