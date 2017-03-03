import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Updateprofile from '../snippet/button/Updateprofile';
import Delmember from '../snippet/button/Delmember';
import Getlocation from '../snippet/display/Getlocation';
import Inputbox from '../snippet/input/Inputbox';
import Header from "../general/Header";
import Footer from "../general/Footer";
class EditPet extends Component {
	constructor(props) {
        super(props);
		this.state = {
            petName: this.props.pet.pet_name,
            companion: this.props.companion
		};
	}
	saveProfile(newUrl) {
		let fileData = new FormData();
    	fileData.append('file', newUrl, "0.png");
		reqwest({
        	url: "/edit/pet/updateProfile",
        	method: "POST",
         	data: fileData,
        	contentType: false,
        	processData: false
		});
    }
	saveLocation(coordinate) {
		console.log(coordinate);
	}
	clickDel(index) {
		console.log(index);
	}
	render() {
		let containerStyle = {
			display: "block",
			width: "100%"
		};
		let containerMainStyle = {
			display: "block",
			width: "80%",
			marginLeft: "10%",
			paddingTop: "120px"
		};
		let mainSectionStyle = {
			display: "inline-block",
			verticalAlign: "top",
			marginRight: "4%",
			marginBottom: "20px",
			borderRight: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            borderRadius: "10px",
            boxShadow: "2px 2px 1px #e5e5e5"
		};
		let sectionHeaderStyle = {
			display: "block",
			width: "90%",
			borderBottom: "1px dashed #f7d7b4",
			padding: "8px 5%"
		};
		let headerIconStyle = {
			display: "inline-block",
			verticalAlign: "middle",
			marginRight: "5%"	
		};
		let headerContentStyle = {
			display: "inline-block",
			verticalAlign: "middle",
			fontWeight: "bold",
			marginLeft: "10px"
		};
		let sectionMainStyle = {
			display: "block",
			width: "200px",
			padding: "20px 20px 35px 20px"
		};
		let mainRightStyle = {
			display: "inline-block",
			verticalAlign: "top",
			width: "30%",
			marginBottom: "20px",
			borderRight: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            borderRadius: "10px",
            boxShadow: "2px 2px 1px #e5e5e5"
		};
		let rightGroupStyle = {
			display: "block",
			marginTop: "20px",
			padding: "0 10%",
			width: "80%"
		};
		let nameLabelStyle = {
			display: "inline-block",
			verticalAlign: "top",
			color: "#ef8513",
			fontSize: "14px",
			fontWeight: "bold"
		};
		let groupTitleStyle = {
			display: "block",
			color: "#ef8513",
			fontWeight: "bold",
			marginBottom: "10px"
		};
		return (
			<div style={containerStyle}>
				<Header />
				<main style={containerMainStyle}>
					<section style={mainSectionStyle}>
						<header style={sectionHeaderStyle}>
							<h4 style={headerContentStyle}>Update Profile</h4>
						</header>
						<Updateprofile src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.png"} width="200" saveProfile={this.saveProfile.bind(this)} fontFamily="'Rubik', sans-serif" />
					</section>
					<section style={mainSectionStyle}>
						<header style={sectionHeaderStyle}>
							<h4 style={headerContentStyle}>Update Location</h4>
						</header>
						<div style={sectionMainStyle}>
							<Getlocation center={[-79.4292782, 43.8641138]} zoom="10" setZoom="10" saveLocation={this.saveLocation.bind(this)} fontFamily="'Rubik', sans-serif" />
						</div>
					</section>
					<section style={mainRightStyle}>
						<header style={sectionHeaderStyle}>
							<h4 style={headerContentStyle}>Update Companions</h4>
						</header>
						<div style={rightGroupStyle}>
							<label style={nameLabelStyle} htmlFor="pet-name">Pet Name:</label>
							<Inputbox id="pet-name" content={this.state.petName} max="10" width="100%" fontFamily="'Rubik', sans-serif" />
						</div>
						<div style={rightGroupStyle}>
							<h5 style={groupTitleStyle}>Build Team:</h5>
							<Delmember profile={"/img/pet/" + this.state.companion[0].pet_id + "/cover/0.jpg"} index={this.state.companion[0].pet_id} clickDel={this.clickDel.bind(this)} width="80" height="80" fontFamily="'Rubik', sans-serif" />
							<Delmember profile={"/img/pet/" + this.state.companion[1].pet_id + "/cover/0.jpg"} index={this.state.companion[1].pet_id} clickDel={this.clickDel.bind(this)} width="80" height="80" fontFamily="'Rubik', sans-serif" />
						</div>
					</section>
				</main>
				<Footer />
			</div>
		);
	}
}
reqwest({
	url: "/edit/pet",
	method: "POST",
	data: {"id": window.location.pathname.split("/").pop()},
	success: function(result) {
		console.log(result);
		ReactDOM.render(<EditPet pet={result[0]} companion={result[1]} />, document.getElementById("root"));
	}
});