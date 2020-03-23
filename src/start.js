import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
//REDUX
import reducer from './reducer';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let component;

if (location.pathname === "/welcome") {
    //render the registration page
    component = <Welcome />;
} else {

    component = (
        <Provider store={store} >
            <App />;
        </Provider>
    );
}

//you probably will change this...to a different file
//maximum of 1 connection per app instance
// const socket = io.connect();
//
// socket.on('hello', data => {
//     console.log(data);
//     socket.emit(
//         'funkyChicken',
//         ['allspice', 'cute', 'bunnies']
//     );
// });
//
// socket.on('newConnection', data => {
//     console.log(data);
// });

ReactDOM.render(
    // location.pathname == "/welcome" ? <Welcome /> : <App />,
    component,
    document.querySelector("main")
);

//when you call useState you get back an array, first item is value and second is a function
//first item is the initial value you want to have for your state property....
//second is a function you can call to change it
//function components are rerun when the function is called....huh
//the value of greetee is initially set to 'World' because thats what we give to useState
//

////////////HOOKS/////////////////

// function Hello() {
//     const [greetee, setGreetee] = useState('World');
//     const [adjective, setAdjective] = useState('nice');

// useEffect(()=>{
//     conosle.log(`Just rendered ${greetee}`)
// }, [adjective]);

// the [adjective] part here tells useEffect only to run when the adjective is
//changed and not to run every time there is a new render
//rule of them is that what's in the array is whatever you use inside the effect

//once the string is not empty in the use useEffect to figure out when to do ajax request

//     return (
//         <>
//         <h1> Hello, {greetee}!</h1>
//         <p>It is {adjective} to see you.</p>
//         <input onChange= { ({target}) => setGreetee(target.value)} defaultValue={greetee} />
//         <input onChange= { ({target}) => setAdjective(target.value)} defaultValue={adjective} />
//
//         </>
//     );
// }
//
// can also give useState an object
//
// const [adjective, setAdjective] = useState({
//                                     val: 'nice' });
//
// but then you have to reset the whole val instead of mutating it
//
// <input onChange= { ({target}) => setAdjective({ val: target.value })} defaultValue={adjective} />
//

////WHEN YOU GET BACK THE ARRAY OF FOUND USERS FFROM SERVER///////

// function FindPeople() {
//     const [users, setUsers] = useState([]);
//
//     return (
//         <div>
//             {users && users.map(user => (
//                 <div key={user.id} >
//                     <Link to={`/user/${user.id}`}>{user.first} {user.last}</Link>
//                 </div>
//             )
//             )}
//         </div>
//     );
// }


// two routes on server, one for most recently registered users and one for the relevant search results


//ReactDOM.render is called only ONCE in your application
//HelloWorld here is the name of our COMPONENT
//every component MUST start with a capital letter

// function HelloWorld() {
//     // JSX
//     return (
//         //only ONE element can be here, but that ONE element can have as many
//         //children as you want!!!
//         <div>
//             <p>Hello, World!</p>
//         </div>
//     );
// }

///class syntax!
// class elements do not HOIST!!!  so the render code has to go after all classes if
//they are written in start.js

// class components CAN have state
//function components CANNOT have state

// class HelloWorld extends React.Component {
//     constructor() {
//         //super creates THIS for us in our HelloWorld component
//         super();
//         this.state = {
//             // name: 'jack'
//         };
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     ///componentDidMount only works in class components!!!!
//     componentDidMount() {
//         //lifecycle method
//         //this is a good place to do axios requests to fetch info from server!
//         // axios.get('/user').then(({data})) => {
//         //     //some code going server side
//         // });
//         //Ex. faking a server request
//         setTimeout(() => {
//             //pretend this code only runs once we've received a response from server
//             //response included data we want to store somewhere
//             //and the logical place to store this data is state!
//             //this.state.name = response.data.etc CANT DO THIS!!!!!
//             let name = 'allspice';
//             this.setState({
//                 name
//             }); //DO THIS!!! :-)
//         }, 2000);
//     } ///  componentDidMount closes
//
//     //handleclick has it's own this so we have to bind it to the components THIS
//     handleClick() {
//         this.setState({
//             name: 'alistair',
//             location: 'Berlin'
//         });
//     }
//
//     render() {
//         return (
//             //sometimes written like this to make sure there is a name prop in the state
//             //we can't add class no to the tag elements we use className
//
//             //if you don't want to bind the handleclick to the this in the constructor you
//             //can use function syntax within the onClick in the element tag like this Ex.
//             // <p onClick={() => this.handleclick}>Im a class component</p>
//             //
//             <div>
//                 <p className='headline'>Hello, World</p>
//                 <p onClick={this.handleClick}>Im a class component</p>
//
//                 <p>{this.state.name}</p>
//                 <p>{this.state && this.state.name}</p>
//                 <p>Location: {this.state && this.state.location}</p>
//                 <User name={this.state.name} />
//             </div>
//             //name in the user tag is whatever we want, it's a new prop where we store a value
//         );
//     }
// }
//
// //functions are dumb components
// //the props arg can be whatever we want
// // function User(props) {
// //     return <h1>{props.name}</h1>;
// // }
//
// //written as a class would look like this
// class User extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state={};
//     }
//     render() {
//         return <h1>{this.props.name}</h1>;
//     }
// }

//STATE is an object in js

//EX. of a STATE
// {
//     name: 'jack',
//     email: 'jack@gmail.com',
//     profilePic: 'jack.png.com/',
//     friends: [
//
//     ]
// }
