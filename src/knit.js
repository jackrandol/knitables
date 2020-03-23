import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import sweaterScene from "./sweaterScene";

export default function Chat() {
    // let chatMessages = useSelector(state => state && state.messages);
    //
    // let onlineUsers = useSelector(state => state && state.onlineUsers);


    useEffect(() => {
        sweaterScene();
    }, []);
    //will want to pass the array or variable thing to the array at the end there to
    //cause it to run everytime there's an update



    return (
        <div>
            <p>Knitting time</p>
            <div className="scene"></div>

            <script src="https://threejs.org/build/three.js"></script>
            <script src="sweaterScene.js"></script>
        </div>
    );
}
