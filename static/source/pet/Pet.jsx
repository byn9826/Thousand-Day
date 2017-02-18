import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import About from "./petAbout";
import Display from "./petDisplay";
let userId = 0;
class Pet extends Component {
	render() {
		let containerStyle = {
			display: "block",
			width: "100%"
		};
		return (
			<div style={containerStyle}>
				<Header />
				<About userId={userId} data={this.props.data} />
				<Display data={this.props.data} />
				<Footer />
			</div>
		);
	}
}
//get defaultdata
reqwest({
	url: "/pet/view",
	method: "POST",
	data: {"id": window.location.pathname.split("/").pop()},
	success: function(result) {
		let data = JSON.parse(result);
		ReactDOM.render(<Pet data={data} />, document.getElementById("root"));
	}
});