// src/actions.js
import axios from "./axioscopy";

//need at least 3 functions here

export default async function receiveFriends() {
    const { data } = await axios.get("/friendsWannabes");

    console.log("response.date from /friendsWAnnabes axios", data);

    return {
        type: "RECEIVE_FRIENDS",
        friends: data
    };

}

export async function acceptFriendRequest(otherUserId) {
    const { data } = await axios.post(`/accept-friend-request/${otherUserId}`);

    console.log('data from accept FriendRequest:', data);

    return {
        type: "ACCEPT_FRIEND_REQUEST",
        acceptedFriendId: data
    };
}

export async function unfriend(otherUserId) {
    const { data } = await axios.post(`/cancel-friendship/${otherUserId}`);
    console.log('data from unfriend', data);

    console.log('data from unfriend/cancel friendship:', data);

    return {
        type: "UNFRIEND",
        deletedFriendId: data
    };
}

export async function chatMessages(messages) {
    return {
        type: "CHAT_MESSAGES",
        messages: messages
    };
}

export async function newMessage(newMsg) {

    return {
        type: "NEW_MESSAGE",
        newMessage: newMsg
    };
}

export async function newUserJoined(onlineUsers) {
    return {
        type: "NEW_USER_JOINED",
        onlineUsers: onlineUsers
    };
}

export async function getWallPosts(otherUserId) {

    const { data } = await axios.get(`/wallPosts/${otherUserId}`);
    console.log('data from wall posts', data);

    return {
        type: "WALL_POSTS",
        posts: data
    };

}

export async function newWallPost(otherUserId, post) {
    console.log('info from action***, ', otherUserId, post);
    const { data } = await axios.post(`/wallPost/${otherUserId}/${post}`);
    console.log('data from action:', data);
    return {
        type: "NEW_WALL_POST",
        newPost: data
    };

}

///actions for chat will just pass the message on to the reducer

//can use async / await here as well
// export async function fn() {
//     const {data} = await axios.get().then(() => {
//
//     })
// }
