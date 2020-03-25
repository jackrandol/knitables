import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function Knit() {
    const dispatch = useDispatch();

    let projects = useSelector(state => state && state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, [projects]);
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
