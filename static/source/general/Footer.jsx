import React, {Component} from 'react';
class Footer extends Component {
	render () {
		let footerStyle = {
			display: "block",
			width: "80%",
			backgroundColor: "black",
			padding: "5px 10%",
			marginTop: "70px",
			clear: "both"
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
				<h6 style={footerInfoStyle}><a href="https://github.com/byn9826/thousanday/issues" target="__blank">Report</a></h6>
				<h6 style={footerInfoStyle}><a href="https://github.com/byn9826/Thousanday-React" target="__blank">Thousanday-React</a></h6>
				<h6 style={footerInfoStyle}><a href="http://glyphicons.com" target="__blank">Glyphicons</a></h6>
			</footer>
		);
	}
}
export default Footer;