import React, {Component} from "react";
import Waterfall from "../snippet/display/Waterfall";
import Like from "../snippet/attitude/Like";
class Moment extends Component {
    constructor(props) {
        super(props);
		this.state = {
            moment: this.props.moment
		};
	}
    clickNumber(index) {
        console.log(index);
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
        let i;
        let allImages = this.state.moment;
        for (i = 0; i < this.state.moment.length; i++) {
            allImages[i][0] = "/img/pet/" + this.props.id + "/moment/" + allImages[i][0] + ".jpg";
        }
        return (
            <section style={momentStyle}>
                <div style={momentTitleStyle}>
                    <img style={titleIconStyle} alt="moment-icon" src="/img/pet/icon/glyphicons-moment.png" / >
                    <h4 style={titleMomentStyle}>Moments</h4>
                </div>
                 <Waterfall column="3" image={allImages} clickNumber={this.clickNumber.bind(this)} />
            </section>
        );
    }
}
export default Moment;