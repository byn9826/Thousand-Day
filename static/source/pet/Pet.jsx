import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import About from "./petAbout";
import Display from "./petDisplay";
class Pet extends Component {
	render() {
		let containerStyle = {
			display: "block",
			width: "100%"
		};
		return (
			<div style={containerStyle}>
				<Header />
				<About data={this.props.data} />
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
		let Data = JSON.parse(result);
		ReactDOM.render(<Pet data={Data} />, document.getElementById("root"));
	}
});