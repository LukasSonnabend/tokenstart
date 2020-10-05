import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import Konstantin from '../../imgs/Founder_Konstantin.png';
import Lukas from '../../imgs/Founder_Lukas.jpg';

export default function About() {
    return <div className="col-11 col-md-9 col-xl-6 margin0a">
        <h2>About us</h2>
        <p>
            TokenStart is founded by two German students with the vision of opening the world of tokenization
            to crowdfunding. We utilize the benefits of tokens to create more flexibility and transparency for
            donators and creators.
        </p>
        <div className="row col-11 col-md-12 margin0a centerCards">

            <div className="card">
                <img class="card-img-top founderImg" src={Konstantin} alt="Founder Konstantin" />
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
                <img class="card-img-top founderImg" src={Lukas} alt="Founder Konstantin" />
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
