import React, {Component} from "react";
import reqwest from "reqwest";
import noGetAbility from "../../js/noGetAbility.js";
import Progress from "../snippet/display/Progress";
import Ovaledit from "../snippet/button/Ovaledit";
class Ability extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //Inital and Update ability
            ability: [this.props.pet.ability_attack, this.props.pet.ability_defend, this.props.pet.ability_health, this.props.pet.ability_swift, this.props.pet.ability_lucky],
            //Inital and Update potential
            potential: this.props.pet.pet_potential,
            //Use for roll back ability if db update fail
            prevAbility: [this.props.pet.ability_attack, this.props.pet.ability_defend, this.props.pet.ability_health, this.props.pet.ability_swift, this.props.pet.ability_lucky],
            //Use for roll back potential if db update fail
            prevPotential: this.props.pet.pet_potential,
            //If edit panel is show or not
            showEdit: false,
            //Check if ability has been changed
            isChanged: false
        };
	}
    //Update ability and potential after user click on +
    addAbility(index) {
        if (this.state.potential > 0) {
            let potential = this.state.potential - 1;
            let ability = this.state.ability;
            ability[index] = this.state.ability[index] + 1
            this.setState({ability: ability, potential: potential, isChanged: true});
        } 
    }
    clickButton() {
        if (this.state.showEdit) {
            //Hide edit panel when it's alreay show
            this.setState({showEdit: false});
            //If ability has been changed
            if (this.state.isChanged) {
                reqwest({
                    url: "/pet/updateAbility",
                    type: "json",
                    method: "POST",
                    contentType: "application/json", 
                    headers: {"X-My-Custom-Header": "SomethingImportant"},
                    //Send new ability, potential, pet id, origin abilty, origin potential to backend
                    data: JSON.stringify({"petId": this.props.pet.pet_id, "ability": this.state.ability, "prevAbility": this.state.prevAbility, "potential": this.state.potential, "prevPotential": this.state.prevPotential}),
                    success: function (result) {
                        if (result.Result === 0) {
                            let ability = this.state.ability.slice();
                            let potential = this.state.potential;
                            //Update roll back ability potential after db success update
                            this.setState({prevAbility: ability, prevPotential: potential});
                            console.log("Success");
                        } else {
                            let ability = this.state.prevAbility.slice();
                            let potential = this.state.prevPotential;
                            //Roll back ability potential if db fails
                            this.setState({ability: ability, potential: potential});
                            console.log("Something wrong");
                        }
                    }.bind(this),
                    error: function (err) {
                        let ability = this.state.prevAbility.slice();
                        let potential = this.state.prevPotential;
                        //Roll back ability potential if db fails
                        this.setState({ability: ability, potential: potential});
                        console.log("Can't connect to server");
                    }.bind(this)
                });
            }
        } else {
            //Show edit panel when it's not show
            this.setState({showEdit: true});
        }
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
            verticalAlign: "middle"
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
        let holderEditStyle = {
            display: "block",
            width: "100%",
            height: "18px"
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
            marginBottom: "5px",
            verticalAlign: "top"
        };
        let lineAttriStyle = {
            display: "inline-block",
            marginRight: "3%",
            verticalAlign: "middle",
            color: "#ef8513",
        };
        let lineAddStyle;
        if (this.state.potential > 0) {
             lineAddStyle = {
                display: "inline-block",
                verticalAlign: "middle",
                backgroundColor: "#ef8513",
                width: "16px",
                height: "16px",
                lineHeight: "16px",
                color: "white",
                textAlign: "center",
                borderRadius: "8px",
                marginLeft: "5px",
                cursor: "pointer"
            };
        } else {
            lineAddStyle = {
                display: "inline-block",
                verticalAlign: "middle",
                backgroundColor: "#f7d7b4",
                width: "16px",
                height: "16px",
                lineHeight: "16px",
                color: "white",
                textAlign: "center",
                borderRadius: "8px",
                marginLeft: "5px"
            };
        }
        //Calculate total abilities
        let point = 0;
        for (var i = 0; i < 5; i++) {
            point += this.state.ability[i];
        }
        let abilities;
        //Show edit panel when user is pet owner or relative and user click show edit panel
        if ((this.props.userId == this.props.pet.owner_id || this.props.userId == this.props.pet.relative_id) && this.state.showEdit) {
            abilities = this.state.ability.map((ability, index) => 
                <div key={"abilitysingle" + index} style={abilityLineStyle}>
                    <h6 style={lineAttriStyle}>{noGetAbility(index)}</h6>
                    <Progress progress={ability} max="1000" percentage="false" width="68%" height="12px" fontFamily="'Rubik', sans-serif" fontSize="7px" fontColor="#4b4f56" />
                    <h7 style={lineAddStyle} onClick={this.addAbility.bind(this, index)}>+</h7>
                </div>
            );
        } 
        //Only show ability progress bar
        else {
            abilities = this.state.ability.map((ability, index) => 
                <div key={"abilitysingle" + index} style={abilityLineStyle}>
                    <h6 style={lineAttriStyle}>{noGetAbility(index)}</h6>
                    <Progress progress={ability} max="1000" percentage="false" width="75%" height="12px" fontFamily="'Rubik', sans-serif" fontSize="7px" fontColor="#4b4f56" />
                </div>
            );
        }
        let editButton;
        //Show save button when edit panel is show
        if (this.state.showEdit) {
            editButton = <Ovaledit value="SAVE" clickEdit={this.clickButton.bind(this)} />;
        } else if ((this.props.userId == this.props.pet.owner_id || this.props.userId == this.props.pet.relative_id) && !this.state.showEdit) {
            //Show edit button when edit panel is not show, current user is pet owner/relative
            editButton = <Ovaledit value="SET" clickEdit={this.clickButton.bind(this)} />;
        }
        return(
            <section style={displayStyle}>
                <div style={displayPointStyle}>
                    <div style={pointHolderStyle}>
                        <img alt="ability-icon" src="/img/icon/glyphicons-ability.png" / >
                        <h5 style={holderFontStyle}>
                            Ability: <br />
                            {point}
                        </h5>
                    </div>
                    <div style={pointHolderStyle}>
                        <div style={holderEditStyle}>
                            {editButton}
                        </div>
                        <img alt="potential-icon" src="/img/icon/glyphicons-potential.png" / >
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