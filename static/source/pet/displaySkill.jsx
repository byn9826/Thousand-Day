import React, {Component} from "react";
class Skill extends Component {
    constructor(props) {
        super(props);
		this.state = {
            skillName: [this.props.pet.skillone_name, this.props.pet.skilltwo_name, this.props.pet.skillthree_name, this.props.pet.skillfour_name]
        };
	}
    render() {
        let skillStyle = {
            display: "block",
            padding: "10px 2%",
            width: "96%",
            marginTop: "40px",
            border: "2px solid #f7d7b4",
            borderRadius: "5px"
        };
        let skillTitleStyle = {
            display: "block",
            width: "100%",
            textAlign: "left",
            marginBottom: "10px"
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
        let skillSingleStyle = {
            display: "inline-block",
            width: "23%",
            margin: "0 1%",
            verticalAlign: "bottom",
            borderTop: "2px solid #f7f9fc"
        };
        let singleTitleStyle = {
            display: "block",
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            color: "#ef8513",
            margin: "5px 0"
        };
        let singleImgStyle = {
            display: "block",
            width: "90%",
            margin: "5px 5%",
            borderRadius: "3px",
        };
        let skills = [];
        for (let i = 0; i < 4; i++) {
            if (this.state.skillName[i]) {
                skills[i] = (
                    <div key={"petskill" + i} style={skillSingleStyle}>
                        <h5 style={singleTitleStyle}>{this.state.skillName[i]}</h5>
                        <img style={singleImgStyle} alt={this.state.skillName[i]} src={"/img/pet/" + this.props.pet.pet_id + "/cover/" + (i + 1) + ".jpg"} />
                    </div>
                );
            } else {
                skills[i] = (
                    <div key={"petskill" + i} style={skillSingleStyle}>
                        <h5 style={singleTitleStyle}>Not learned yet</h5>
                        <img style={singleImgStyle} alt="No skill" src={"/img/icon/skill.jpg"} />
                    </div>
                );
            }
        }
        return (
            <section style={skillStyle}>
                <div style={skillTitleStyle}>
                    <img style={titleIconStyle} alt="skill-icon" src="/img/icon/glyphicons-skill.png" />
                    <h4 style={titleFontStyle}>Skill Panel</h4>
                </div>  
                {skills}
            </section>
        );
    }
}
export default Skill;