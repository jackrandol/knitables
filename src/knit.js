import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import sweaterSceneBlank from "./sweaterSceneBlank";
import ImageUploader from "./imageuploader";



export default function Knit() {
    // const dispatch = useDispatch();

    // let bodyImage = useSelector(state => state && state.bodyImage);

    useEffect(() => {
        // if (!bodyImage) {
        //     bodyImage = './hairlessRabbit.jpg';
        // }
        sweaterSceneBlank();
    }, []);
    //will want to pass the array or variable thing to the array at the end there to
    //cause it to run everytime there's an update



    return (
        <div>
            <div className="previewTitle">
                <p className='componentTitle'>Knitting Time</p>
            </div>
            <div className="scene"></div>

            <div className="imageuploader">
                <ImageUploader />
            </div>

        </div>
    );
}
