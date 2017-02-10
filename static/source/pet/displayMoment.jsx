import React, {Component} from "react";
import Like from "../snippet/attitude/Like";
class Moment extends Component {
    constructor(props) {
        super(props);
		this.state = {
            moment: this.props.moment
		};
	}
    render() {
        let momentStyle = {
            display: "block",
            padding: "0px 2%",
            width: "96%",
            marginTop: "40px"
        };
        let momentTitleStyle = {
            display: "block",
            width: "100%",
            borderBottom: "1px solid #f7d7b4",
            paddingBottom: "10px",
            marginBottom: "15px"
        };
        let titleIconStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "5%"
        };
        let titleMomentStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "bold"
        };
        let momentLineStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "48%",
            padding: "0 1%",
            margin: "5px 0"
        };
        let lineContainerStyle = {
            display: "block",
            width: "100%",
            marginBottom: "15px"
        };
        let containerImgStyle = {
            display: "block",
            width: "100%",
            borderRadius: "5px"
        };
        let containerContentStyle = {
            display: "block",
            width: "96%",
            padding: "0 2%",
            marginTop: "5px",
            marginBottom: "2px",
            fontWeight: "bold"
        };
        let containerInfoStyle = {
            display: "block",
            width: "96%",
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingBottom: "5px",
            marginTop: "3px",
            borderRadius: "3px",
            borderRight: "1px dashed #052456",
            borderBottom: "1px dashed #052456"
        };
        let infoDateStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "6%"
        };
        let momentLeft = [];
        let momentRight = [];
        for (var i = 0; i < this.state.moment.length; i = i + 2) {
            momentLeft.push(
                <div key={"momentLeft" + i} style={lineContainerStyle}>
                    <img style={containerImgStyle} alt={this.state.moment[i][2]} src={"/img/pet/" + this.props.id + "/moment/" + this.state.moment[i][1] + ".jpg"} />
                    <h5 style={containerContentStyle}>
                        {this.state.moment[i][2]}
                    </h5>
                    <div style={containerInfoStyle}>
                        <Like name={"like" + i} agree={this.state.moment[i][3]} />
                        <h6 style={infoDateStyle}>{this.state.moment[i][0]}</h6>
                    </div>
                </div>
            );
        }
        for (var j = 1; j < this.state.moment.length; j = j + 2) {
            momentRight.push(
                <div key={"momentRight" + j} style={lineContainerStyle}>
                    <img style={containerImgStyle} alt={this.state.moment[j][2]} src={"/img/pet/" + this.props.id + "/moment/" + this.state.moment[j][1] + ".jpg"} />
                    <h5 style={containerContentStyle}>
                        {this.state.moment[j][2]}
                    </h5>
                    <div style={containerInfoStyle}>
                        <Like name={"like" + j} agree={this.state.moment[j][3]} />
                        <h6 style={infoDateStyle}>{this.state.moment[j][0]}</h6>
                    </div>
                </div>
            );
        }
        return (
            <section style={momentStyle}>
                <div style={momentTitleStyle}>
                    <img style={titleIconStyle} alt="moment-icon" src="/img/pet/icon/glyphicons-moment.png" / >
                    <h4 style={titleMomentStyle}>Moments</h4>
                </div>
                <div style={momentLineStyle}>
                    {momentLeft}
                </div>
                <div style={momentLineStyle}>
                    {momentRight}
                </div>
            </section>
        );
    }
}
export default Moment;