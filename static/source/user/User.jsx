import React, {Component} from "react"
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import Profile from "./userProfile";
import Hub from "./userHub";
class User extends Component {
	render() {
		let containerStyle = {
			display: "block",
			width: "100%"
		};
		return (
			<div style={containerStyle}>
				<Header />
                <Profile user={this.props.user} relative={this.props.relative} relation={this.props.relation} />
				<Hub pet={this.props.pet} moment={this.props.moment} />
				<Footer />
			</div>
		);
	}
}
reqwest({
	url: "/user/view",
	method: "POST",
	data: {"id": window.location.pathname.split("/").pop()},
	success: function(result) {
		console.log(result);
		if (result.Result === 1 || result.Result === 2) {
			console.log("Something Wrong");
		} else {
			ReactDOM.render(<User user={result[0]} relative={result[1]} relation={result[2]} pet={result[3]} moment={result[4]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Something Wrong");
	}
});