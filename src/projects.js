import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "./actions";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function Projects() {
    const dispatch = useDispatch();

    let projects = useSelector(state => state && state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, []);
    //will want to pass the array or variable thing to the array at the end there to
    //cause it to run everytime there's an update

    const handleClick = () => {
        console.log('clicked link finally');
    };

    return (
        <div>
            <p className="componentTitle">Projects</p>
            <div className="scene"></div>
            {projects &&
                projects.map(project => (
                    <div className="projectCard" key={project.id}>
                        <Link to={`/project/${project.id}`}
                            onClick={ handleClick }
                        >
                            <img
                                className="projectPic"
                                src={project.imageurl || "default.png"}
                                alt={`${project.first} ${project.last}`}
                            />
                            <p>
                                {" "}
                                from {project.first} {project.last}{" "}
                            </p>
                            <p className="messageMoment">
                                joined
                                <Moment fromNow>{project.created_at}</Moment>
                            </p>
                        </Link>
                    </div>
                ))}
        </div>
    );
}
