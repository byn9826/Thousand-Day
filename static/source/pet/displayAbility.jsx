import React, {Component} from "react";
import noGetAbility from "../../js/noGetAbility.js";
import Progress from "../snippet/display/Progress";
class Ability extends Component {
    constructor(props) {
        super(props);
		this.state = {
            ability: this.props.ability,
            potential: this.props.potential
		};
	}
    render() {
        let displayStyle = {
            display: "block",
            width: "100%"
        };
        let displayPointStyle = {
            display: "inline-block",
            width: "40%",
            marginRight: "6%",
            verticalAlign: "top"
        };
        let pointHolderStyle = {
            display: "block",
            width: "90%",
            marginBottom: "10px",
            padding: "10px 5%",
            borderRight: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            borderRadius: "10px",
            verticalAlign: "middle",
            textAlign: "center",
            boxShadow: "2px 2px 1px #e5e5e5"
        };
        let holderFontStyle = {
            display: "inline-block",
            marginLeft: "10%",
            textAlign: "center",
            fontWeight: "bold"
        };
        let displayAbilityStyle = {
            display: "inline-block",
            width: "54%",
            verticalAlign: "top"
        };
        let abilityLineStyle = {
            display: "block",
            width: "100%",
            marginBottom: "5px"
        };
        let lineAttriStyle = {
            display: "inline-block",
            marginRight: "3%",
            verticalAlign: "middle",
            color: "#ef8513",
        };
        let point = 0;
        for (var i = 0; i < 5; i++) {
            point += this.state.ability[i];
        }
        let abilities = this.state.ability.map((ability, index) => 
            <div key={"abilitysingle" + index} style={abilityLineStyle}>
                <h6 style={lineAttriStyle}>{noGetAbility(index)}</h6>
                <Progress progress={ability} max="100" percentage="false" width="75%" height="12px" />
            </div>
        );
        return(
            <section style={displayStyle}>
                <div style={displayPointStyle}>
                    <div style={pointHolderStyle}>
                        <img alt="ability-icon" src="/img/pet/icon/glyphicons-ability.png" / >
                        <h5 style={holderFontStyle}>
                            Ability: <br />
                            {point}
                        </h5>
                    </div>
                    <div style={pointHolderStyle}>
                        <img alt="potential-icon" src="/img/pet/icon/glyphicons-potential.png" / >
                        <h5 style={holderFontStyle}>
                            Potential: <br />
                            {this.state.potential}
                        </h5>
                    </div>
                </div>
                <div style={displayAbilityStyle}>
                    {abilities}
                </div>
            </section>
        );
    }
}
export default Ability;