import React, {Component} from "react";
import reqwest from "reqwest";
import Waterfall from "../snippet/display/Waterfall";
import Like from "../snippet/attitude/Like";
import noGetImgType from "../../js/noGetImgType.js";
class Moment extends Component {
    constructor(props) {
        super(props);
		this.state = {
            moment: this.props.moment,
            showMore: 1,
            showMessage: (this.props.moment.length < 20)? "No more moments": "Click to load more ..."
		};
	}
    //load more picture
    loadMore() {
        reqwest({
            url: "/pet/loadMoment",
            type: "json",
            method: "POST",
            contentType: "application/json", 
            headers: {"X-My-Custom-Header": "SomethingImportant"},
            data: JSON.stringify({"petId": this.props.petId, "showMore": this.state.showMore}),
            success: function(result) {
                if (result.Result === 2) {
                    //Increase load record, update message
                    let newShow = this.state.showMore + 1;
                    this.setState({showMore: newShow, showMessage: "No more moments"});
                } else if (result.Result === 1) {
                    console.log("Something Wrong");
                } else {
                    //Increase load record
                    let newShow = this.state.showMore + 1;
                    //Update moment array
                    let moment = this.state.moment.concat(result);
                    this.setState({showMore: newShow, moment: moment});
                    if (result.length < 20) {
                        this.setState({showMessage: "No more moments"});
                    }
                }
            }.bind(this),
            error: function (err) {
                console.log("Something Wrong");
            }
        });
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
        for (let i = 0; i < this.state.moment.length; i++) {
            allImages[i] = [];
            allImages[i][0] = "/img/pet/" + this.props.petId + "/moment/" + this.state.moment[i][1] + "." + noGetImgType(this.state.moment[i][5]);
            allImages[i][1] = this.state.moment[i][2];
            allImages[i][2] = "/moment/" + this.state.moment[i][0];
        }
        //Disable ajax when no more moments
        let loadMoment;
        if (this.state.showMessage == "No more moments") {
            loadMoment = (<h5 style={momentLoadStyle}>{this.state.showMessage}</h5>);
        } else {
            loadMoment = (<h5 style={momentLoadStyle} onClick={this.loadMore.bind(this)}>{this.state.showMessage}</h5>);
        }
        return (
            <section style={momentStyle}>
                <div style={momentTitleStyle}>
                    <img style={titleIconStyle} alt="moment-icon" src="/img/icon/glyphicons-moment.png" / >
                    <h4 style={titleMomentStyle}>Moments</h4>
                </div>
                <Waterfall column="4" image={allImages} link="true" fontFamily="'Rubik', sans-serif" />
                <h5 style={momentLoadStyle} onClick={this.loadMore.bind(this)}>{this.state.showMessage}</h5>
            </section>
        );
    }
}
export default Moment;