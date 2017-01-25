import React, {Component} from 'react';
import Random from '../snippet/display/Random';
class Header extends Component {
	render () {
    	let header = {
			display: "block",
			width: "100%",
			backgroundColor: "#ef8513",
			color: "white",
			height: "50px",
			lineHeight: "50px",
			verticalAlign: "middle",
    	};
    	let headerLogo = {
			float: "left",
			marginLeft: "10%",
			marginTop: "5px",
			height:"40px"
		};
		let headerSlogan = {
			float: "left",
			marginLeft: "5%",
			fontStyle: "italic"
		};
		let randomContent = [
			"Digital hub for your pets",
			"Better together everyday"
		];
		let headerNav = {
			float: "right",
			marginRight: "15%",
			textDecoration:"none",
			color:"white"
		};
		return(
			<header id="header" style={header}>
				<img src="/img/logo.png" alt="logo" style={headerLogo} />
				<Random content={randomContent} font="h3" style={headerSlogan} />
				<a style={headerNav} href="/"><h2>Home</h2></a>
			</header>
		);
	}
}
export default Header;