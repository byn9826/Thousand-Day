import React, {Component} from "react";
import Random from "../snippet/display/Random";
import Googlelogin from '../snippet/social/Googlelogin';
import Facebooklogin from '../snippet/social/Facebooklogin';
class Header extends Component {
	constructor(props) {
        super(props);
		this.state = {
            loginName: "login",
			showDrop: false
		};
	}
	googleLogin(user) {
        console.log(user);
    }
	fLogin(response) {
        console.log(response);
	}
	showDrop() {
		this.setState({showDrop: !this.state.showDrop});
	}
	render () {
    	let headerStyle = {
			position: "fixed",
			width: "100%",
			height: "50px",
			lineHeight: "50px",
			borderBottom: "1px solid white",
			backgroundColor: "#ef8513",
			color: "white",
			zIndex: "999",
			verticalAlign: "middle"
    	};
    	let headerLogoStyle = {
			float: "left",
			marginLeft: "10%",
			height: "40px",
			marginTop: "5px"
		};
		let headerSloganStyle = {
			float: "left",
			marginLeft: "5%",
			fontStyle: "italic"
		};
		let headerLoginStyle = {
			float: "right",
			marginRight: "10%",
			cursor: "pointer"
		};
		let loginTitleStyle = {
			display: "inline-block",
			verticalAlign: "middle"
		};
		let loginIconStyle = {
			display: "inline-block",
			verticalAlign: "middle",
			height: "6px",
			marginLeft: "10px"
		};
		let loginDropStyle = {
			position: "fixed",
			top: "50px",
			width: "224px",
			textAlign: "center",
			padding: "10px 0",
			right: "10%",
			backgroundColor: "white",
			border: "1px solid #f7d7b4",
			boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
			marginTop: "3px",
			borderRadius: "5px"
		};
		let randomContent = [
			"The site is still under development",
			//"Your pets and you",
			//"Meet with love",
			//"Share your cutes"
		];
		let drop;
		if (this.state.showDrop) {
			drop = (
				<div style={loginDropStyle}>
					<Googlelogin gLogin={this.googleLogin.bind(this)} clientId="168098850234-fsq84pk4cae97mlj0k464joc21cgqjvv.apps.googleusercontent.com" width="200px" />
					<Facebooklogin clientId="447688265576125" fLogin={this.fLogin.bind(this)} width="194px" />
				</div>
			)
		}
		return (
			<header style={headerStyle}>
				<img src="/img/logo.png" alt="logo" style={headerLogoStyle} />
				<Random content={randomContent} font="h5" style={headerSloganStyle} />
				<div style={headerLoginStyle} onClick={this.showDrop.bind(this)}>
					<h5 style={loginTitleStyle}>{this.state.loginName}</h5>
					<img style={loginIconStyle} src="/img/icon/glyphicons-dropdown.png" />
				</div>
				{/*{drop}*/}
			</header>
		);
	}
}
export default Header;