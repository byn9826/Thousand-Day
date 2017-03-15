import React, {Component} from "react";
import noGetGender from "../../js/noGetGender.js";
import noGetType from "../../js/noGetType.js";
import noGetNature from "../../js/noGetNature.js";
import Waterfall from "../snippet/display/Waterfall";
import noGetImgType from "../../js/noGetImgType.js";
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            moment: this.props.moment
		};
	}
    render() {
        let hubStyle = {
            display: "inline-block",
            width: "55%",
            marginLeft: "6%",
            marginTop: "100px",
            verticalAlign: "top"
        };
        let hubHeaderStyle = {
            display: "block",
            width: "94%",
            padding: "10px 3%",
            boxShadow: "2px 2px 1px #e5e5e5",
            marginBottom: "25px",
            marginTop: "40px"
        };
        let headerIconStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "5%"
        };
        let headerContentStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "bold"
        };
        let hubPetStyle = {
            display: "block",
            width: "94%",
            padding: "10px 3%",
            marginBottom: "10px",
            borderRadius: "5px",
            backgroundColor: "#f7f9fc"
        };
        let petImgStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            width: "13%",
            borderRadius: "5px",
            marginRight: "2%"
        };
        let petInfoStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            width: "85%"
        };
        let infoLineStyle = {
            display: "block",
            width: "94%",
            padding: "0 3%"
        };
        let lineTypeStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "normal",
            color: "white",
            padding: "1px 3px",
            backgroundColor: "#ef8513",
            borderRadius: "4px",
            marginRight: "2%"
        };
        let lineNameStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "bold",
            color: "#052456",
            marginRight: "3%"
        };
        let lineGenderStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "bold",
            marginRight: "2%"
        };
        let lineAbilityStyle = {
            display: "inline-block",
            width: "30%",
            padding: "8px 1%",
            borderRight: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            borderRadius: "6px",
            verticalAlign: "middle",
            textAlign: "center",
            boxShadow: "2px 2px 1px #e5e5e5"
        };
        let abilityImgStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            width: "18px"
        };
        let abilityFontStyle = {
            display: "inline-block",
            marginLeft: "10%",
            textAlign: "center",
            verticalAlign: "middle"
        };
        //Show all pets
        let pets = this.props.pet.map((pet, index) =>
            <div key={"petdetail" + index} style={hubPetStyle}>
                <img style={petImgStyle} alt={pet.pet_name} src={"/img/pet/" + pet.pet_id + "/cover/0.png"} />
                <div style={petInfoStyle}>
                    <div style={infoLineStyle}>
                        <h6 style={lineTypeStyle}>{noGetType(pet.pet_type)}</h6>
                        <h5 style={lineNameStyle}>{pet.pet_name}</h5>
                        <h6 style={lineGenderStyle}>{noGetGender(pet.pet_gender)} {noGetNature(pet[4])}</h6>
                    </div>
                    <div style={infoLineStyle}>
                        <div style={lineAbilityStyle}>
                            <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-moment.png" />
                            <h6 style={abilityFontStyle}>
                                Moment: <br />
                            </h6>
                        </div>
                        <div style={lineAbilityStyle}>
                            <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-ability.png" />
                            <h6 style={abilityFontStyle}>
                                Ability: {pet.pet_ability}<br />
                            </h6>
                        </div>
                        <div style={lineAbilityStyle}>
                            <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-win.png" />
                            <h6 style={abilityFontStyle}>
                                Win: {pet.pet_win}<br />
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        );
        let allImages = [];
        for (let i = 0; i < this.state.moment.length; i++) {
            allImages[i] = [];
            allImages[i][0] = "/img/pet/" + this.state.moment[i].pet_id + "/moment/" + this.state.moment[i].image_id + "." + noGetImgType(this.state.moment[i].image_type);
            allImages[i][1] = this.state.moment[i].moment_message;
            allImages[i][2] = "/moment/" + this.state.moment[i].moment_id;
        }
        return (
            <section style={hubStyle}>
                <div style={hubHeaderStyle}>
                    <img style={headerIconStyle} alt="hub-icon" src="/img/icon/glyphicons-hub.png" />
                    <h4 style={headerContentStyle}>Pets in hub</h4>
                </div>
                {pets}
                <div style={hubHeaderStyle}>
                    <img style={headerIconStyle} alt="moment-icon" src="/img/icon/glyphicons-moment.png" />
                    <h4 style={headerContentStyle}>Moments</h4>
                </div>
                <Waterfall column="4" image={allImages} link="true" fontFamily="'Rubik', sans-serif" />
            </section>
        );
    }
}
export default Profile;