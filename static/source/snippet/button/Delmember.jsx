import React, {Component} from 'react';
class Delmember extends Component {
    constructor(props) {
        super(props);
		this.state = {
            width: parseInt(this.props.width) || 100,
            margin: parseInt(this.props.marginLR) || 10,
            font: this.props.fontFamily || "Times New Roman"
		};
	}
    render() {
        let containerStyle = {
			display: "inline-block",
			width: this.state.width + "px",
			marginLeft: this.state.margin + "px",
			marginRight: this.state.margin + "px",
            height: this.state.width + "px",
            verticalAlign: "top"
		};
		let containerImgStyle = {
			display: "block",
			width: "100%",
			borderRadius: "8px"
		};
		let containerDelStyle = {
			position: "relative",
			float: "right",
            fontFamily: this.state.font,
            fontSize: "20px",
            top: "-" + this.state.width + "px",
            color: "black",
            verticalAlign: "middle",
            lineHeight: "14px",
            width: "16px",
            height: "16px",
            marginTop: "4px",
            marginRight: "4px",
            backgroundColor: "white",
            borderRadius: "8PX",
            textAlign: "center",
            border: "1px solid #e5e5e5"
		};
		return (
            <div style={containerStyle}>
			    <img style={containerImgStyle} src = {this.props.profile} />
				<span style={containerDelStyle}>-</span>
			</div>
		);
	}
}
export default Delmember;