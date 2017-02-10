import React, {Component} from "react";
import Ability from "./displayAbility";
import Skill from "./displaySkill";
import Team from "./displayTeam";
import Progress from "../snippet/display/Progress";
class Display extends Component {
    render() {
        let displayStyle = {
            display: "inline-block",
            width: "55%",
            marginLeft: "6%",
            marginTop: "50px",
            verticalAlign: "top"
        };
        return (
            <section style={displayStyle}>
                <Ability ability={this.props.data.ability} potential={this.props.data.potential} />
                <Skill id={this.props.data.id} skill={this.props.data.skill} />
                <Team companion={this.props.data.companion} human={this.props.data.human} />
            </section>
        );
    }
}
export default Display;