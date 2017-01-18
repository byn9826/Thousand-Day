import React, {Component} from 'react';
import Random from '../snippet/display/Random';
class Header extends Component {
	render () {
    	let header = {
			display: "block",
			width: "100%",
			backgroundColor: "#1d4077",
			color: "white",
			borderBottom: "1px solid #656c77",
			height: "50px",
			lineHeight: "50px",
			verticalAlign: "middle",
			"marginBottom": "50px"
    	};
    	let headerLogo = {
			float: "left",
			marginLeft: "10%",
			marginTop: "5px",
			height:"40px"
		};
		let headerSlogan = {
			float: "left",
			marginLeft: "50px",
			fontStyle: "italic"
		};
		let headerNav = {
			float: "right",
			marginRight: "15%",
			lineHeight:"50px",
			verticalAlign:"middle",
			textDecoration:"none",
			color:"white"
		};
		let randomContent = [
			"For those who never give up learning",
			"Your efforts deserve a show off",
			"Find expertise by precise gauge"
		];
		return(
			<header style={header}>
				<img src="/img/thousanday-logo2.png" alt="thousanday-logo" style={headerLogo} />
				<Random content={randomContent} font="h3" style={headerSlogan} />
				<a style={headerNav} href="/"><h2>Home</h2></a>
			</header>
		)
	}
};
export default Header;
