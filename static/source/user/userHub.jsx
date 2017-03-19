import React, {Component} from "react";
import reqwest from "reqwest";
import noGetGender from "../../js/noGetGender.js";
import noGetType from "../../js/noGetType.js";
import noGetNature from "../../js/noGetNature.js";
import Waterfall from "../snippet/display/Waterfall";
import Ovaledit from "../snippet/button/Ovaledit";
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            moment: this.props.moment,
            showMore: 1,
            showMessage: (this.props.moment.length < 20)? "No more moments": "Click to load more ..."
		};
	}
    //load more picture
    loadMore() {
        if (this.state.showMessage == "Click to load more ...") {
            reqwest({
                url: "/user/loadMoment",
                type: "json",
                method: "POST",
                contentType: "application/json", 
                headers: {"X-My-Custom-Header": "SomethingImportant"},
                data: JSON.stringify({"userId": this.props.user.user_id, "showMore": this.state.showMore}),
                success: function(result) {
                    if (result.Result === 2) {
                        //Increase load record, update message
                        let newShow = this.state.showMore + 1;
                        this.setState({showMore: newShow, showMessage: "No more moments"});
                    } else if (result.Result === 1) {
                        console.log("Something Wrong");
                    } else {
                        console.log(result);
                        //Increase load record
                        let newShow = this.state.showMore + 1;
                        //Update moment array
                        let moment = this.state.moment.concat(result);
                        this.setState({showMore: newShow, moment: moment});
                        if (result.length < 20) {
                            this.setState({showMessage: "No more moments"});
                        }
                    }
                }.bind(this),
                error: function (err) {
                    console.log("Something Wrong");
                }
            });
        }
    }
    render() {
        let hubStyle = {
            display: "inline-block",
            width: "55%",
            marginLeft: "6%",
            marginTop: "80px",
            verticalAlign: "top"
        };
        let hubHeaderStyle = {
            display: "block",
            width: "94%",
            padding: "10px 3%",
            boxShadow: "2px 2px 1px #e5e5e5",
            marginBottom: "25px",
            marginTop: "20px"
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
        let momentLoadStyle = {
            display: "block",
            width: "100%",
            backgroundColor: "#f7d7b4",
            color: "#052456",
            border: "1px solid #f7f9fc",
            textAlign: "center",
            padding: "6px 0",
            borderRadius: "5px",
            cursor: "pointer"
        };
        //Show all pets
        let pets;
        if (this.props.visitorId == this.props.user.user_id) {
            pets = this.props.pet.map((pet, index) =>
                <div key={"petdetail" + index} style={hubPetStyle}>
                    <a href={"/pet/" + pet.pet_id}>
                        <img style={petImgStyle} alt={pet.pet_name} src={"/img/pet/" + pet.pet_id + "/cover/0.png"} />
                    </a>
                    <div style={petInfoStyle}>
                        <Ovaledit value="Edit" href={"/edit/pet/" + pet.pet_id} />
                        <div style={infoLineStyle}>
                            <h6 style={lineTypeStyle}>{noGetType(pet.pet_type)}</h6>
                            <a href={"/pet/" + pet.pet_id}><h5 style={lineNameStyle}>{pet.pet_name}</h5></a>
                            <h6 style={lineGenderStyle}>{noGetGender(pet.pet_gender)} {noGetNature(pet[4])}</h6>
                        </div>
                        <div style={infoLineStyle}>
                            <div style={lineAbilityStyle}>
                                <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-ability.png" />
                                <h6 style={abilityFontStyle}>
                                    Ability: {pet.pet_ability}<br />
                                </h6>
                            </div>
                            <div style={lineAbilityStyle}>
                                <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-moment.png" />
                                <h6 style={abilityFontStyle}>
                                    Potential: {pet.pet_potential}<br />
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
        } else {
            pets = this.props.pet.map((pet, index) =>
                <div key={"petdetail" + index} style={hubPetStyle}>
                    <a href={"/pet/" + pet.pet_id}>
                        <img style={petImgStyle} alt={pet.pet_name} src={"/img/pet/" + pet.pet_id + "/cover/0.png"} />
                    </a>
                    <div style={petInfoStyle}>
                        <div style={infoLineStyle}>
                            <h6 style={lineTypeStyle}>{noGetType(pet.pet_type)}</h6>
                            <a href={"/pet/" + pet.pet_id}><h5 style={lineNameStyle}>{pet.pet_name}</h5></a>
                            <h6 style={lineGenderStyle}>{noGetGender(pet.pet_gender)} {noGetNature(pet[4])}</h6>
                        </div>
                        <div style={infoLineStyle}>
                            <div style={lineAbilityStyle}>
                                <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-ability.png" />
                                <h6 style={abilityFontStyle}>
                                    Ability: {pet.pet_ability}<br />
                                </h6>
                            </div>
                            <div style={lineAbilityStyle}>
                                <img style={abilityImgStyle} alt="ability-icon" src="/img/icon/glyphicons-moment.png" />
                                <h6 style={abilityFontStyle}>
                                    Potential: {pet.pet_potential}<br />
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
        }
        let allImages = [];
        for (let i = 0; i < this.state.moment.length; i++) {
            allImages[i] = [];
            allImages[i][0] = "/img/pet/" + this.state.moment[i].pet_id + "/moment/" + this.state.moment[i].image_name;
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
                <h5 style={momentLoadStyle} onClick={this.loadMore.bind(this)}>{this.state.showMessage}</h5>
            </section>
        );
    }
}
export default Profile;