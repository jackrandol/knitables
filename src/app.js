import React from "react";
import axios from "./axioscopy";
import Uploader from "./uploader";
import Profile from "./profile";
import Knit from "./knit";
import Preview from "./preview";
import Projects from "./projects";
import Project from "./project";
import { BrowserRouter, Route, Link } from "react-router-dom";
import logoMesh from "./Scenes/logo";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.finishedUploading = this.finishedUploading.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setBio = this.setBio.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data);
            console.log("data from mounting", data);
        });

        setTimeout(() => {
            logoMesh();
        }, 300);
    }

    finishedUploading(url) {
        this.setState({ image: url });
        this.setState({ uploaderVisible: false });
    }

    setBio(bioText) {
        console.log("bio set!!");
        this.setState({ bio: bioText });
    }

    closeUploader() {
        this.setState({ uploaderVisible: false });
    }

    handleClick() {
        this.setState({ uploaderVisible: true });
    }

    logOut() {
        axios.get("/logOut").then(() => {
            console.log("user logged out");
        });
        location.replace("/welcome");
    }

    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <div className="background">
                <BrowserRouter>
                    <div className="leftNav">
                        <div className="logoMesh"></div>
                        <div className="hello">Hello {this.state.first}!</div>
                        <Link className="navButton" to={`/`}>
                            My Profile
                        </Link>
                        <Link className="navButton" to={"/knit"}>
                            Knit
                        </Link>
                        <Link className="navButton" to={"/preview"}>
                            Preview
                        </Link>
                        <Link className="navButton" to={"/projects"}>
                            Projects
                        </Link>
                        <button className="navButton" onClick={this.logOut}>
                            log out
                        </button>
                        <h1 className="navTitle">Knitables</h1>{" "}
                        <h1 className="navTitle">↓</h1>
                    </div>

                    <div className="appBoard">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    url={this.state.image}
                                    bio={this.state.bio}
                                    handleClick={this.handleClick}
                                    setBio={this.setBio}
                                    id={this.id}
                                />
                            )}
                        />
                        {this.state.uploaderVisible && (
                            <Uploader
                                finishedUploading={this.finishedUploading}
                                closeUploader={this.closeUploader}
                            />
                        )}

                        <Route exact path="/knit" render={() => <Knit />} />
                        <Route
                            exact
                            path="/preview"
                            render={() => <Preview />}
                        />
                        <Route
                            exact
                            path="/projects"
                            render={() => <Projects />}
                        />
                        <Route
                            path="/project/:id"
                            render={(props) => (
                                <Project
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
