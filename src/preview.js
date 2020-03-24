import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getImages } from './actions';
import sweaterScene from './sweaterScene';

export default function Preview() {
    const dispatch = useDispatch();

    let images = useSelector(state => state && state.images);

    useEffect(() => {
        dispatch(getImages());

    }, []);
    return (
        <div>
            <h1>Preview Time!</h1>
            <div className="scene"></div>
            {images && sweaterScene(images.body_image, images.sleeve_right_image, images.sleeve_left_image, images.imageurl) }
        </div>
    );
}
