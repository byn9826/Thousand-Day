import React, {Component} from 'react';
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
        console.log(message);
        console.log(img);
        let fileData = new FormData();
    	fileData.append("file", img, "0.png");
		reqwest({
        	url: "/pet/uploadMoment/" + message,
        	method: "POST",
         	data: fileData,
        	contentType: false,
        	processData: false,
			success: function(result) {
                let reset = this.state.reset + 1;
				this.setState({reset: reset});
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
    }
    render() {
        let containerStyle = {
            display: "block",
            padding: "0px 2%",
            width: "96%",
            marginBottom: "30px"
        };
        return (
            <section style={containerStyle}>
                <Postimg content="" max="150" title="Share new moment" submitImg={this.submitImg.bind(this)} fontFamily="'Rubik', sans-serif" reset={this.state.reset} />
            </section>
        );
    }
}
export default Publish;