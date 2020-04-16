// src/Welcome.js
import React from "react";
import Registration from "./Registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import Reset from "./reset";

export default function Welcome() {
    return (
        <div>
            <HashRouter>
                <div className="registration">
                    <h1 className="welcomeTitle">KNITABLES</h1>
                    <Route exact component={Registration} path="/" />
                    <Route component={Login} path="/login" />
                    <Route component={Reset} path="/reset" />
                </div>
            </HashRouter>
        </div>
    );
}
