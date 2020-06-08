import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../Redux/actions";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function Projects() {
    const dispatch = useDispatch();

    let projects = useSelector((state) => state && state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    const handleClick = () => {
        console.log("clicked link finally");
    };

    return (
        <div>
            <p className="componentTitle">Projects</p>
            <div className="scene"></div>
            <div className="projectBoard">
                {projects &&
                    projects.map((project) => (
                        <div className="projectCard" key={project.id}>
                            <Link
                                to={`/project/${project.id}`}
                                onClick={handleClick}
                            >
                                <img
                                    className="projectPic"
                                    src={project.imageurl || "default.png"}
                                    alt={`${project.first} ${project.last}`}
                                />
                                <p>
                                    {project.first} {project.last}
                                </p>
                                <p className="messageMoment">
                                    joined knitables{" "}
                                    <Moment fromNow>
                                        {project.created_at}
                                    </Moment>
                                </p>
                                <p>{project.bio}</p>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}
