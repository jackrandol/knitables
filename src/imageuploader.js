import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBodyImage, uploadRightSleeveImage, uploadLeftSleeveImage, saveRibColor } from './actions';
import { Link } from 'react-router-dom';
import { SliderPicker } from 'react-color';

export default function ImageUploader() {

    const [buttonText, setButtonText] = useState('Add Body Image');
    const [uploaderText, setUploaderText] = useState('What would you like to upload for the sweater Body?');
    const [isloading, toggleLoading] = useState(false);
    const [errorMessage, toggleError] = useState(false);

    let bodyImage = useSelector(state => state && state.bodyImage);
    let rightSleeve = useSelector(state => state && state.rightSleeveImage);
    let leftSleeve = useSelector(state => state && state.leftSleeveImage);
    let ribColor = useSelector(state => state && state.ribColor);
    let errorMessageFromReducer = useSelector(state => state && state.error);

    const dispatch = useDispatch();

    let image;
    let color;

    const handleFile = e => {
        console.log('e.target', e.target.files[0]);
        let fileName = document.querySelector(".chooseFile");
        fileName.innerText =
                    e.target.files[0].name.slice(0, 15) + " . . .";

        image = e.target.files[0];
    };

    let fileName = document.querySelector(".chooseFile");

    useEffect(()=>{

        if (bodyImage) {
            toggleLoading(false);
            fileName.innerText = 'choose file...';
            setUploaderText('Add an image for the right sleeve.');
            setButtonText('Add Right Sleeve Image');
            toggleError(false)
        }

        if (rightSleeve) {
            toggleLoading(false);
            toggleError(false);
            fileName.innerText = 'choose file...';
            setUploaderText('Add an image for the left sleeve.');
            setButtonText('Add Left Sleeve Image');
        }

        if (leftSleeve) {
            toggleLoading(false);
            toggleError(false);
            fileName.innerText = '';
            setUploaderText('Choose a color for ribbing');
            setButtonText('set color');
        }

        if (ribColor) {
            toggleLoading(false);
            toggleError(false);
            fileName.innerText = '';
            setUploaderText('Now you can preview your sweater!');
            setButtonText('Done!');
        }

        if (errorMessageFromReducer) {
            toggleLoading(false);
            toggleError(true);
        }


    },[bodyImage, rightSleeve, leftSleeve, ribColor, errorMessageFromReducer]);

    const handleClick = (e) => {
        e.preventDefault();

        if (buttonText == 'Add Body Image') {
            dispatch(uploadBodyImage(image));
            toggleLoading(true);
        }

        if (buttonText == 'Add Right Sleeve Image') {
            dispatch(uploadRightSleeveImage(image));
            toggleLoading(true);

        }

        if (buttonText == 'Add Left Sleeve Image') {
            dispatch(uploadLeftSleeveImage(image));
            toggleLoading(true);


        }

        if (buttonText == 'set color') {
            dispatch(saveRibColor(color));
            

        }

    };

    const handleColor = (e) => {
        let rgbColor = `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b})`;
        color = rgbColor;
    };

    return (
        <div>
            <div className="imageUploaderBox">
                <h1>Image Uploader</h1>
                <h1>{ uploaderText }</h1>
                {errorMessage && <p>there was an error with your upload!</p>}
                <input  onChange={handleFile} id='inputFile' type="file" name='file' accept='image/*' />
                <label htmlFor='inputFile' className='chooseFile'>Choose a file</label>
                { isloading && <h1 className='loading'>Loading...</h1> }
                {!ribColor && <button onClick={ handleClick } className='submitButton'>{ buttonText }</button>}

                {leftSleeve && !ribColor && <SliderPicker onChange={ handleColor }/>}
                {ribColor && <Link className='navButton' to="/preview">see preview!</Link>}
            </div>
        </div>

    );
}
