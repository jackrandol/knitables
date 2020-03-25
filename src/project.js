import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProject } from './actions';


export default function Project() {

    let cutAfter = 'project/';
    let url = window.location.href;
    let projectId = url.split(cutAfter).pop();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProject(projectId));
    },[]);

    return (
        <div>
            <p className='componentTitle'>Other Project Page</p>

        </div>
    );
}
