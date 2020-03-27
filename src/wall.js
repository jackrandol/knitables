import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWallPosts, newWallPost } from "./actions";
import Moment from "react-moment";

export default function Wall() {
    const dispatch = useDispatch();

    let currentProject = useSelector(state => state && state.currentProject);
    let wallPosts = useSelector(state => state && state.posts);

    useEffect(() => {
        if (currentProject) {
            dispatch(getWallPosts(currentProject[0].id));
        }
    }, [currentProject]);

    const keyCheck = e => {
        // console.log("etargetvalue:", e.target.value);
        let postData = {
            project_id: currentProject[0].id
        };

        if (e.key === "Enter") {
            e.preventDefault();
            postData.post = e.target.value;
            dispatch(newWallPost(postData.project_id, postData.post));
            e.target.value = "";
        }
    };

    if (!wallPosts) {
        return null;
    }

    return (
        <div>
            <div className="completeWall">
                <h1>Comments:</h1>
                <textarea
                    className="chatField"
                    placeholder="add your message here . . ."
                    onKeyDown={keyCheck}
                ></textarea>
                <div className="wall">
                    {wallPosts &&
                        wallPosts.map(post => (
                            <div className="wallPost" key={post.id}>
                                <img
                                    className="wallPic"
                                    src={post.imageurl || "default.png"}
                                    alt={`${post.first} ${post.last}`}
                                />
                                <div className="wallPostText">
                                    <div>{post.post}</div>
                                    <p>
                                        from: {post.first} {post.last}
                                    </p>
                                    <p className="messageMoment">
                                        <Moment fromNow>
                                            {post.created_at}
                                        </Moment>
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
