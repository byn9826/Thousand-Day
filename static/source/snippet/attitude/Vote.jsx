import React, {Component} from 'react';
class Vote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			agree: this.props.agree || 0,
			disagree: this.props.disagree || 0,
			left: this.props.left || "Agree: ",
			right: this.props.right || "Disagree: "
		};
	}
	render() {
		let spanStyle = {
			fontFamily: "Times New Roman",
			fontSize: "12px",
			color: "white",
			textAlign: "center"
		};
		let agreeStyle = {
			display: "inline-block",
			borderRadius: "5px",
			backgroundColor: "#348964",
			padding: "5px 3%"
			
		};
		let disagreeStyle = {
			display: "inline-block",
			borderRadius: "5px",
			backgroundColor: "#5e5c5b",
			padding: "5px 3%",
			marginLeft: "1%"
		};
		return(
			<span style = {spanStyle}>
				<div style = {agreeStyle}>
					{this.state.left}{this.state.agree}
				</div>
				<div style = {disagreeStyle}>
					{this.state.right}{this.state.disagree}
				</div>
			</span>
		);
	}
};
export default Vote;