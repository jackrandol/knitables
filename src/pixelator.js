import React, { useEffect } from "react";
import pixelatorMachine from "./pixelatorMachine";
import { useDispatch, useSelector } from "react-redux";

export default function Pixelator() {
    let currentProject = useSelector(state => state && state.currentProject);
    // let image = '/default.png';

    useEffect(() => {
        console.log("info from state", currentProject);
        if (currentProject) {
        let image = currentProject[0].body_image;
        // pixelatorMachine(image);
        }

    }, [currentProject]);

    return (
        <div>
            <div className="pixelator">
                {currentProject &&
                    currentProject.map(project => (
                        <div className="pixelimage" key={project.id}>
                            <h1>{project.id}</h1>
                            <img id="image1" src={project.body_image} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
