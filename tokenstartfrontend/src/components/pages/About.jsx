import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import Konstantin from '../../imgs/Founder_Konstantin.png';
import Lukas from '../../imgs/Founder_Lukas.jpg';

export default function About() {
    return <div className="col-8 margin0a">
        <h2>About us</h2>
         <div class="tal"> 
         <p className="text-left">
            TokenStart gives you the liquidity you deserve! <br/>
            Invest easily in the crowdfunding projects of your choice.<br/>
            Grow your token portfolio and stay up to date with experienced TokenStart traders.<br/><br/>

            TokenStart is founded by two German students. We realized that the existing crowdfunding platforms provide no opportunity trade your investment after a succesful funding.
            This creates liquidity problems, the longer a creator needs to accomplish his or her goal. The tokens issued for each project solve these issues as they represent vouchers for the creators products.<br></br>
            The blockchain gives investors the opportunity to withdraw their tokens from the platform and trade them globally.
        </p>
        </div>

        <h2> Stay connected with us and join us on our journey!</h2>


        <div className="row d-flex justify-content-around">
        <div class="card">
        <div class="card-img-top"  style={{backgroundImage: "url(" + Konstantin + ")"}}  alt="Founder Konstantin"></div>
            <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><h5>Konstantin Klein</h5></li>
                <li class="list-group-item"> <p>Student at Technical University Darmstadt</p></li>
                <li class="list-group-item"><a href="https://www.linkedin.com/in/konstantin-klein-b87547178/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            </ul>
            </div>
            

            </div>




{/* 
            <div className="card">
                <img class="card" src={Konstantin} alt="Founder Konstantin" />
                <div className="card-body">

                    <li class="list-group-item founderCard">
                        <div>
                        <h5>Konstantin Klein</h5>
                        <p>Student at Technical University Darmstadt</p>
                        <a href="https://www.linkedin.com/in/konstantin-klein-b87547178/"><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>                    
                    </li>
                    </div>
            </div>
            
            <div className="card">
                <img class="card" src={Lukas} alt="Founder Konstantin" />
                <div className="card-body">
                    <li class="list-group-item founderCard">
                        <div>
                        <h5>Lukas Sonnabend</h5>
                        <p>Student at Darmstadt University of Applied Sciences</p>
                        <a href="https://www.linkedin.com/in/lukas-sonnabend-8b1323105/"><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>                    
                    </li>
                </div>
            </div>

             */}
            
            <div class="card">
        <div class="card-img-top"  style={{backgroundImage: "url(" + Lukas + ")"}}  alt="Founder Konstantin"></div>
            <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"> <h5>Lukas Sonnabend</h5></li>
                <li class="list-group-item"> <p>Student at Darmstadt University of Applied Sciences</p></li>
                <li class="list-group-item"><a href="https://www.linkedin.com/in/lukas-sonnabend-8b1323105/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            </ul>
            </div>

        </div>
        






    </div>
    </div>
}
