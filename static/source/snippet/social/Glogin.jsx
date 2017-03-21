import React, {Component} from "react";
import google from "./Glogin.png";
import "./gplatform.js";
class Glogin extends Component {
    constructor(props) {
        super(props);
		this.state = {
            width: this.props.width || "100%"
		};
	}
    componentDidMount() {
        let header = document.getElementsByTagName("head")[0];
        let meta = document.createElement("meta");
        meta.name = "google-signin-client_id";
        meta.content = this.props.clientId;
        header.appendChild(meta);
    }
    clickButton() {
        window.gapi.signin2.render("my-signin2", {
            "scope": "profile email",
            "onsuccess": (googleUser) => {
                let profile = {};
                profile.id = googleUser.getBasicProfile().getId();
                profile.name = googleUser.getBasicProfile().getName();
                profile.fname = googleUser.getBasicProfile().getGivenName();
                profile.lname = googleUser.getBasicProfile().getFamilyName();
                profile.image = googleUser.getBasicProfile().getImageUrl();
                profile.email = googleUser.getBasicProfile().getEmail();
                profile.token = googleUser.getAuthResponse().id_token;
                this.props.googleLogin(profile);
            },
            "onfailure": () => {
                this.props.googleLogin("fail");
            }
        });
    }
    render() {
        let buttonStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            width: this.state.width,
            cursor: "pointer"
        };
		return (
            <img src={google} className="my-signin2" id="my-signin2" style={buttonStyle} onClick={this.clickButton.bind(this)} />
		);
	}
}
export default Glogin;