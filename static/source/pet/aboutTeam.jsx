import React, {Component} from "react";
import noGetNature from "../../js/noGetNature.js";
import noGetAbility from "../../js/noGetAbility.js";
class Team extends Component {
    render() {
        //Show existed relatives
        let relatives = this.props.owner.map((relative, index) =>
            <h6 key={"petowner" + index}>
                <a href={"/user/" + relative.user_id}>
                    {relative.user_aura?relative.user_name + " + 10% " + noGetAbility(relative.user_aura):relative.user_name + " with no aura"}
                </a>
            </h6>
        );
        //Show existed companions
        let companions = this.props.companion.map((companion, index) =>
            <div key={"petcompanion" + index} className="team-companion"><a href={"/pet/" + companion.pet_id}>
                <img className="team-companion-profile" src = {"/img/pet/" + companion.pet_id + "/cover/0.png"}  />
                <div className="team-companion-container">
                    <h6 className="team-companion-container-line">{noGetNature(companion.pet_nature)}</h6>
                    <div className="team-companion-container-line">
                        <img alt="ability-icon" src="/img/icon/glyphicons-ability.png" />
                        <h6>{companion.pet_ability}</h6>
                    </div>
                </div>
            </a></div>
        );
        return (
            <section id="team">
                <div id="team-relative">
                    <h5>Relative</h5>
                    {relatives}
                </div>
                <div id="team-title">
                    <img alt="skill-icon" src="/img/icon/glyphicons-team.png" />
                    <h5>Companion</h5>
                </div>
                {companions}
            </section>
        );
    }
}
export default Team;