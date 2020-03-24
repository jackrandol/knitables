// src/reducer.js


export default function(state = {}, action) {

    if (action.type == "GET_IMAGES"){
        state = {
            ...state,
            images: action.images[0]
        };
    }

    if (action.type == "UPLOAD_BODY_IMAGE"){

        state = {
            ...state,
            bodyImage: action.bodyImage[0].body_image
        };

    }

    if (action.type == "UPLOAD_RIGHT_SLEEVE"){

        state = {
            ...state,
            rightSleeveImage: action.rightSleeveImage[0].sleeve_right_image
        };

    }

    if (action.type == "UPLOAD_LEFT_SLEEVE"){

        state = {
            ...state,
            leftSleeveImage: action.leftSleeveImage[0].sleeve_left_image
        };

    }

    if (action.type == "RECEIVE_FRIENDS") {
        state = Object.assign({}, state, {
            friendships: action.friends
        });
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friendships: state.friendships.map(friend => {
                if (friend.id == action.acceptedFriendId) {
                    return {
                        ...friend,
                        accepted: true
                    };
                } else {
                    return friend;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        console.log("deleted friend id from reducer!:", action.deletedFriendId);

        state = {
            ...state,
            friendships: state.friendships.filter(
                friend => friend.id != action.deletedFriendId
            )
        };
    }

    if (action.type == "CHAT_MESSAGES") {
        console.log('message from reducer:', action.messages);
        state = {
            ...state,
            messages: action.messages
        };
    }

    if (action.type == "NEW_MESSAGE") {
        console.log('newest message from reducer:', action.newMessage);

        state = {
            ...state,
            messages: [...state.messages, action.newMessage]

        };
    }

    if (action.type == "NEW_USER_JOINED") {
        console.log('new user joines from reducer:', action.onlineUsers);

        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type == "WALL_POSTS") {
        console.log('wallposts from reducer:', action.posts);

        state = {
            ...state,
            posts: action.posts
        };
    }

    if (action.type == "NEW_WALL_POST" ) {
        console.log('new wall post from reducer:', action.newPost);

        state = {
            ...state,
            posts: [action.newPost, ...state.posts]
        };
    }
    return state;
}

//need three conditionals here

//can use filter method to remove friendship from the cloned friendswannabe array

//data flow
//first we dispatch the data,
//this goes to the action creater function
//when dispatch is triggered it returns an action object, (an object with at least one key value pair)
//the action function passes the action object to the reducer
//based on the type of the action it will change the global state created by redux
//the reducer will make a copy of the old state, modify it and replace the state

///EVERYTHING done in the reducer needs to be done immutably---this is called functional programming
//we can't use methods like push, pop etc
//we can use methods like map, filter, concat, slice etc

// useSelector connects redux to the component, it take a function as an argument and the redux state and returns
//it looks like useSelector(state => {return state.first})

//actions.js will have all of our action creaters things like
// functions with axios requests that return promises
//we talk to the server via our action functions
