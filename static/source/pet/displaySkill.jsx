import React, {Component} from "react";
import Ovaledit from "../snippet/button/Ovaledit";
class Skill extends Component {
    constructor(props) {
        super(props);
		this.state = {
            skillName: [this.props.pet.skillone_name, this.props.pet.skilltwo_name, this.props.pet.skillthree_name, this.props.pet.skillfour_name],
            showButton: false
        };
	}
    showButton() {
        if (!this.state.showButton) {
            this.setState({showButton: true});
        } else {
            this.setState({showButton: false});
        }
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
        //Show edit button
        let editButton;
        if (this.state.showButton && (this.props.userId == this.props.pet.owner_id || this.props.userId == this.props.pet.relative_id)) {
            editButton = <Ovaledit value="Edit" fontFamily="'Rubik', sans-serif" href={"/edit/pet/" + this.props.pet.pet_id} />;
        }
        //Show four skills
        let skills = this.state.skillName.map((skill, index) => 
            <div key={"petskill" + index} style={skillSingleStyle}>
                <h5 style={singleTitleStyle}>{skill}</h5>
                <img style={singleImgStyle} alt={skill} src={"/img/pet/" + this.props.pet.pet_id + "/cover/" + (parseInt(index) + 1) + ".jpg"} />
            </div>
        );
        return (
            <section style={skillStyle} onMouseEnter={this.showButton.bind(this)} onMouseLeave={this.showButton.bind(this)}>
                <div style={skillTitleStyle}>
                    <img style={titleIconStyle} alt="skill-icon" src="/img/icon/glyphicons-skill.png" / >
                    <h4 style={titleFontStyle}>Skill Panel</h4>
                    {editButton}
                </div>  
                {skills}
            </section>
        );
    }
}
export default Skill;