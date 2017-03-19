import React, {Component} from "react";
import reqwest from "reqwest";
import Postimg from "../snippet/input/Postimg";
class Publish extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //use to trigger reset Postimg
            reset: 0,
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
		reqwest({
        	url: "/pet/uploadMoment/" + message,
        	method: "POST",
         	data: fileData,
        	contentType: false,
        	processData: false,
			success: function(result) {
                switch(result.Result) {
                    case 0:
                        console.log("No image uploaded");
                        break;
                    case 1:
                        console.log("File type not supported");
                        break;
                    case 2:
                        console.log("Can't save image, try later");
                        break;
                    case 3:
                        console.log("This is not your pet");
                        break;
                    case 4:
                        console.log("Can't update moment, try later");
                    default:
                        //pass back to main component
                        this.props.uploadNew(result.Result);
                        let reset = this.state.reset + 1;
				        this.setState({reset: reset});
                }
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to server");
			}
		});
    }
    render() {
        let containerStyle = {
            display: "block",
            width: "100%",
            marginTop: "40px"
        };
        return (
            <section style={containerStyle}>
                <Postimg content="" max="120" title="Share new moment" submitImg={this.submitImg.bind(this)} fontFamily="'Rubik', sans-serif" reset={this.state.reset} />
            </section>
        );
    }
}
export default Publish;