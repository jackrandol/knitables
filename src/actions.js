// src/actions.js
import axios from "./axioscopy";


export async function getProjects() {
    const { data } = await axios.get(`/api/projects`);

    return {
        type: "GET_PROJECTS",
        projects: data
    };
}

export async function getCurrentProject(projectId) {
    const { data } = await axios.get(`/getCurrentProject/${projectId}`);
    console.log('current project id:', projectId);

    return{
        type: "GET_CURRENT_PROJECT",
        currentproject: data
    };

}

export async function getImages() {
    const { data } = await axios.get(`/images`);

    return {
        type: "GET_IMAGES",
        images: data
    };
}

export async function uploadBodyImage(bodyImage) {
    var formData = new FormData();

    formData.append("file", bodyImage);

    try {
        const { data } = await axios.post("/uploadBodyImage", formData);

        return {
            type: "UPLOAD_BODY_IMAGE",
            bodyImage: data,
        };
    } catch (error) {
        console.log("error form the catch upload image body", error);
        return {
            type: "ERROR",
            error: "something went wrong with your upload"
        };
    }
}

export async function uploadRightSleeveImage(image) {
    var formData = new FormData();

    formData.append("file", image);

    const { data } = await axios.post("/uploadRightSleeve", formData);

    return {
        type: "UPLOAD_RIGHT_SLEEVE",
        rightSleeveImage: data
    };
}

export async function uploadLeftSleeveImage(image) {
    var formData = new FormData();

    formData.append("file", image);

    const { data } = await axios.post("/uploadLeftSleeve", formData);

    return {
        type: "UPLOAD_LEFT_SLEEVE",
        leftSleeveImage: data
    };
}

export async function getWallPosts(projectId) {
    const { data } = await axios.get(`/wallPosts/${projectId}`);
    console.log("data from wall posts", data);

    return {
        type: "WALL_POSTS",
        posts: data
    };
}

export async function newWallPost(projectId, post) {
    console.log("info from action***, ", projectId);
    const { data } = await axios.post(`/wallPost/${projectId}/${post}`);
    console.log("data from action:", data);
    return {
        type: "NEW_WALL_POST",
        newPost: data
    };
}
