import React, {Component} from 'react';
class Footer extends Component {
	render () {
		let footer = {
			display: "block",
			width: "100%",
			backgroundColor: "black",
			clear: "both",
			padding: "5px 0"
		};
		let footerInfo = {
			display: "inline-block",
			marginLeft: "10%",
			color: "white"
		};
		return(
			<footer style={footer}>
				<h6 style={footerInfo}>© 2017 thousanday.com byn9826@gmail.com</h6>
			</footer>
		);
	}
}
export default Footer;