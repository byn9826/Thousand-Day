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
        let profileAuraStyle = {
            display: "block",
            width: "90%",
            margin: "0px 5%",
            textAlign: "center",
            marginTop: "10px",
            paddingTop: "10px",
            borderTop: "1px solid #e5e5e5",
            color: "#052456",
            fontweight: "bold"
        };
        return(
            <main style={profileStyle}>
                <img style={profileImgStyle} alt={this.props.data.name} src={"/img/user/" + this.props.data.id + ".jpg"} />
                <h1 style={profileNameStyle}>{this.props.data.name}</h1>
                <h5 style={profileNameStyle}>Reg in Hub: {this.props.data.reg}</h5>
                <h5 style={profileAuraStyle}>Aura: All pet +10% {noGetAbility(this.props.data.aura)}</h5>
            </main>
        );
    }
}
export default Profile;