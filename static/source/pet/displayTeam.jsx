import React, {Component} from "react";
import noGetAbility from "../../js/noGetAbility.js";
class Team extends Component {
    render() {
        let teamStyle = {
            display: "block",
            width: "100%",
            marginTop: "30px"
        };
        let teamTitleStyle = {
            display: "block",
            width: "96%",
            padding: "10px 2%",
            borderBottom: "2px solid #f7d7b4",
            marginBottom: "20px",
            backgroundColor: "#e5e5e5"
        };
        let titleIconStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "3%"
        };
        let titleFontStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "bold"
        };
        let teamPetStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "24%",
            marginRight: "8%",
            borderRadius: "3%"
        };
        let teamHumanStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "36%"
        };
        let humanTitleStyle = {
            display: "block",
            width: "90%",
            padding: "2px 5%",
            textAlign: "left",
            borderLeft: "3px solid #ef8513",
            marginBottom: "10px"
        };
        let humanNameStyle = {
            display: "block",
            width: "94%",
            padding: "5px 3%",
            border: "1px dashed #ef8513",
            textAlign: "center",
            borderRadius: "3px",
            marginBottom: "5px",
            color: "#052456"
        };
        let humen = this.props.human.map((human, index) => 
            <h6 key={"pethuman" + index} style={humanNameStyle}>{human[0] + " + 10% " + noGetAbility(human[1])}</h6>
        );
        return (
            <section style={teamStyle}>
                <div style={teamTitleStyle}>
                    <img style={titleIconStyle} alt="skill-icon" src="/img/pet/icon/glyphicons-team.png" / >
                    <h4 style={titleFontStyle}>Team Companion</h4>
                </div>
                <img style={teamPetStyle} src = {"/img/pet/" + this.props.companion[0] + "/cover/0.jpg"}  />
                <img style={teamPetStyle} src = {"/img/pet/" + this.props.companion[1] + "/cover/0.jpg"}  />
                <div style={teamHumanStyle}>
                    <h5 style={humanTitleStyle}>Human Companion</h5>
                    {humen}
                </div>
            </section>
        );
    }
}
export default Team;