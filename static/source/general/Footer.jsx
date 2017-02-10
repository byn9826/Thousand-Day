import React, {Component} from 'react';
class Footer extends Component {
	render () {
		let footerStyle = {
			display: "block",
			width: "80%",
			backgroundColor: "black",
			padding: "5px 10%",
			marginTop: "20px"
		};
		let footerInfoStyle = {
			display: "inline-block",
			verticalAlign: "middle",
			marginRight: "3%",
			color: "white"
		};
		return(
			<footer style={footerStyle}>
				<h6 style={footerInfoStyle}>© 2017 Thousanday</h6>
				<h6 style={footerInfoStyle}><a href="http://thousanday.com/react" target="__blank">Thousanday-React</a></h6>
				<h6 style={footerInfoStyle}><a href="http://glyphicons.com" target="__blank">Glyphicons</a></h6>
			</footer>
		);
	}
}
export default Footer;