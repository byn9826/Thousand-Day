import React, {Component} from "react";
import Random from "../snippet/display/Random";
import reqwest from "reqwest";
import Googlelogin from '../snippet/social/Googlelogin';
import Facebooklogin from '../snippet/social/Facebooklogin';
class Header extends Component {
	constructor(props) {
        super(props);
		this.state = {
			//store username or login
            loginName: this.props.visitorName || "Login",
			//indicate show loginbox or not
			showDrop: false,
			//hide name or not
			hideName: this.props.hideName || false
		};
	}
	//user click google login button
	googleLogin(user) {
		//react only when user not login
		if (this.state.loginName == "Login") {
			//check google user token
			reqwest({
				url: "/account/googleLogin",
				method: "POST",
				data: {"token": user.token},
				success: function(result) {
					//console.log(result);
					switch (result) {
						case "0":
							console.log("DB error");
							break;
						case "1":
							console.log("Account not exist");
							break;
						case "2":
							console.log("Can't validate Google account");
						default:
							//get username, close dropdown box
							this.setState({loginName: result[1], showDrop: false});
							//pass user id back to parent
							this.props.loginSuccess(result[0]);
					}
				}.bind(this),
				error: function (err) {
					console.log("Can't connect to the server");
				}
			});
		}
    }
	fLogin(response) {
        //console.log(response);
	}
	logOut() {
		let auth2 = gapi.auth2.getAuthInstance();
		let self = this;
		auth2.signOut().then(function () {
			reqwest({
				url: "/account/logOut",
				method: "POST",
				success: function(result) {
					switch (result) {
						case "0":
							self.setState({loginName: "Login", showDrop: false});
							self.props.logOut();
							break;
					}
				},
				error: function (err) {
					console.log("Can't connect to the server");
				}
			});
		});
	}
	//show and close drop box
	showDrop() {
		this.setState({showDrop: !this.state.showDrop});
	}
	render () {
		let randomStyle = {
			float: "left",
			marginLeft: "5%",
			fontStyle: "italic"
		};
		//show user name area
		let user;
		//drop box button for login
		let loginStyle;
		//login box
		let login;
		//show logout box for login user after click login button
		let logout;
		if (!this.state.hideName) {
			user = (
				<div id="header-login" onClick={this.showDrop.bind(this)}>
					<h5>{this.state.loginName}</h5>
					<img src="/img/icon/glyphicons-dropdown.png" />
				</div>
			)
			//show loginbox for not login user after click login button
			if (this.state.showDrop && this.state.loginName == "Login" ) {
				loginStyle = "header-drop";
			}
			//hide login box by default
			else {
				loginStyle = "header-drop-hide";
			}
			login = (
				<div className={loginStyle}>
					<Googlelogin gLogin={this.googleLogin.bind(this)} clientId="168098850234-fsq84pk4cae97mlj0k464joc21cgqjvv.apps.googleusercontent.com" width="200px" />
					<Facebooklogin clientId="447688265576125" fLogin={this.fLogin.bind(this)} width="194px" />
				</div>
			)
			if (this.state.showDrop && this.state.loginName != "Login") {
				logout = (
					<div className="header-drop">
						<input type="button" value="Log Out" onClick={this.logOut.bind(this)} />
					</div>
				)
			}
		}
		//random content show for slogan
		let randomContent = [
			"The site is still under development",
			//"Your pets and you",
			//"Meet with love",
			//"Share your cutes"
		];
		return (
			<header id="header">
				<img id="header-logo" src="/img/logo.png" alt="logo" />
				<Random style={randomStyle} content={randomContent} font="h5" />
				{user}
				{login}
				{logout}
			</header>
		);
	}
}
export default Header;