import React, {Component} from "react";
import reqwest from "reqwest";
import noGetAbility from "../../js/noGetAbility.js";
import Progress from "../snippet/display/Progress";
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
        //only update when have potential point
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
                        let ability, potential;
                        switch (result) {
                            case 0:
                                ability = this.state.prevAbility.slice();
                                potential = this.state.prevPotential;
                                //Roll back ability potential if db fails
                                this.setState({ability: ability, potential: potential});
                                console.log("Please login first");
                                break;
                            case 1:
                                ability = this.state.prevAbility.slice();
                                potential = this.state.prevPotential;
                                //Roll back ability potential if db fails
                                this.setState({ability: ability, potential: potential});
                                console.log("Wrong info");
                                break;
                            case 2:
                                ability = this.state.ability.slice();
                                potential = this.state.potential;
                                //Update roll back ability potential after db success update
                                this.setState({prevAbility: ability, prevPotential: potential});
                                break;
                            case 3:
                                ability = this.state.prevAbility.slice();
                                potential = this.state.prevPotential;
                                //Roll back ability potential if db fails
                                this.setState({ability: ability, potential: potential});
                                console.log("Can't connect to db");
                                break;
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
        //show different button style
        let buttonStyle;
        if (this.state.potential > 0) {
            buttonStyle = "ability-display-holder-edit";
        } else {
            buttonStyle = "ability-display-holder-edit-disactive"
        }
        //Calculate total abilities
        let point = 0;
        for (var i = 0; i < 5; i++) {
            point += this.state.ability[i];
        }
        let abilities;
        //Show edit panel when user is pet owner or relative and user click show edit panel
        if ((this.props.visitorId == this.props.pet.owner_id || this.props.visitorId == this.props.pet.relative_id) && this.state.showEdit) {
            abilities = this.state.ability.map((ability, index) => 
                <div key={"abilitysingle" + index} className="ability-display-holder">
                    <h6>{noGetAbility(index)}</h6>
                    <Progress progress={ability} max="1000" percentage="false" width="68%" height="12px" fontFamily="'Rubik', sans-serif" fontSize="7px" fontColor="#4b4f56" />
                    <h7 className={buttonStyle} onClick={this.addAbility.bind(this, index)}>+</h7>
                </div>
            );
        } 
        //Only show ability progress bar
        else {
            abilities = this.state.ability.map((ability, index) => 
                <div key={"abilitysingle" + index} className="ability-display-holder">
                    <h6>{noGetAbility(index)}</h6>
                    <Progress progress={ability} max="1000" percentage="false" width="75%" height="12px" fontFamily="'Rubik', sans-serif" fontSize="7px" fontColor="#4b4f56" />
                </div>
            );
        }
        let editButton;
        //Show save button when edit panel is show
        if (this.state.showEdit) {
            editButton = (<h6 onClick={this.clickButton.bind(this)}>SAVE</h6>);
        } else if ((this.props.visitorId == this.props.pet.owner_id || this.props.visitorId == this.props.pet.relative_id) && !this.state.showEdit && this.props.visitorId) {
            //Show edit button when edit panel is not show, current user is pet owner/relative
            editButton = (<h6 onClick={this.clickButton.bind(this)}>SET</h6>);
        }
        return(
            <section id="ability">
                <div id="ability-point">
                    <div className="ability-point-holder">
                        <img alt="ability-icon" src="/img/icon/glyphicons-ability.png" / >
                        <h5>
                            Ability: <br />
                            {point}
                        </h5>
                    </div>
                    <div className="ability-point-holder">
                        {editButton}
                        <img alt="potential-icon" src="/img/icon/glyphicons-potential.png" / >
                        <h5>
                            Potential: <br />
                            {this.state.potential}
                        </h5>
                    </div>
                </div>
                <div id="ability-display">
                    {abilities}
                </div>
            </section>
        );
    }
}
export default Ability;