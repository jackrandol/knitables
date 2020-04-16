import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import sweaterSceneBlank from "./sweaterSceneBlank";
import ImageUploader from "./imageuploader";

export default function Knit() {
    useEffect(() => {
        sweaterSceneBlank();
    }, []);
    return (
        <div>
            <div className="previewTitle">
                <p className="componentTitle">Knitting Time</p>
            </div>
            <div className="scene"></div>

            <div className="imageuploader">
                <ImageUploader />
            </div>
        </div>
    );
}
