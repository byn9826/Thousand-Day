import React, {Component} from "react";
import noGetGender from "../../js/noGetGender.js";
import noGetType from "../../js/noGetType.js";
import noGetNature from "../../js/noGetNature.js";
import Waterfall from "../snippet/display/Waterfall";
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            pets: this.props.pets
		};
	}
    render() {
        let hubStyle = {
            display: "inline-block",
            width: "55%",
            marginLeft: "6%",
            marginTop: "50px",
            verticalAlign: "top"
        };
        let hubHeaderStyle = {
            display: "block",
            width: "94%",
            padding: "10px 3%",
            boxShadow: "2px 2px 1px #e5e5e5",
            marginBottom: "20px"
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
            width: "100%",
            marginBottom: "40px",
            borderRadius: "5px",
            backgroundColor: "#f7f9fc"
        };
        let petImgStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "18%",
            borderRadius: "5px",
            marginRight: "2%"
        };
        let petInfoStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "80%",
            marginTop: "10px",
            paddingBottom: "5px"
        };
        let infoLineStyle = {
            display: "block",
            width: "94%",
            padding: "5px 3%"
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
            width: "28%",
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
            verticalAlign: "middle"
        };
        let abilityFontStyle = {
            display: "inline-block",
            marginLeft: "10%",
            textAlign: "center",
            fontWeight: "bold",
            verticalAlign: "middle"
        };      
        let pets = this.state.pets.map((pet, index) => 
            <div key={"petdetail" + index} style={hubPetStyle}>
                <img style={petImgStyle} alt={pet[1]} src={"/img/pet/" + pet[0] + "/cover/0.jpg"} />
                <div style={petInfoStyle}>
                    <div style={infoLineStyle}>
                        <h6 style={lineTypeStyle}>{noGetType(pet[3])}</h6>
                        <h3 style={lineNameStyle}>{pet[1]}</h3>
                        <h6 style={lineGenderStyle}>{noGetGender(pet[2])} {noGetNature(pet[4])}</h6>
                    </div>
                    <div style={infoLineStyle}>
                        <div style={lineAbilityStyle}>
                            <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-moment.png" / >
                            <h5 style={abilityFontStyle}>
                                Moment: <br />
                                {pet[7].length}
                            </h5>
                        </div>
                        <div style={lineAbilityStyle}>
                            <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-ability.png" / >
                            <h5 style={abilityFontStyle}>
                                Ability: <br />
                                {pet[5]}
                            </h5>
                        </div>
                        <div style={lineAbilityStyle}>
                            <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-win.png" / >
                            <h5 style={abilityFontStyle}>
                                Win: <br />
                                {pet[6]}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        );
        let allPets = this.state.pets;
        let i, j;
        for (i = 0; i < allPets.length; i++) {
            for (j = 0; j < allPets[i][7].length; j++) {
                allPets[i][7][j][0] = "/img/pet/" + allPets[i][0] + "/moment/" + allPets[i][7][j][0] + ".jpg";
            }
        }
        let allMoments = [];
        for (i = 0; i < allPets.length; i++) {
            allMoments = allMoments.concat(allPets[i][7]);
        }
        return (
            <section style={hubStyle}>
                <div style={hubHeaderStyle}>
                    <img style={headerIconStyle} alt="hub-icon" src="/img/icon/glyphicons-hub.png" / >
                    <h4 style={headerContentStyle}>Pets in hub</h4>
                </div>
                {pets}
                <div style={hubHeaderStyle}>
                    <img style={headerIconStyle} alt="moment-icon" src="/img/icon/glyphicons-moment.png" / >
                    <h4 style={headerContentStyle}>Moments</h4>
                </div>
                <Waterfall column="4" image={allMoments} />
            </section>
        );
    }
}
export default Profile;