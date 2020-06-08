import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProject } from "./actions";
import sweaterScene from "./Scenes/sweaterScene";
import Wall from "./wall";

export default function Project() {
    let cutAfter = "project/";
    let url = window.location.href;
    let projectId = url.split(cutAfter).pop();
    const dispatch = useDispatch();

    let currentProject = useSelector((state) => state && state.currentProject);

    useEffect(() => {
        dispatch(getCurrentProject(projectId));
    }, []);

    return (
        <div>
            <div className="scene"></div>
            {currentProject &&
                currentProject.map((project) => (
                    <div key={project.id}>
                        <p className="componentTitle">
                            {project.first}s Project
                        </p>
                        {sweaterScene(
                            project.body_image,
                            project.sleeve_right_image,
                            project.sleeve_left_image,
                            project.imageurl,
                            project.rib
                        )}
                    </div>
                ))}

            <Wall />
        </div>
    );
}
