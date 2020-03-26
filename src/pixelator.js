import React, { useEffect } from 'react';
import pixelatorMachine from './pixelatorMachine';

export default function Pixelator() {

    let image = '/default.png';

    useEffect(() => {
        pixelatorMachine(image);
    },[]);

    return (
        <div>
            <div className="pixelator">
                <p>pixel image maker!</p>
                <img id='image1' src='/default.png'/>
            </div>
        </div>
    );
}
