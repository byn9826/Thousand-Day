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
				<About userId={userId} pet={this.props.pet} owner={this.props.owner} watcher={this.props.watcher} companion={this.props.companion} />
				<Display pet={this.props.pet} moment={this.props.moment} />
				<Footer />
			</div>
		);
	}
}
reqwest({
	url: "/pet/view",
	method: "POST",
	data: {"id": window.location.pathname.split("/").pop()},
	success: function(result) {
		let data = result;
		ReactDOM.render(<Pet pet={data[0]} owner={data[1]} watcher={data[2]} companion={data[3]} moment={data[4]} />, document.getElementById("root"));
	}
});