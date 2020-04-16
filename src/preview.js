import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSweater } from "./actions";
import sweaterScene from "./sweaterScene";

export default function Preview() {
    const dispatch = useDispatch();

    let sweater = useSelector((state) => state && state.sweater);

    useEffect(() => {
        dispatch(getSweater());
    }, []);
    return (
        <div>
            <div className="previewTitle">
                <h1 className="componentTitle">Project Preview</h1>
            </div>
            <div className="scene"></div>
            {sweater &&
                sweaterScene(
                    sweater.body_image,
                    sweater.sleeve_right_image,
                    sweater.sleeve_left_image,
                    sweater.imageurl,
                    sweater.rib
                )}
        </div>
    );
}
