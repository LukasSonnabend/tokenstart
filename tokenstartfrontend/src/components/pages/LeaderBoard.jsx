
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';
import {useHistory, Link} from "react-router-dom";

export default function FourOFour() {
    let investors = [
        {
            "name":"LucyTS",
            "_id":"djhd83838hnfiehi",
            "image":"https://i.ibb.co/zbmj03w/linkedin-sales-navigator-p-Mqs-NUZlz-CY-unsplash-min-1.jpg"
        },
        {
            "name":"Uncle Jeff",
            "_id":"ijd9j8j9j9fd",
            "image":"https://i.ibb.co/bHc4gZV/photo-1562788869-4ed32648eb72.jpg"
        },
        {
            "name":"Invest24/7",
            "_id":"ijd9mai9j9fd",
            "image":"https://i.ibb.co/cXw5khJ/photo-1514222709107-a180c68d72b4.jpg"
        }
    ]
    let mockTopInvestors = [
        {
            "id": 13,
            "last_name": "scastellonec",
            "picture": "https://robohash.org/vellaboriosamdolores.bmp?size=50x50&set=set1",
            "times_invested": 179,
            "investment_volume": 19543,
            "country": "DE"
        },
        {
            "id": 3,
            "last_name": "mpressdee2",
            "picture": "https://robohash.org/voluptatibusestdebitis.bmp?size=50x50&set=set1",
            "times_invested": 173,
            "investment_volume": 17461,
            "country": "FR"
        },
        {
            "id": 11,
            "last_name": "vfulhama",
            "picture": "https://robohash.org/perspiciatisetillo.png?size=50x50&set=set1",
            "times_invested": 111,
            "investment_volume": 16006,
            "country": "DE"
        },
        {
            "id": 12,
            "last_name": "dthomblesonb",
            "picture": "https://robohash.org/ipsamvoluptatemsed.jpg?size=50x50&set=set1",
            "times_invested": 136,
            "investment_volume": 15927,
            "country": "GR"
        },
        {
            "id": 15,
            "last_name": "gmacgaheye",
            "picture": "https://robohash.org/sitmagniipsum.png?size=50x50&set=set1",
            "times_invested": 118,
            "investment_volume": 13823,
            "country": "DE"
        },
        {
            "id": 7,
            "last_name": "emountford6",
            "picture": "https://robohash.org/ipsasedut.bmp?size=50x50&set=set1",
            "times_invested": 146,
            "investment_volume": 13433,
            "country": "DE"
        },
        {
            "id": 8,
            "last_name": "arowledge7",
            "picture": "https://robohash.org/oditlaborequi.png?size=50x50&set=set1",
            "times_invested": 103,
            "investment_volume": 13038,
            "country": "DE"
        },
        {
            "id": 4,
            "last_name": "orizzotto3",
            "picture": "https://robohash.org/solutafacerequis.jpg?size=50x50&set=set1",
            "times_invested": 125,
            "investment_volume": 11775,
            "country": "FR"
        },
        {
            "id": 10,
            "last_name": "dpeabody9",
            "picture": "https://robohash.org/eteosofficiis.png?size=50x50&set=set1",
            "times_invested": 168,
            "investment_volume": 10700,
            "country": "FR"
        },
        {
            "id": 5,
            "last_name": "dgiacovetti4",
            "picture": "https://robohash.org/officiisasperioresadipisci.png?size=50x50&set=set1",
            "times_invested": 124,
            "investment_volume": 9696,
            "country": "FR"
        },
        {
            "id": 9,
            "last_name": "lgudgen8",
            "picture": "https://robohash.org/eiustemporibuseaque.jpg?size=50x50&set=set1",
            "times_invested": 152,
            "investment_volume": 8447,
            "country": "GR"
        },
        {
            "id": 1,
            "last_name": "vmacelharge0",
            "picture": "https://robohash.org/voluptatibustemporemaxime.jpg?size=50x50&set=set1",
            "times_invested": 172,
            "investment_volume": 8226,
            "country": "DE"
        },
        {
            "id": 6,
            "last_name": "ccrawford5",
            "picture": "https://robohash.org/nisimaioresrerum.bmp?size=50x50&set=set1",
            "times_invested": 119,
            "investment_volume": 6983,
            "country": "GR"
        },
        {
            "id": 14,
            "last_name": "xloydd",
            "picture": "https://robohash.org/odioquismodi.jpg?size=50x50&set=set1",
            "times_invested": 101,
            "investment_volume": 6385,
            "country": "FR"
        },
        {
            "id": 2,
            "last_name": "lfisbey1",
            "picture": "https://robohash.org/autquibusdamut.jpg?size=50x50&set=set1",
            "times_invested": 167,
            "investment_volume": 5558,
            "country": "FR"
        }
    ]


    let invShowCase;

    useEffect(() => {
        // async function getProjects(){
        //     const projectRes = await Axios.get("http://localhost:1234/projects") 
        //     setProjectList({
        //         list: projectRes.data
        //     });
        // }
        // if (!projectDataList){
        // getProjects();}

    

        if (investors && !invShowCase) {
            console.log("running list")
            invShowCase = investors.map((investor, index) => {
                return <div key={index} id="investorPic" className="mx-3 my-4">
                        <a href={"/user/" + investor._id}>
                        <div id={"rank" + index} className="investorShowcaseImage" style={{backgroundImage: "url(" + investor.image + ")"}}></div>
                        </a>
            <h3>{index == 0 ? "2. " : ""} {index == 1 ? "1. " : ""} {index == 2 ? "3. " : ""}{investor.name}</h3>
                </div>
            });
        }
        console.log(invShowCase)
        //renders carousel to dom
        ReactDOM.render(invShowCase, document.getElementById('Leaderboard'));
        //document.getElementById("investorShowcase").innerHTML = invShowCase;
    }, []);

    return <div className="col-12 col-md-12 col-xl-8 margin0a">
                   {!investors ? <p>No Data {investors}</p> : (
                <>
                    <div>
                        <h2 className="mt-2">Investor Leaderboard</h2>
                        <div className="investorLeaderboardWrapper">
                        <div className="Leaderboard" id="Leaderboard">
                        </div>
                        </div>
                        <Table className="m-2" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Username</th>
                                    <th>Blockchain</th>
                                    <th>Times Invested</th>
                                    <th>Investment Volume</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                            {mockTopInvestors.map(
                        (item, i) =>
                        <>
                        <tr>
                        <td>{i+3}</td>
                        <td><img src={item.picture}></img></td>
                        <td>{item.last_name}</td>
                        <td>{item.times_invested}</td>
                        <td>{item.investment_volume}$</td>
                        <td><img class="flag-icon" src={"https://github.com/hjnilsson/country-flags/blob/master/png250px/" + item.country.toLowerCase() +".png?raw=true"} ></img></td>
     

                        </tr>
                        </>
                         )}
                            </tbody>
                        </Table>
                    </div>
                </>
            )}
    </div>

}
