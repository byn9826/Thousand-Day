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
				<About userId={this.props.userId} pet={this.props.pet} owner={this.props.owner} watcher={this.props.watcher} companion={this.props.companion} />
				<Display userId={this.props.userId} pet={this.props.pet} moment={this.props.moment} />
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
		switch(result.Result) {
			case 0:
				console.log("Pet do not exsit");
				break;
			case 1:
				console.log("Can't read pet info, try later");
				break;
			default:
				ReactDOM.render(<Pet pet={result[0]} owner={result[1]} watcher={result[2]} companion={result[3]} moment={result[4]} userId={result[5]} />, document.getElementById("root"));
				break;
		}
	},
	error: function (err) {
		console.log("Can't connect to the server");
	}
});