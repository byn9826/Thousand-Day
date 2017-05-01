import React, {Component} from "react";
import reqwest from "reqwest";
import Postimg from "../snippet/input/Postimg";
class Publish extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //use to trigger reset Postimg
            reset: 0,
            //if pet could get a potential by upload image
            potent: parseInt(this.props.potent)
		};
	}
    submitImg(message, img) {
        //get image type
        let type = img.type;
        type = type.split("/")[1];
        type = "." + type;
        //store image file
        let fileData = new FormData();
    	fileData.append("file", img, type);
        fileData.append("potent", this.state.potent);
		reqwest({
        	url: "/pet/uploadMoment/" + message,
        	method: "POST",
         	data: fileData,
        	contentType: false,
        	processData: false,
			success: function(result) {
                switch(result) {
                    case "0":
                        console.log("Please Login");
                        this.setState({reset: this.state.reset + 1});
                        break;
                    case "1":
                        console.log("File type not supported");
                        this.setState({reset: this.state.reset + 1});
                        break;
                    case "2":
                        console.log("Something Wrong With the server");
                        this.setState({reset: this.state.reset + 1});
                        break;
                    default:
                        //upLoad success
                        //if should add 1 potential
                        if (this.state.potent === 1) {
                            this.props.upPotent();
                        }
                        this.props.uploadNew(result);
				        this.setState({reset: this.state.reset + 1, potent: 0});
                        break;     
                }
			}.bind(this),
			error: function (err) {
                this.setState({reset: this.state.reset + 1});
				console.log("Can't connect to server");
			}.bind(this)
		});
    }
    render() {
        let potent;
        if (this.state.potent === 1) {
            potent = <h5 id="publish-potent">Sharing to get 1 potential point for you pet now !</h5>
        }
        return (
            <section id="publish">
                {potent}
                <Postimg content="" max="120" title="Share new moment" submitImg={this.submitImg.bind(this)} fontFamily="'Rubik', sans-serif" reset={this.state.reset} />
            </section>
        );
    }
}
export default Publish;