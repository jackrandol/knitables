// src/actions.js
import axios from "./axioscopy";

export async function getImages() {
    const { data } = await axios.get(`/images`);
    console.log("data from wall posts", data);

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

export async function getWallPosts(otherUserId) {
    const { data } = await axios.get(`/wallPosts/${otherUserId}`);
    console.log("data from wall posts", data);

    return {
        type: "WALL_POSTS",
        posts: data
    };
}

export async function newWallPost(otherUserId, post) {
    console.log("info from action***, ", otherUserId, post);
    const { data } = await axios.post(`/wallPost/${otherUserId}/${post}`);
    console.log("data from action:", data);
    return {
        type: "NEW_WALL_POST",
        newPost: data
    };
}
