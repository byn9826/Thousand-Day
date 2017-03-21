import React, {Component} from "react";
import Random from "../snippet/display/Random";
import Glogin from "../snippet/social/Glogin";
class Header extends Component {
	googleLogin(user) {
		console.log(user.email);
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
			zIndex: "999"
    	};
    	let headerLogoStyle = {
			display: "inline-block",
			marginLeft: "10%",
			height: "40px",
			verticalAlign: "middle"
		};
		let headerSloganStyle = {
			display: "inline-block",
			marginLeft: "5%",
			fontStyle: "italic",
			verticalAlign: "middle"
		};
		let headerNavStyle = {
			float: "right",
			marginRight: "10%",
			verticalAlign: "middle",
			width: "30%"
		};
		let navLinkStyle = {
			float: "left",
			textAlign: "center",
			width: "25%",
			padding: "0"
		};
		let headerUserStyle = {
			float: "right",
			marginRight: "10%",
			verticalAlign: "middle",
			width: "10%"
		};
		let randomContent = [
			"The site is still under development"
		];
		return (
			<header style={headerStyle}>
				<img src="/img/logo.png" alt="logo" style={headerLogoStyle} />
				<Random content={randomContent} font="h5" style={headerSloganStyle} />
				<div style={headerUserStyle}>
					{/*
					<Glogin googleLogin={this.googleLogin.bind(this)} clientId="168098850234-fsq84pk4cae97mlj0k464joc21cgqjvv.apps.googleusercontent.com" />
					*/}
				</div>
				<nav style={headerNavStyle}>
					<h4><a href="/" style={navLinkStyle}>Home</a></h4>
				</nav>
			</header>
		);
	}
}
export default Header;