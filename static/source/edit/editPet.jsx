import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Updateprofile from "../snippet/button/Updateprofile";
import Delmember from "../snippet/button/Delmember";
import Getlocation from "../snippet/display/Getlocation";
import Inputbox from "../snippet/input/Inputbox";
import noGetNature from "../../js/noGetNature.js";
import Header from "../general/Header";
import Footer from "../general/Footer";
class EditPet extends Component {
	constructor(props) {
        super(props);
		this.state = {
            petName: this.props.pet.pet_name,
			companionFirst: this.props.pet.companion_first,
			companionSecond: this.props.pet.companion_second,
			//If show the popup box for all pets
			showTeam: false,
			//store all friends info
			friend: null,
			prevFirst:null,
			prevSecond:null
		};
	}
	//Update profile
	saveProfile(newUrl) {
		let fileData = new FormData();
    	fileData.append("file", newUrl, "0.png");
		reqwest({
        	url: "/edit/pet/updateProfile",
        	method: "POST",
         	data: fileData,
        	contentType: false,
        	processData: false,
			success: function(result) {
				if (result.Result === 1 && result.Result === 2 && result.Result === 3 && result.Result === 4) {
					console.log("Something Wrong");
				} else {
					console.log("Success");
				}
			},
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//Update new location
	saveLocation(coordinate) {
		reqwest({
			url: "/edit/pet/updateLocation",
			type: "json",
			method: "POST",
			contentType: "application/json",
			headers: {"X-My-Custom-Header": "SomethingImportant"},
			data: JSON.stringify({"location": coordinate}),
			success: function(result) {
				if (result.Result === 0) {
					console.log("Success");
				} else {
					console.log("Something Wrong");
				}
			},
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//Update pet name
	saveName() {
		let petName = this.refs.petName.state.content;
		//Update only when name changed
		if (petName != this.state.petName) {
			reqwest({
				url: "/edit/pet/updateName",
				method: "POST",
				data: {"name": petName},
				success: function(result) {
					if (result.Result === 0) {
						console.log("Success");
						//Update name in record
						this.setState({petName: petName});
					} else {
						console.log("Something Wrong");
					}
				}.bind(this),
				error: function (err) {
					console.log("Something Wrong");
				}
			});
		}
	}
	//Remove a team member
	delTeam(index) {
		reqwest({
			url: "/edit/pet/delTeam",
			method: "POST",
			data: {"index": index},
			success: function(result) {
				if (result.Result === 0) {
					if (index === 0) {
						this.setState({companionFirst: null})
					} else {
						this.setState({companionSecond: null})
					}
					console.log("Success");
				} else {
					console.log("Something Wrong");
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//Show popbox for all friends pet
	searchTeam() {
		reqwest({
			url: "/edit/pet/searchTeam",
			method: "POST",
			success: function(result) {
				if (result.Result === 1) {
					console.log("Something Wrong");
				} else if (result.Result === 2) {
					this.setState({friend: [], showTeam: true, prevFirst: this.state.companionFirst, prevSecond: this.state.companionSecond});
				} else {
					this.setState({friend: result, showTeam: true, prevFirst: this.state.companionFirst, prevSecond: this.state.companionSecond});
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//Choose one friend as companion
	chooseTeam(index) {
		if (this.state.friend[index].pet_id != this.state.companionFirst && this.state.friend[index].pet_id != this.state.companionSecond ) {
			if (!this.state.companionFirst) {
				this.setState({companionFirst: this.state.friend[index].pet_id});
			} else if (!this.state.companionSecond) {
				this.setState({companionSecond: this.state.friend[index].pet_id});
			}
		} else if (this.state.friend[index].pet_id == this.state.companionFirst) {
			this.setState({companionFirst: null});
		} else if (this.state.friend[index].pet_id == this.state.companionSecond) {
			this.setState({companionSecond: null});
		}
	}
	//Close popbox for choose team
	closeTeam() {
		//Only update when change made
		if (this.state.prevFirst != this.state.companionFirst || this.state.prevSecond != this.state.companionFirst) {
			reqwest({
				url: "/edit/pet/updateTeam",
				method: "POST",
				data: {"first": this.state.companionFirst, "second": this.state.companionSecond},
				success: function(result) {
					if (result.Result === 1) {
						console.log("Something Wrong");
						this.setState({companionFirst: prevFirst, companionSecond: prevSecond});
					} else {
						console.log("Success");
						this.setState({showTeam: false});
					}
				}.bind(this),
				error: function (err) {
					console.log("Something Wrong");
					this.setState({companionFirst: prevFirst, companionSecond: prevSecond});
				}
			});
		} else {
			this.setState({showTeam: false});
		}
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
			paddingTop: "120px",
		};
		let mainSectionStyle = {
			display: "inline-block",
			verticalAlign: "top",
			width: "240px",
			marginRight: "30px",
			marginBottom: "20px",
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
			padding: "18px 18px 35px 20px"
		};
		let rightGroupStyle = {
			display: "block",
			verticalAlign: "middle",
			marginTop: "15px",
			marginBottom: "15px",
			padding: "0 5%",
			width: "90%"
		};
		let nameLabelStyle = {
			display: "inline-block",
			verticalAlign: "top",
			color: "#ef8513",
			fontSize: "14px",
			fontWeight: "bold"
		};
		let nameFontStyle = {
			float: "right",
            verticalAlign: "middle",
			marginTop: "10px",
            marginLeft: "2px",
            fontSize: "12px",
            fontFamily: "'Rubik', sans-serif",
            margin: "0 5px",
            color: "black",
            cursor: "pointer",
			border: "1px solid #052456",
			backgroundColor: "white",
            borderRadius: "3px",
			outline: "none",
        };
		let groupTitleStyle = {
			display: "block",
			color: "#ef8513",
			fontWeight: "bold",
			marginBottom: "9px"
		};
		let groupIconStyle = {
			display: "inline-block",
			verticalAlign: "middle",
			heigt: "20px",
			width: "20px",
			padding: "28px",
			marginLeft: "10px",
			border: "1px dashed #052456",
			borderRadius: "10px",
			cursor: "pointer"
		};
		let containerPopStyle = {
			position: "fixed",
			top: "50px",
			width: "100%",
			height: "100%",
			backgroundColor: "white",
			opacity: "0.95"
		};
		let popTeamStyle = {
			position: "absolute",
			width: "55%",
			top: "100px",
			marginLeft: "20%",
			backgroundColor: "#f7d7b4",
			zIndex: "5",
			borderRadius: "8px",
			height: "380px",
			overflowY: "scroll",
			paddingLeft: "15px",
			paddingRight: "15px",
			paddingBottom: "10px",
			textAlign: "center"
		};
		let teamActionStyle = {
			display: "block",
			width: "auto",
			height: "35px",
			lineHeight: "35px",
			verticalAlign: "middle",
			backgroundColor: "#ef8513",
			borderRadius: "2px",
			marginLeft: "-15px",
			marginRight: "-15px",
			marginBottom: "15px"
		};
		let actionChooseStyle = {
			float: "left",
			marginLeft: "3%",
			borderRadius: "5px",
			verticalAlign: "middle",
			color: "white"
		};
		let actionCloseStyle = {
			float: "right",
			verticalAlign: "middle",
			marginRight: "3%",
			color: "white",
			cursor: "pointer",
			fontWeight: "bold"
		};
		let teamSingleStyle = {
			display: "inline-block",
			backgroundColor: "#f7f9fc",
			verticalAlign: "top",
			margin: "10px 5px",
			borderRadius: "8px",
			padding: "10px 3%",
			textAlign: "center",
			cursor: "pointer"
		};
		let singleFriendStyle = {
			display: "inline-block",
			width: "50px",
			height: "50px",
			borderRadius: "25px",
		};
		let singleNameStyle = {
			display: "block",
			fontWeight: "bold",
			margin: "10px 0"
		};
		let singleNatureStyle = {
			display: "block",
			margin: "10px 0",
			color: "#052456"
		};
		let groupOwnerStyle = {
			display: "inline-block",
			color: "white",
			backgroundColor: "red",
			padding: "3px 3px",
			borderRadius: "3px",
			cursor: "pointer"
		};
		//Display first companion when exist
		let firstCompanion;
		if (this.state.companionFirst) {
			firstCompanion = (<Delmember profile={"/img/pet/" + this.state.companionFirst + "/cover/0.png"} index={0} clickDel={this.delTeam.bind(this)} width="80" height="80" fontFamily="'Rubik', sans-serif" />);
		} else {
			firstCompanion = (<img style={groupIconStyle} alt="add-companion1" src="/img/icon/glyphicons-add.png" onClick={this.searchTeam.bind(this)} />);
		}
		//Display second companion when exist
		let secondCompanion;
		if (this.state.companionSecond) {
			secondCompanion = (<Delmember profile={"/img/pet/" + this.state.companionSecond + "/cover/0.png"} index={1} clickDel={this.delTeam.bind(this)} width="80" height="80" fontFamily="'Rubik', sans-serif" />);
		} else {
			secondCompanion = (<img style={groupIconStyle} alt="add-companion2" src="/img/icon/glyphicons-add.png" onClick={this.searchTeam.bind(this)} />);
		}
		let popContainer;
		let popTeam;
		let popFriend;
		let popFirst;
		let popSecond;
		//Popup box show all pet friends
		if (this.state.showTeam) {
			popContainer = (<div style={containerPopStyle}></div>);
			if (this.state.companionFirst) {
				let fname;
				for (let i = 0; i < this.state.friend.length; i++) {
					if (this.state.friend[i].pet_id == this.state.companionFirst) {
						fname = this.state.friend[i].pet_name;
					}
				}
				popFirst = (<h5 style={actionChooseStyle}>{"➲ " + fname}</h5>);
			}
			if (this.state.companionSecond) {
				let sname;
				for (let i = 0; i < this.state.friend.length; i++) {
					if (this.state.friend[i].pet_id == this.state.companionSecond) {
						sname = this.state.friend[i].pet_name;
					}
				}
				popSecond = (<h5 style={actionChooseStyle}>{"➲ " + sname}</h5>)
			}
			popFriend = this.state.friend.map((friend, index) =>
				<div key={"petfriends" + index} style={teamSingleStyle} onClick={this.chooseTeam.bind(this, index)}>
					<img style={singleFriendStyle} alt={friend.pet_name} src={"/img/pet/" + friend.pet_id + "/cover/0.png"} />
					<h5 style={singleNameStyle}>{friend.pet_name}</h5>
					<h6 style={singleNatureStyle}>{"I'm " + noGetNature(friend.pet_nature)}</h6>
					<h6 style={singleNatureStyle}>{"Ability: " + friend.pet_ability}</h6>
				</div>
			);
			popTeam = (
				<section style={popTeamStyle}>
					<div style={teamActionStyle}>
						{popFirst}
						{popSecond}
						{/*Close popbox when click x*/}
						<h5 style={actionCloseStyle} onClick={this.closeTeam.bind(this)}>✗</h5>
					</div>
					{popFriend}
				</section>
			);
		}
		let ownership;
		let ownerAction;
		let transferAction;
		if (this.props.userId === this.props.pet.owner_id) {
			ownership = "You are the owner:";
			if (this.props.pet.relative_id) {
				ownerAction = (<h6 style={groupOwnerStyle}>Request delete relative</h6>);
				transferAction = (<h6 style={groupOwnerStyle}>Transfer ownership</h6>);
			} else {
				ownerAction = (<h6 style={groupOwnerStyle}>Add relative</h6>);
			}
		} else {
			ownership = "You are the relative:";
			ownerAction =(<h6 style={groupOwnerStyle}>End relation</h6>);
		}
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
							<Getlocation center={[this.props.pet.location_lon, this.props.pet.location_lat]} zoom="10" setZoom="10" saveLocation={this.saveLocation.bind(this)} fontFamily="'Rubik', sans-serif" />
						</div>
					</section>
					<section style={mainSectionStyle}>
						<header style={sectionHeaderStyle}>
							<h4 style={headerContentStyle}>Update Group</h4>
						</header>
						<div style={rightGroupStyle}>
							<label style={nameLabelStyle} htmlFor="pet-name">Pet Name:</label>
							<input type="button" style={nameFontStyle} value="Save" onClick={this.saveName.bind(this)} />
							<Inputbox id="pet-name" ref="petName" content={this.state.petName} max="10" width="100%" fontFamily="'Rubik', sans-serif" />
						</div>
						<div style={rightGroupStyle}>
							<h5 style={groupTitleStyle}>Build Team:</h5>
							{firstCompanion}
							{secondCompanion}
						</div>
						<div style={rightGroupStyle}>
							<h5 style={groupTitleStyle}>{ownership}</h5>
							{ownerAction}
							{transferAction}
						</div>
					</section>
				</main>
				<Footer />
				{popContainer}
				{popTeam}
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
		if (result.Result === 1) {
			console.log("Something Wrong");
		} else if (result.Result === 2) {
			console.log("Pet not belong to you or not exist");
		} else {
			ReactDOM.render(<EditPet pet={result[0]} userId={result[1]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Something Wrong");
	}
});