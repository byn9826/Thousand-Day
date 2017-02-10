import React, {Component} from "react";
import Team from "./aboutTeam";
import noGetGender from "../../js/noGetGender.js";
import noGetNature from "../../js/noGetNature.js";
import noGetType from "../../js/noGetType.js";
import noGetLocation from "../../js/noGetLocation.js";
class About extends Component {
    constructor(props) {
        super(props);
		this.state = {
            like: 0
		};
	}
    updateLike(change) {
        let like = this.state.like;
        this.setState({like: like + change});
    }
    render() {
        let aboutStyle = {
            display: "inline-block",
            width: "18%",
            marginLeft: "10%",
            marginTop: "50px",
            verticalAlign: "top"
        };
        let aboutProfileStyle = {
            display: "block",
            width: "100%",
            borderRadius: "5px"
        };
        let aboutLineStyle = {
            display: "block",
            width: "90%",
            margin: "10px 5%"
        };
        let titleNameStyle = {
            display: "inline-block",
            marginRight: "5%",
            verticalAlign: "middle"
        };
        let titleGenderStyle = {
            display: "inline-block",
            verticalAlign: "middle"
        };
        let aboutFirstStyle = {
            display: "block",
            width: "90%",
            marginLeft: "5%",
            marginTop: "15px",
            marginBottom: "8px",
            paddingTop: "10px",
            borderTop: "1px solid #e5e5e5",
            fontWeight: "bold"
        };
        let aboutDetailStyle = {
            display: "block",
            width: "90%",
            margin: "8px 5%"
        };
        let aboutLastStyle = {
            display: "block",
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "8px",
            paddingBottom: "20px",
            borderBottom: "1px solid #e5e5e5"
        };
        let petGender = noGetGender(this.props.data.gender);
        let petNature = noGetNature(this.props.data.nature);
        let petType = noGetType(this.props.data.type);
        let petLocation = noGetLocation(this.props.data.location);
        return(
            <main style={aboutStyle}>
                <img style={aboutProfileStyle} alt = {this.props.data.name} src = {"/img/pet/" + this.props.data.id + "/cover/0.jpg"} />
                <div style={aboutLineStyle}>
                    <h1 style={titleNameStyle}>{this.props.data.name}</h1>
                    <h4 style={titleGenderStyle}>{petGender}</h4>
                </div>
                <h5 style={aboutFirstStyle}>Nature: {petNature}</h5>
                <h5 style={aboutDetailStyle}>Type: {petType}</h5>
                <h5 style={aboutDetailStyle}>Location: {petLocation}</h5>
                <h5 style={aboutLastStyle}>Reg in hub: {this.props.data.reg}</h5>
                <Team companion={this.props.data.companion} human={this.props.data.human} />
            </main>
        );
    }
}
export default About;