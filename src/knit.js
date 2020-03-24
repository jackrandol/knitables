import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import sweaterScene from "./sweaterScene";
import ImageUploader from "./imageuploader";
import { getScene } from './actions';


export default function Knit() {
    const dispatch = useDispatch();

    let bodyImage = useSelector(state => state && state.bodyImage);

    useEffect(() => {
        if (!bodyImage) {
            bodyImage = './hairlessRabbit.jpg';
        }
        sweaterScene(bodyImage);
    }, []);
    //will want to pass the array or variable thing to the array at the end there to
    //cause it to run everytime there's an update



    return (
        <div>
            <p>Knitting time</p>
            <div className="scene"></div>

            <div className="imageuploader">
                <ImageUploader />
            </div>

        </div>
    );
}
