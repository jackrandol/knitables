import React, { useEffect } from "react";
import sweaterSceneBlank from "../Scenes/sweaterSceneBlank";
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
