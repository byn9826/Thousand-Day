import React, {Component} from "react"
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import Profile from "./userProfile";
import Hub from "./userHub";
class User extends Component {
	constructor(props) {
        super(props);
		this.state = {
			//store visitor id
            visitorId: this.props.visitorId,
			//stor visitor id and relation with current page user id
			relation: this.props.relation
		};
	}
	//update visitor id after user login successfully
	loginSuccess(id) {
		let pageId = parseInt(window.location.pathname.split("/").pop());
		let visitorId = parseInt(id);
		//if login user is the same with current user page
		if (pageId == visitorId) {
			this.setState({visitorId: visitorId, relation: "2"});
		} else {
			//get new relationship after user login
			reqwest({
				url: "/account/refreshRelation",
				method: "POST",
				data: {"visitorId": visitorId, "pageId": pageId},
				success: function(result) {
					switch (result) {
						case "0":
							console.log("Can't connect to db");
						//update user id and user relation
						default:
							this.setState({visitorId: visitorId, relation: result});
					}
				}.bind(this),
				error: function (err) {
					console.log("Can't connect to the server");
				}
			});
		}
	}
	//logout user, clear user name
	logOut() {
		this.setState({visitorId: null, relation: "3"})
	}
	//update new become friend content after add friend action
	sendRequest(result) {
		this.setState({relation: result});
	}
	render() {
		return (
			<div id="react-root">
				<Header visitorId={this.props.visitorId} visitorName={this.props.visitorName} loginSuccess={this.loginSuccess.bind(this)} logOut={this.logOut.bind(this)} unread={this.props.unread} />
                <Profile user={this.props.user} relative={this.props.relative} relation={this.state.relation} sendRequest={this.sendRequest.bind(this)} />
				<Hub user={this.props.user} pet={this.props.pet} moment={this.props.moment} visitorId={this.state.visitorId} petsList={this.props.petsList} />
				<Footer />
			</div>
		);
	}
}
reqwest({
	url: "/user/view",
	method: "POST",
	//send current page id to backend
	data: {"id": window.location.pathname.split("/").pop()},
	success: function(result) {
		switch (result) {
			case "0":
				console.log("Can't connect to db");
				break;
			case "1":
				console.log("User not exist");
				break;
			default:
				ReactDOM.render(<User user={result[0]} relative={result[1]} relation={result[2]} pet={result[3]} moment={result[4]} visitorId={result[5]} visitorName={result[6]} petsList={result[7]} unread={result[8]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Can't connect to server");
	}
});