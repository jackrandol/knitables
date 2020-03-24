import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBodyImage, uploadRightSleeveImage, uploadLeftSleeveImage } from './actions';
import { Link } from 'react-router-dom';

export default function ImageUploader() {

    const [buttonText, setButtonText] = useState('Add Body Image');
    const [uploaderText, setUploaderText] = useState('What would you like to upload for the sweater Body?');

    let bodyImage = useSelector(state => state && state.bodyImage);
    let rightSleeve = useSelector(state => state && state.rightSleeveImage);
    let leftSleeve = useSelector(state => state && state.leftSleeveImage);
    let errorMessage = useSelector(state => state && state.error);

    const dispatch = useDispatch();

    let image;

    const handleFile = e => {
        console.log('e.target', e.target.files[0]);
        let fileName = document.querySelector(".chooseFile");
        fileName.innerText =
                    e.target.files[0].name.slice(0, 15) + " . . .";

        image = e.target.files[0];
    };

    let fileName = document.querySelector(".chooseFile");

    useEffect(()=>{
        console.log('bodyImage from useEffect', bodyImage);
        if (bodyImage) {
            fileName.innerText = 'choose file...';
            setUploaderText('Add an image for the right sleeve.');
            setButtonText('Add Right Sleeve Image');
            errorMessage = null;
        }

        if (rightSleeve) {
            fileName.innerText = 'choose file...';
            setUploaderText('Add an image for the left sleeve.');
            setButtonText('Add Left Sleeve Image');
        }

        if (leftSleeve) {
            fileName.innerText = 'choose file...';
            setUploaderText('Now you can preview your sweater!');
            setButtonText('Go To Preview!');
        }


    },[bodyImage, rightSleeve, leftSleeve]);

    const handleClick = (e) => {
        e.preventDefault();

        if (buttonText == 'Add Body Image') {
            dispatch(uploadBodyImage(image));
        }

        if (buttonText == 'Add Right Sleeve Image') {
            dispatch(uploadRightSleeveImage(image));
        }

        if (buttonText == 'Add Left Sleeve Image') {
            dispatch(uploadLeftSleeveImage(image));

        }

        if (buttonText == 'Go To Preview!') {
            console.log('go to preview clicked');
        }


    };

    return (
        <div>
            <div className="imageUploaderBox">
                <h1>Image Uploader</h1>
                <h1>{ uploaderText }</h1>
                <p>{errorMessage && errorMessage}</p>
                <input  onChange={handleFile} id='inputFile' type="file" name='file' accept='image/*' />
                <label htmlFor='inputFile' className='chooseFile'>Choose a file</label>

                <button onClick={ handleClick } className='submitButton'>{ buttonText }</button>
                {leftSleeve && <Link className='navButton' to="/preview">see preview!</Link>}
            </div>
        </div>

    );
}
