import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    uploadBodyImage,
    uploadRightSleeveImage,
    uploadLeftSleeveImage,
    saveRibColor,
} from "../Redux/actions";
import { Link } from "react-router-dom";
import { SliderPicker } from "react-color";
import loadingMesh from "../Scenes/loadingMesh";

export default function ImageUploader() {
    const [buttonText, setButtonText] = useState("Add Body Image");
    const [uploaderText, setUploaderText] = useState(
        "What would you like to upload for the sweater Body?"
    );
    const [isloading, toggleLoading] = useState(false);
    const [errorMessage, toggleError] = useState(false);

    let bodyImage = useSelector((state) => state && state.bodyImage);
    let rightSleeve = useSelector((state) => state && state.rightSleeveImage);
    let leftSleeve = useSelector((state) => state && state.leftSleeveImage);
    let ribColor = useSelector((state) => state && state.ribColor);
    let errorMessageFromReducer = useSelector((state) => state && state.error);

    const dispatch = useDispatch();

    let image;
    let color;

    const handleFile = (e) => {
        let fileName = document.querySelector(".chooseFile");
        fileName.innerText = e.target.files[0].name.slice(0, 15) + " . . .";

        image = e.target.files[0];
        toggleError(false);
        toggleLoading(false);
        e.target.value = "";
    };

    let fileName = document.querySelector(".chooseFile");

    useEffect(() => {
        toggleLoading(false);
        if (bodyImage) {
            fileName.innerText = "Click here to select a file...";
            setUploaderText("Add an image for the right sleeve.");
            setButtonText("Add Right Sleeve Image");
            toggleError(false);
        }

        if (rightSleeve) {
            toggleLoading(false);
            toggleError(false);
            fileName.innerText = "Click here to select a file...";
            setUploaderText("Add an image for the left sleeve.");
            setButtonText("Add Left Sleeve Image");
        }

        if (leftSleeve) {
            toggleLoading(false);
            toggleError(false);
            fileName.innerText = "";
            setUploaderText("Choose a color for ribbing");
            setButtonText("set color");
        }

        if (ribColor) {
            toggleLoading(false);
            toggleError(false);
            fileName.innerText = "";
            setUploaderText("Now you can preview your sweater!");
            setButtonText("Done!");
        }

        // if (errorMessageFromReducer) {
        //     toggleLoading(false);
        //     toggleError(true);
        // }
    }, [bodyImage, rightSleeve, leftSleeve, ribColor]);

    useEffect(() => {
        if (errorMessageFromReducer) {
            toggleLoading(false);
            toggleError(true);
        }
    }, [errorMessageFromReducer]);

    useEffect(() => {
        if (isloading) {
            loadingMesh();
        }
    }, [isloading]);

    const handleClick = (e) => {
        e.preventDefault();
        toggleError(false);
        if (buttonText == "Add Body Image") {
            dispatch(uploadBodyImage(image));
            toggleLoading(true);
        }

        if (buttonText == "Add Right Sleeve Image") {
            dispatch(uploadRightSleeveImage(image));
            toggleLoading(true);
        }

        if (buttonText == "Add Left Sleeve Image") {
            dispatch(uploadLeftSleeveImage(image));
            toggleLoading(true);
        }

        if (buttonText == "set color") {
            dispatch(saveRibColor(color));
            toggleLoading(true);
        }
    };

    const handleColor = (e) => {
        let rgbColor = `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b})`;
        color = rgbColor;
        console.log(color);
    };

    return (
        <div>
            <div className="imageUploaderBackground">
                <div className="imageUploaderBox">
                    <h1>Image Uploader</h1>
                    <p>
                        Images must be less than 2.0 MB in size and .jpg or .png
                        format
                    </p>
                    <h1>{uploaderText}</h1>
                    {errorMessage && (
                        <p className="errorUpload">
                            Oops, there was an error with your upload. Was your
                            image too large?
                        </p>
                    )}
                    <input
                        onChange={handleFile}
                        id="inputFile"
                        type="file"
                        name="file"
                        accept="image/*"
                    />
                    <label htmlFor="inputFile" className="chooseFile">
                        Click here to select a file...
                    </label>
                    {isloading && (
                        <div className="loadingMesh">
                            <h1 className="loading">Loading...</h1>
                        </div>
                    )}

                    {leftSleeve && !ribColor && (
                        <SliderPicker onChange={handleColor} />
                    )}

                    {!ribColor && (
                        <button onClick={handleClick} className="submitButton">
                            {buttonText}
                        </button>
                    )}

                    {ribColor && (
                        <Link className="navButton" to="/preview">
                            see preview!
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
