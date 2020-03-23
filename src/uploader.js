import React from "react";
import axios from "./axioscopy";



export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleFile(e) {
        console.log('image selected for upload!');
        let fileName = document.querySelector(".chooseFile");
        fileName.innerText =
                    e.target.files[0].name.slice(0, 15) + " . . .";

        this.setState(
            {
                file: e.target.files[0]
            },
            () => console.log("this.state handleChange on uploader: ", this.state),
        );

    }

    handleUpload(e) {
        e.preventDefault();
        console.log('upload button clicked');
        // console.log('this.state in handleUpload:', this.state);

        var formData = new FormData();

        formData.append("file", this.state.file);

        // var me = this;
        axios.post("/uploadImage", formData).then(response => {
            console.log('response.data[0].imageurl:', response.data[0].imageurl);
            // me.setState({ imageurl: response.data[0].imageurl });
            this.props.finishedUploading(response.data[0].imageurl);
        }).catch((error) => {
            console.log('error from upload', error);
            this.setState({ errorMessage: "Something went wrong, please try again."});
        });
        console.log("this.state in upload thing*******", this.state);
    }

    render() {
        return (
            <div className="uploader">
                <h1>Do you want to change your profile picture?</h1>
                <p className='errorMessage'>
                    { this.state.errorMessage }
                </p>
                <input  id='inputFile' onChange={ this.handleFile } type="file" name='file' accept='image/*' />
                <label htmlFor='inputFile' className='chooseFile'>Choose a file</label>

                <button className='submitButton' onClick={ this.handleUpload } >upload</button>
                <p className='closeUploaderButton' onClick={ this.props.closeUploader }>x</p>
            </div>
            // <button value={ this.state.imageurl } onClick={ this.props.finishedUploading }> confirm </button>
        );
    }
}
