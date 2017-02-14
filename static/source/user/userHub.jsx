import React, {Component} from "react";
import noGetGender from "../../js/noGetGender.js";
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
            padding: "5px 3%",
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
            marginBottom: "20px",
            borderRadius: "5px",
            backgroundColor: "#f7f9fc"
        };
        let petImgStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "16%",
            borderRadius: "5px",
            marginRight: "2%"
        };
        let petInfoStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "82%"
        };
        let infoLineStyle = {
            display: "block",
            width: "94%",
            padding: "5px 3%"
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
            color: "#052456"
        };
        let pets = this.state.pets.map((pet) => 
            <div style={hubPetStyle}>
                <img style={petImgStyle} alt={pet[1]} src={"/img/pet/" + pet[0] + "/cover/0.jpg"} />
                <div style={petInfoStyle}>
                    <div style={infoLineStyle}>
                        <h4 style={lineNameStyle}>{pet[1]}</h4>
                        <h6 style={lineGenderStyle}>{noGetGender(pet[2])}</h6>
                    </div>
                </div>
            </div>
        );
        return(
            <section style={hubStyle}>
                <div style={hubHeaderStyle}>
                    <img style={headerIconStyle} alt="hub-icon" src="/img/user/icon/glyphicons-hub.png" / >
                    <h4 style={headerContentStyle}>Pets in hub</h4>
                </div>
                {pets}
            </section>
        );
    }
}
export default Profile;