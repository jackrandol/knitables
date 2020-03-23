import React from 'react';

export default function({ url, first, last, handleClick }) {
    return (
        <img
            className='profilePic'
            onClick={ handleClick }
            src={url || 'default.png'}
            alt={`${first} ${last}`}
        />
    );
}


//profile pic will become grandchild of app, so we need to pass them from app to profile and
//then further down to profile pic
