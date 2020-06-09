import axios from "../axioscopy";

export async function getProjects() {
    const { data } = await axios.get(`/api/projects`);

    return {
        type: "GET_PROJECTS",
        projects: data,
    };
}

export async function getCurrentProject(projectId) {
    const { data } = await axios.get(`/getCurrentProject/${projectId}`);

    return {
        type: "GET_CURRENT_PROJECT",
        currentproject: data,
    };
}

export async function getSweater() {
    const { data } = await axios.get(`/sweater`);

    return {
        type: "GET_SWEATER",
        sweater: data,
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
        return {
            type: "ERROR",
            error:
                "Oops, something went wrong with your upload.  Was your image less than 2.0 MB?",
        };
    }
}

export async function uploadRightSleeveImage(image) {
    try {
        var formData = new FormData();
        formData.append("file", image);
        const { data } = await axios.post("/uploadRightSleeve", formData);
        return {
            type: "UPLOAD_RIGHT_SLEEVE",
            rightSleeveImage: data,
        };
    } catch (error) {
        return {
            type: "ERROR",
            error:
                "Oops, something went wrong with your upload.  Was your image less than 2.0 MB?",
        };
    }
}

export async function saveRibColor(color) {
    try {
        const { data } = await axios.post(`/saveRibColor/${color}`);
        return {
            type: "SAVE_RIB_COLOR",
            ribColor: data,
        };
    } catch (error) {
        return {
            type: "ERROR",
            error: "something went wrong with save rib color",
        };
    }
}

export async function getWallPosts(projectId) {
    const { data } = await axios.get(`/wallPosts/${projectId}`);
    return {
        type: "WALL_POSTS",
        posts: data,
    };
}

export async function newWallPost(projectId, post) {
    const { data } = await axios.post(`/wallPost/${projectId}/${post}`);
    return {
        type: "NEW_WALL_POST",
        newPost: data,
    };
}
