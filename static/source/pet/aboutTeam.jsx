import React, {Component} from "react";
import noGetNature from "../../js/noGetNature.js";
import noGetAbility from "../../js/noGetAbility.js";
class Team extends Component {
    render() {
        let teamStyle = {
            display: "block",
            width: "100%",
            marginTop: "20px",
            marginBottom: "30px",
            borderTop: "1px solid #e5e5e5",
            paddingTop: "20px"
        };
        let teamHumanStyle = {
            display: "block",
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginBottom: "40px"
        };
        let humanTitleStyle = {
            display: "block",
            width: "100%",
            padding: "2px 0",
            textAlign: "left",
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
        let teamTitleStyle = {
            display: "block",
            width: "92%",
            padding: "5px 4%",
            marginBottom: "20px",
            backgroundColor: "#e5e5e5"
        };
        let titleIconStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            width: "15px",
            margin: "0 5%"
        };
        let titleFontStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "bold"
        };
        let teamPetStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "46%",
            margin: "0 2%"
        };
        let petImgStyle = {
            display: "block",
            width: "100%",
            borderRadius: "3%"
        };
        let petContainerStyle = {
            display: "block",
            width: "80%",
            verticalAlign: "center",
            borderBottom: "1px solid #f7d7b4",
            borderRight: "1px solid #f7d7b4",
            boxShadow: "2px 2px 1px #e5e5e5",
            padding: "5px 10%",
            borderRadius: "3px",
            marginTop: "5px"
        };
        let containerLineStyle = {
            display: "block",
            width: "100%"
        };
        let pointIconStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            width: "10px",
            marginRight: "5%"
        };
        let pointContentStyle = {
            display: "inline-block",
            verticalAlign: "middle"
        };
        //Show existed relatives
        let relatives = this.props.owner.map((relative, index) =>
            <h6 key={"petowner" + index} style={humanNameStyle}>
                <a href={"/user/" + relative.user_id}>
                    {relative.user_name + " + 10% " + noGetAbility(relative.user_aura)}
                </a>
            </h6>
        );
        //Show existed companions
        let companions = this.props.companion.map((companion, index) =>
            <div key={"petcompanion" + index} style={teamPetStyle}><a href={"/pet/" + companion.pet_id}>
                <img style={petImgStyle} src = {"/img/pet/" + companion.pet_id + "/cover/0.png"}  />
                <div style={petContainerStyle}>
                    <h6 style={containerLineStyle}>{noGetNature(companion.pet_nature)}</h6>
                    <div style={containerLineStyle}>
                        <img style={pointIconStyle} alt="ability-icon" src="/img/icon/glyphicons-ability.png" />
                        <h6 style={pointContentStyle}>{companion.pet_ability}</h6>
                    </div>
                </div>
            </a></div>
        );
        return (
            <section style={teamStyle}>
                <div style={teamHumanStyle}>
                    <h5 style={humanTitleStyle}>Relative</h5>
                    {relatives}
                </div>
                <div style={teamTitleStyle}>
                    <img style={titleIconStyle} alt="skill-icon" src="/img/icon/glyphicons-team.png" />
                    <h5 style={titleFontStyle}>Companion</h5>
                </div>
                {companions}
            </section>
        );
    }
}
export default Team;