import React, {Component} from "react";
import Waterfall from "../snippet/display/Waterfall";
class Moment extends Component {
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
        let momentLoadStyle = {
            display: "block",
            width: "100%",
            backgroundColor: "#f7d7b4",
            color: "#052456",
            border: "1px solid #f7f9fc",
            textAlign: "center",
            padding: "6px 0",
            borderRadius: "5px",
            cursor: "pointer"
        };
        //Get all images infos
        let allImages = [];
        for (let i = 0; i < this.props.moment.length; i++) {
            allImages[i] = [];
            //get all image src
            allImages[i][0] = "/img/pet/" + this.props.petId + "/moment/" + this.props.moment[i][1];
            //get all image message
            allImages[i][1] = this.props.moment[i][2];
            //get all a href address
            allImages[i][2] = "/moment/" + this.props.moment[i][0];
        }
        return (
            <section style={momentStyle}>
                <div style={momentTitleStyle}>
                    <img style={titleIconStyle} alt="moment-icon" src="/img/icon/glyphicons-moment.png" / >
                    <h4 style={titleMomentStyle}>Moments</h4>
                </div>
                <Waterfall column="4" image={allImages} link="true" fontFamily="'Rubik', sans-serif" />
                <h5 style={momentLoadStyle} onClick={this.props.loadMore.bind(null)}>{this.props.showMessage}</h5>
            </section>
        );
    }
}
export default Moment;