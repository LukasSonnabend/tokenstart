import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import Konstantin from '../../imgs/Founder_Konstantin.png';
import Lukas from '../../imgs/Founder_Lukas.jpg';

export default function About() {
    return <div>
        <h2>About us</h2>
         <div class="tal"> 
         <p>
            TokenStart gives you the liquidity you deserve! <br></br>
            Invest easily in the crowdfunding projects of your choice. <br></br>
            Grow your token portfolio and stay up to date with experienced TokenStart traders.<br></br>
            </p>  
            <p>
            TokenStart is founded by two German students. We realized that the existing crowdfunding platforms provide no opportunity trade your investment after a succesful funding.
            This creates liquidity problems, the longer a creator needs to accomplish his or her goal. The tokens issued for each project solve these issues as they represent vouchers for the creators products.<br></br>
            The blockchain gives investors the opportunity to withdraw their tokens from the platform and trade them globally.
        </p>
        </div>

        <div> Stay connected with us and join us on our journey!</div>

        <div className="row d-flex">

            <div className="card">
                <img class="card" src={Konstantin} alt="Founder Konstantin" />
                <ul class="list-group list-group-flush">
                    <li class="list-group-item founderCard">
                        <div>
                        <h5>Konstantin Klein</h5>
                        <p>Student at Technical University Darmstadt</p>
                        <a href="https://www.linkedin.com/in/konstantin-klein-b87547178/"><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>                    
                    </li>
                </ul>
            </div>
            
            <div className="card">
                <img class="card" src={Lukas} alt="Founder Konstantin" />
                <ul class="list-group list-group-flush">
                    <li class="list-group-item founderCard">
                        <div>
                        <h5>Lukas Sonnabend</h5>
                        <p>Student at Darmstadt University of Applied Sciences</p>
                        <a href="https://www.linkedin.com/in/lukas-sonnabend-8b1323105/"><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>                    
                    </li>
                </ul>
            </div>

            
            


        </div>
        






    </div>
}
