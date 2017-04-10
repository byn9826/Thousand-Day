import React, {Component} from "react";
class Skill extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //store skill names
            skillName: [this.props.pet.skillone_name, this.props.pet.skilltwo_name, this.props.pet.skillthree_name, this.props.pet.skillfour_name]
        };
	}
    render() {
        let skills = [];
        for (let i = 0; i < 4; i++) {
            //show customized skill picture if available
            if (this.state.skillName[i]) {
                skills[i] = (
                    <div key={"petskill" + i} className="skill-one">
                        <h5>{this.state.skillName[i]}</h5>
                        <img alt={this.state.skillName[i]} src={"/img/pet/" + this.props.pet.pet_id + "/cover/" + (i + 1) + ".jpg"} />
                    </div>
                );
            } else {
                //show fault picture
                skills[i] = (
                    <div key={"petskill" + i} className="skill-one">
                        <h5>Not learned yet</h5>
                        <img alt="No skill" src={"/img/icon/skill.jpg"} />
                    </div>
                );
            }
        }
        return (
            <section id="skill">
                <div id="skill-title">
                    <img alt="skill-icon" src="/img/icon/glyphicons-skill.png" />
                    <h4>Skill Panel</h4>
                </div>  
                {skills}
            </section>
        );
    }
}
export default Skill;