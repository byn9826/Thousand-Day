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
                <Profile data={this.props.data} />
				<Hub pets={this.props.data.pet} />
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
		let data = JSON.parse(result);
		ReactDOM.render(<User data={data} />, document.getElementById("root"));
	}
});