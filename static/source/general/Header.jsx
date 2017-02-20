import React, {Component} from "react";
import Random from "../snippet/display/Random";
class Header extends Component {
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
		let randomContent = [
			"The site is still under development"
		];
		return (
			<header style={headerStyle}>
				<img src="/img/logo.png" alt="logo" style={headerLogoStyle} />
				<Random content={randomContent} font="h3" style={headerSloganStyle} />
				<nav style={headerNavStyle}>
					<h4><a href="/" style={navLinkStyle}>Home</a></h4>
				</nav>
			</header>
		);
	}
}
export default Header;