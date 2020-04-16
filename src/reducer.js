// src/reducer.js

export default function (state = {}, action) {
    if (action.type == "GET_CURRENT_PROJECT") {
        state = {
            ...state,
            currentProject: action.currentproject,
        };
    }

    if (action.type == "GET_PROJECTS") {
        state = {
            ...state,
            projects: action.projects,
        };
    }

    if (action.type == "ERROR") {
        state = {
            ...state,
            error: action.error,
        };
    }

    if (action.type == "GET_SWEATER") {
        state = {
            ...state,
            sweater: action.sweater,
        };
    }

    if (action.type == "UPLOAD_BODY_IMAGE") {
        delete state.error;
        state = {
            ...state,
            bodyImage: action.bodyImage[0].body_image,
        };
    }

    if (action.type == "UPLOAD_RIGHT_SLEEVE") {
        delete state.error;
        state = {
            ...state,
            rightSleeveImage: action.rightSleeveImage[0].sleeve_right_image,
        };
    }

    if (action.type == "UPLOAD_LEFT_SLEEVE") {
        delete state.error;
        state = {
            ...state,
            leftSleeveImage: action.leftSleeveImage[0].sleeve_left_image,
        };
    }

    if (action.type == "SAVE_RIB_COLOR") {
        delete state.error;
        state = {
            ...state,
            ribColor: action.ribColor[0].rib,
        };
    }

    if (action.type == "WALL_POSTS") {
        state = {
            ...state,
            posts: action.posts,
        };
    }

    if (action.type == "NEW_WALL_POST") {
        state = {
            ...state,
            posts: [action.newPost, ...state.posts],
        };
    }
    return state;
}
