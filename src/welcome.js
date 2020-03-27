// src/Welcome.js
import React from "react";
import Registration from "./Registration";
// import axios from './axioscopy';
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import Reset from "./reset";

//WELCOME COMPONENT//
export default function Welcome() {
    return (
        //hashrouter can only have one child element, can have many grandchildren
        //once you call the component in the router you can remove the div for the component from html
        //using exact takes care that it has to be exaclty the / and nothing else
        <div>
            <HashRouter>
                <div className='registration'>
                    <h1 className='welcomeTitle'>KNITABLES</h1>
                    <Route exact component={Registration} path="/" />
                    <Route component={Login} path="/login" />
                    <Route component={Reset} path="/reset" />
                </div>
            </HashRouter>
        </div>
    );
}
