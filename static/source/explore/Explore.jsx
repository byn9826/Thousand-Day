import React, {Component} from "react";
import ReactDOM from "react-dom";
import Header from "../general/Header";
import Footer from "../general/Footer";
class Explore extends Component {
	render() {
		let containerStyle = {
			display: "block",
			width: "100%"
		};
		return (
			<div style={containerStyle}>
				<Header />
				
				<Footer />
			</div>
		);
	}
}
//get defaultdata
ReactDOM.render(<Explore />, document.getElementById("root"));