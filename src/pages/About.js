import React, { Component } from 'react';
import "./About.css";
import picture from "../assets/profile_pic.jpeg"; 
  
export default class About extends Component {
  render() {
    return (
      <div>
         <div>
    <div class="split left">
      <div className="centered">
        <img 
          className="profile_image"
          src = {picture}
          alt="Profile Pic"
          ></img>
      </div>
    </div>
    <div className="split right">
      <div className="centered">
        <div className="name_title">Calia Kugler</div>
        <div className="brief_description"> Hi! I am an incoming softmore double majoring in math and computer science, with a spanish minor.
        </div>
        <div className="brief_description_pt_2"> As a fun fact, during my free time I love ballroom dancing! I am even on my schools ballroom dacning team!
        </div>
      </div>
    </div>
  </div>
      </div>
    )
  }
}