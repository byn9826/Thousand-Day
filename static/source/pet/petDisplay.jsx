import React, {Component} from "react";
import Ability from "./displayAbility";
import Skill from "./displaySkill";
import Moment from "./displayMoment";
import Progress from "../snippet/display/Progress";
class Display extends Component {
    render() {
        let displayStyle = {
            display: "inline-block",
            width: "55%",
            marginLeft: "6%",
            marginTop: "100px",
            verticalAlign: "top"
        };
        return (
            <section style={displayStyle}>
                <Ability pet={this.props.pet} />
                <Skill pet={this.props.pet}/>
                <Moment id={this.props.pet.pet_id} moment={this.props.moment} />
            </section>
        );
    }
}
export default Display;