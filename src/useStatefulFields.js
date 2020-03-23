// src/useStatefulFields.js
//CUSTOM HOOKS//
import React, { useState } from 'react';
import axios from './aios';
import { useStatefulFields } from './useStatefulFields';
import { useAuthSubmit } from './useAuthSubmit';

//useState is like the equivalent of setState but for hooks, we need to import this from react too



//hooks must start with use

export default function Login() {

    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit('/login', values);
    // we need to pass the values from the state on to the useAuthSubmit so
    //that we can use them in the axios.post request
    return (
        <form>
        { error && <p> something broke! </p>}
            <input onChange={ handleChange } name='email' type='text' placeholder='email'/>
            <input onChange={ handleChange } name='password' type='password' placeholder='password'/>
            <button onClick={ handleSubmit }>log in</button>
            <Link to='/reset'>Forgot Password?</Link>
        </form>
    )
}

export function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = e => {
        setValues({
            ...values,
            //...values will spread a copy of the old state and place it in the new /
            // state with the new key value pair
            [e.target.name]: e.target.value
        });
    };

    return [ values, handleChange ];
}

//setValues will replace the entire state, old values will be lost!

// import axios from './axioscopy';
// import React from 'react';
// import { Link } from 'react-router-dom';
//
// export default class Login extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             errorLogin: ''
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleLogIn = this.handleLogIn.bind(this);
//     }
//
//     handleChange(e) {
//         this.setState({
//             [e.target.name]: e.target.value
//         }, () => console.log('this.state: ', this.state)
//         );
//         // console.log(this.state); this is asynchronous and will sometimes run before
//         //setState runs so it looks wrong even though it worked
//     }
//
//     handleLogIn(e) {
//         e.preventDefault();
//         if (this.state.email && this.state.password) {
//             var me = this;
//             axios.post(`./login`, this.state).then(function(response) {
//                 console.log(response);
//                 if(response.status == 200) {
//                     location.replace('/');
//                 }
//             }).catch(function(error) {
//                 console.log("err in POST /registration:", error);
//                 me.setState({ errorLogin: 'Either your email or password was incorrect, or you are not in our database.'});
//             });
//         } else {
//             this.setState({ errorLoginInput: 'Please make sure to fill in both fields.'});
//         }//make error if statements here
//     }
//
//     render() {
//         return (
//             <div>
//                 <h1>Login</h1>
//                 <p> { this.state.errorLogin } </p>
//                 <p> { this.state.errorLoginInput } </p>
//                 <form>
//                     <input onChange={ this.handleChange } name='email' type='text' placeholder='email'/>
//                     <input onChange={ this.handleChange } name='password' type='password' placeholder='password'/>
//                     <button onClick={ this.handleLogIn }>log in</button>
//                     <Link to='/reset'>Forgot Password?</Link>
//                 </form>
//             </div>
//             //only need the Link component for routes you have in your HashRouter//
//         );
//     }
// }
