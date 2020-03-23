// src/profilepic.test.js

import React from 'react';
import ProfilePic from './profilepic';
import { render, fireEvent } from '@testing-library/react';



test('renders default image when there is no url prop', () => {
    const { container } = render(<ProfilePic />);
    //the container is basically the DOM
    expect(container.querySelector('img').src).toContain('/default.png')
    // document.querySelector('img'); ---this would be how to write it in week 2 lol

});

test('renders image with specified url prop', () => {
    const { container } = render( <ProfilePic url='/some-url.gif' /> );
    expect(container.querySelector('img').src).toContain('/some-url.gif');
});

test('renders image with first and last props in alt', ()=> {
    const { container } = render(<ProfilePic first='jack' last='randol' />);
    expect(container.querySelector('img').alt).toContain('jack randol');
});

test('onClick prop get called when img is clicked', () => {
    //gonna right a mock function to add to the prop given to profilePic
    const handleClick = jest.fn();
    // render(<ProfilePic onClick={ onClick } /> );
    const { container } = render (<ProfilePic handleClick= { handleClick } /> );
    const img = container.querySelector('img');
    fireEvent.click(img);
    expect(
        handleClick.mock.calls.length

    ).toBe(1);

});
