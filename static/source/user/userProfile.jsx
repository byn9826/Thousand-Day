import React, {Component} from "react";
import noGetAbility from "../../js/noGetAbility.js";
class Profile extends Component {
    render() {
        let profileStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "18%",
            marginLeft: "10%",
            marginTop: "50px"
        };
        let profileImgStyle = {
            display: "block",
            width: "80%",
            marginLeft: "10%",
            marginRight: "10%",
            borderRadius: "50%",
        };
        let profileNameStyle = {
            display: "block",
            width: "90%",
            margin: "10px 5%",
            textAlign: "center"
        };
        let profileWatchStyle = {
            display: "block",
            textAlign: "center",
            fontweight: "bold",
            backgroundColor: "#ef8513",
            borderRadius: "5px",
            width: "70%",
            padding: "5px 0",
            marginLeft: "15%",
            color: "white"
        };
        let profileBorderStyle = {
            display: "block",
            width: "90%",
            marginLeft: "5%",
            marginTop: "20px",
            textAlign: "center",
            borderTop: "1px solid #e5e5e5",
            paddingTop: "20px"
        };
        let profileAuraStyle = {
            display: "block",
            width: "90%",
            margin: "0px 5%",
            textAlign: "center",
            marginTop: "15px",
            color: "#052456",
            fontweight: "bold"
        };
        let borderRelativeStyle = {
            display: "block",
            width: "90%",
            margin: "10px 5%",
            borderRadius: "5px",
            padding: "5px 3%",
            border: "1px dashed #ef8513"
        };
        let relativeImgStyle = {
            display: "inline-block",
            width: "20%",
            marginRight: "5%",
            borderRadius: "50%",
            verticalAlign: "middle"
        };
        let relativeNameStyle = {
            display: "inline-block",
            verticalAlign: "middle"
        };
        let relatives = this.props.data.relative.map((relative, index) =>
            <div key={"userRelative" + index} style={borderRelativeStyle}>
                <img style={relativeImgStyle} src={"/img/user/" + relative[0] + ".jpg"} />
                <h5 style={relativeNameStyle}>{relative[1]}</h5>
            </div>
        );
        return(
            <main style={profileStyle}>
                <img style={profileImgStyle} alt={this.props.data.name} src={"/img/user/" + this.props.data.id + ".jpg"} />
                <h1 style={profileNameStyle}>{this.props.data.name}</h1>
                <h5 style={profileNameStyle}>- {this.props.data.about}</h5>
                <h5 style={profileWatchStyle}>+ Watch | by {this.props.data.watch}</h5>
                <h5 style={profileNameStyle}>Reg in Hub: {this.props.data.reg}</h5>
                <h5 style={profileAuraStyle}>Aura: All pet +10% {noGetAbility(this.props.data.aura)}</h5>
                <h5 style={profileBorderStyle}>Relative:</h5>
                {relatives}
            </main>
        );
    }
}
export default Profile;