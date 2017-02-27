import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Updateprofile from '../snippet/button/Updateprofile';
import Getlocation from '../snippet/display/Getlocation';
import Inputbox from '../snippet/input/Inputbox';
import Header from "../general/Header";
import Footer from "../general/Footer";
class EditPet extends Component {
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
	render() {
		let containerStyle = {
			display: "block",
			width: "100%"
		};
		let containerMainStyle = {
			display: "block",
			width: "80%",
			marginLeft: "10%",
			paddingTop: "90px"
		};
		let mainSectionStyle = {
			display: "block",
			width: "100%",
			marginBottom: "30px"
		};
		let sectionHeaderStyle = {
			display: "block",
			width: "90%",
			marginBottom: "15px",
			padding: "15px 5%",
			borderRight: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            borderRadius: "10px",
            boxShadow: "2px 2px 1px #e5e5e5"
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
		let sectionProfileStyle = {
			display: "inline-block",
			verticalAlign: "top",
			marginLeft: "3%"
		};
		let profileInfoStyle = {
			display: "block",
			width: "100%",
			marginTop: "20px"
		};
		let infoLabelStyle = {
			display: "inline-block",
			width: "20%",
			fontSize: "16px",
			fontFamily: "Times New Roman",
			fontWeight: "bold",
			verticalAlign: "top",
			marginRight: "2%",
			marginTop: "4px"
		};
		return (
			<div style={containerStyle}>
				<Header />
				<main style={containerMainStyle}>
					<section style={mainSectionStyle}>
						<header style={sectionHeaderStyle}>
							<img style={headerIconStyle} alt="Basic-info" src="/img/icon/glyphicons-basic.png" />
							<h4 style={headerContentStyle}>Basic Information</h4>
						</header>
						<div style={sectionProfileStyle}>
							<Updateprofile src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.png"} width="200" saveProfile={this.saveProfile.bind(this)} />
						</div>
						<div style={sectionProfileStyle}>
							<div style={profileInfoStyle}>
								<label style={infoLabelStyle} htmlFor="pet-name">
									Name
								</label>
								<Inputbox id="pet-name" content={this.props.pet.pet_name} max="10" width="78%" />
							</div>
							<div style={profileInfoStyle}>
								<label style={infoLabelStyle} htmlFor="pet-name">
									Name
								</label>
								<Inputbox id="pet-name" content={this.props.pet.pet_name} max="10" width="78%" />
							</div>
							<div style={profileInfoStyle}>
								<Getlocation center={[-79.4292782, 43.8641138]} saveLocation={this.saveLocation.bind(this)} />
							</div>
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
		ReactDOM.render(<EditPet pet={result} />, document.getElementById("root"));
	}
});