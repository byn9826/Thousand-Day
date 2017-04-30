import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import About from "./petAbout";
import Display from "./petDisplay";
class Pet extends Component {
	constructor(props) {
        super(props);
		this.state = {
            visitorId: this.props.visitorId
		};
	}
	loginSuccess(id) {
		this.setState({visitorId: id});
	}
	logOut() {
		this.setState({visitorId: null});
	}
	render() {
		return (
			<div id="react-root">
				<Header visitorId={this.props.visitorId} visitorName={this.props.visitorName} loginSuccess={this.loginSuccess.bind(this)} logOut={this.logOut.bind(this)} />
				<About visitorId={this.state.visitorId} pet={this.props.pet} owner={this.props.owner} watcher={this.props.watcher} companion={this.props.companion} />
				<Display visitorId={this.state.visitorId} pet={this.props.pet} moment={this.props.moment} />
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
		switch(result) {
			case "0":
				console.log("Can't connect to db");
				break;
			case "1":
				console.log("Pet not exist");
				break;
			default:
				ReactDOM.render(<Pet pet={result[0]} owner={result[1]} watcher={result[2]} companion={result[3]} moment={result[4]} visitorId={result[5]} visitorName={result[6]} />, document.getElementById("root"));
				break;
		}
	},
	error: function (err) {
		console.log("Can't connect to the server");
	}
});