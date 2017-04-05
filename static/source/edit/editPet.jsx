import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Updateprofile from "../snippet/button/Updateprofile";
import Delmember from "../snippet/button/Delmember";
import Confirmdel from "../snippet/button/Confirmdel";
import Selectbox from "../snippet/box/Selectbox";
import Getlocation from "../snippet/display/Getlocation";
import Inputbox from "../snippet/input/Inputbox";
import noGetAbility from "../../js/noGetAbility.js";
import noGetSkillTitle from "../../js/noGetSkillTitle.js";
import Header from "../general/Header";
import Footer from "../general/Footer";
class EditPet extends Component {
	constructor(props) {
        super(props);
		this.state = {
            petName: this.props.pet.pet_name,
			companionFirst: this.props.pet.companion_first,
			companionSecond: this.props.pet.companion_second,
			//store already exist companion
			companionIndex: [],
			//If show the popup box for all pets
			showTeam: false,
			//store all friends info
			friend: null,
			//if show end relation pop box
			showEnd: false,
			//if show del relative pop box
			showDel: false,
			//for add and del update relative id
			relative: this.props.pet.relative_id || null,
			//if show add relative pop box
			showAdd: false,
			//store all relative options
			relOption: null,
			//if show transfer ownership or not
			showTrans: false,
			//store trans relative info
			transRelative: null,
			//store owner id
			owner_id: this.props.pet.owner_id,
			//store all pet skill names 
			skills: [this.props.pet.skillone_name, this.props.pet.skilltwo_name, this.props.pet.skillthree_name, this.props.pet.skillfour_name],
			//indicate update skillname error
			skillError: [0,0,0,0],
			//indicate update name error
			nameError: false
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
				if (result.Result === 0) {
					console.log("File not exist");
				} else if (result.Result === 1) {
					console.log("Wrong File Name");
				} else if (result.Result === 3) {
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
	//update skill images
	savePic(num, url) {
		let fileData = new FormData();
		let name = (num + 1) + ".jpg";
    	fileData.append("file", url, name);
		reqwest({
        	url: "/edit/pet/updatePic",
        	method: "POST",
         	data: fileData,
        	contentType: false,
        	processData: false,
			success: function(result) {
				if (result.Result === 0) {
					console.log("Not your pet, or pet not exist");
				} else if (result.Result === 1) {
					console.log("File not exist");
				} else if (result.Result === 2) {
					console.log("File name is not correct");
				} else if (result.Result === 3) {
					console.log("Success");
				} else if (result.Result === 4) {
					console.log("Something Wrong");
				} else if (result.Result === 5) {
					console.log("File type not supported");
				}
			},
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//init skill images for the first time
	initPic(num, url) {
		let fileData = new FormData();
		let name = (num + 1) + ".jpg";
    	fileData.append("file", url, name);
		reqwest({
        	url: "/edit/pet/initPic/" + num,
        	method: "POST",
         	data: fileData,
        	contentType: false,
        	processData: false,
			success: function(result) {
				if (result.Result === 0) {
					console.log("Not your pet, or pet not exist");
				} else if (result.Result === 1) {
					console.log("File not exist");
				} else if (result.Result === 2) {
					console.log("File name is not correct");
				} else if (result.Result === 3) {
					let skills = this.state.skills;
					skills[num] = "Unknow Skill";
					this.setState({skills: skills});
					//this.refs["petSkill" + num].setState({content: "Unknow Skill"});
					console.log("Success");
				} else if (result.Result === 4) {
					console.log("Something Wrong");
				} else if (result.Result === 5) {
					console.log("File type not supported");
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//Update new location
	saveLocation(coordinate) {
		//Update only when coordinate changed
		if (this.props.pet.location_lon != coordinate[0] || this.props.pet.location_lat != coordinate[1]) {
			reqwest({
				url: "/edit/pet/updateLocation",
				type: "json",
				method: "POST",
				contentType: "application/json",
				headers: {"X-My-Custom-Header": "SomethingImportant"},
				data: JSON.stringify({"location": coordinate}),
				success: function(result) {
					if (result.Result === 0) {
						console.log("Something Wrong");
					} else if (result.Result === 1) {
						console.log("Success!");
					}
				},
				error: function (err) {
					console.log("Something Wrong");
				}
			});
		}
	}
	//Save skill name
	saveSkill(num) {
		let petSkill = this.refs["petSkill" + num].state.content.trim();
		//update only when name changes, names large than 0, names exist before
		if (petSkill != this.state.skills[num]) {
			//only update when character exist
			if (petSkill.length > 0) {
				reqwest({
					url: "/edit/pet/updateSkill",
					method: "POST",
					data: {"name": petSkill, "index": num},
					success: function(result) {
						if (result.Result === 0) {
							this.refs["petSkill" + num].setState({content: this.state.skills[num]});
							console.log("Not your pet or pet not exist");
						} else if (result.Result === 1) {
							console.log("Success");
							let skills = this.state.skills;
							skills[num] = petSkill;
							//Update name in record, reset error message
							this.setState({skills: skills, skillError: [0, 0, 0, 0]});
						} else if (result.Result === 2) {
							this.refs["petSkill" + num].setState({content: this.state.skills[num]});
							console.log("Something Wrong");
						}
					}.bind(this),
					error: function (err) {
						this.refs["petSkill" + num].setState({content: this.state.skills[num]});
						console.log("Something Wrong");
					}.bind(this)
				});
			} else {
				let error = this.state.skillError;
				error[num] = 1;
				//show error message
				this.setState({skillError: error});
				//roll back empty input
				this.refs["petSkill" + num].setState({content: this.state.skills[num]});
			}
		}
	}
	//Save pet name
	saveName() {
		let petName = this.refs.petName.state.content.trim();
		//Update only when name changed
		if (petName != this.state.petName) {
			//update only when name is not empty
			if (petName.length > 0) {
				reqwest({
					url: "/edit/pet/updateName",
					method: "POST",
					data: {"name": petName},
					success: function(result) {
						if (result.Result === 0) {
							this.refs.petName.setState({content: this.state.petName});
							console.log("Not your pet or pet not exist");
						} else if (result.Result === 1) {
							console.log("Success");
							//Update name in record
							this.setState({petName: petName});
						} else if (result.Result === 2) {
							this.refs.petName.setState({content: this.state.petName});
							console.log("Something Wrong");
						}
					}.bind(this),
					error: function (err) {
						this.refs.petName.setState({content: this.state.petName});
						console.log("Something Wrong");
					}.bind(this)
				});
			} else {
				//roll back name
				this.refs.petName.setState({content: this.state.petName});
				//show error
				this.setState({nameError: true});
			}
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
				if (result.Result === 0) {
					console.log("Something Wrong0");
				} else if (result.Result === 1) {
					console.log("Something Wrong1");
				} else if (result.Result === 2) {
					this.setState({friend: [], companionIndex: [], showTeam: true});
				} else {
					let refine = [];
					let index = [];
					for (let i = 0; i <result.length; i++) {
						refine[i] = [];
						refine[i][0] = result[i].pet_name;
						refine[i][1] = "/img/pet/" + result[i].pet_id + "/cover/0.png";
						refine[i][2] = "Ability: " + result[i].pet_ability;
						refine[i][3] = result[i].pet_id;
						if (result[i].pet_id == this.state.companionFirst || result[i].pet_id == this.state.companionSecond) {
							index.push(i);
						}
					}
					this.setState({friend: refine, companionIndex: index, showTeam: true});
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong3");
			}
		});
	}
	//Close popbox for choose team
	closeTeam(callback, changed) {
		//Only update when change made
		if (changed) {
			let first, second;
			if (callback.length > 0) {
				first = this.state.friend[callback[0]][3];
			}
			if (callback.length > 1) {
				second = this.state.friend[callback[1]][3];
			}
			reqwest({
				url: "/edit/pet/updateTeam",
				method: "POST",
				data: {"first": first, "second": second},
				success: function(result) {
					if (result.Result === 1) {
						console.log("Something Wrong");
					} else {
						console.log("Success");
						this.setState({companionFirst: first, companionSecond: second, companionIndex: [first, second]});
					}
				}.bind(this),
				error: function (err) {
					console.log("Something Wrong");
				}
			});
		}
		this.setState({showTeam: false});
	}
	//open confirm end relationship box
	endRelation() {
		this.setState({showEnd: true});
	}
	//close end relationship box
	closeEnd() {
		this.setState({showEnd: false});
	}
	//confirmed end relationship
	confirmEnd() {
		reqwest({
			url: "/edit/pet/endRelation",
			method: "POST",
			success: function(result) {
				if (result.Result === 0) {
					console.log("Something Wrong");
				} else if (result.Result === 1) {
					window.location.replace("/user/" + this.props.userId);
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//Open delete a relative box
	delRelative() {
		this.setState({showDel: true});
	}
	//Close delete a relative box
	closeDel() {
		this.setState({showDel: false});
	}
	//confirm delete a relative
	confirmDel() {
		reqwest({
			url: "/edit/pet/delRelative",
			method: "POST",
			success: function(result) {
				if (result.Result === 0) {
					console.log("Something Wrong");
				} else {
					this.setState({relative: null, showDel: false});
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//open add relative box
	addRelative() {
		reqwest({
			url: "/edit/pet/searchRelative",
			method: "POST",
			success: function(result) {
				if (result.Result === 0) {
					console.log("Something Wrong");
				} else {
					let refine = [];
					for (let i = 0; i < result.Result.length; i++) {
						refine[i] = [];
						refine[i][0] = result.Result[i].user_name;
						refine[i][1] = "/img/user/" + result.Result[i].user_id + ".jpg";
						refine[i][2] = "Pets + 10% " + noGetAbility(result.Result[i].user_aura);
						refine[i][3] = result.Result[i].user_id;
					}
					this.setState({showAdd: true, relOption: refine});
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//close add relative box
	closeAdd(result, changed) {
		//Only update when change made
		if (changed && result) {
			let choice = this.state.relOption[result[0]][3];
			reqwest({
				url: "/edit/pet/addRelative",
				method: "POST",
				data: {"choice": choice},
				success: function(result) {
					if (result.Result === 0) {
						console.log("Something Wrong");
					} else {
						console.log("Success");
						this.setState({relative: choice});
					}
				}.bind(this),
				error: function (err) {
					console.log("Something Wrong");
				}
			});
		}
		this.setState({showAdd: false});
	}
	//show trans owner pop box
	transOwner() {
		reqwest({
			url: "/edit/pet/showRelative",
			method: "POST",
			success: function(result) {
				if (result.Result === 0) {
					console.log("This pet doesn't belongs to you");
				} else if (result.Result === 1) {
					console.log("Relative not exist")
				} else {
					this.setState({showTrans: true, transRelative: result.Result});
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
	}
	//close show trans pop box
	closeTrans() {
		this.setState({showTrans: false});
	}
	//Confirm transfer ownership
	confirmTrans() {
		reqwest({
			url: "/edit/pet/transOwner",
			method: "POST",
			success: function(result) {
				if (result.Result === 0) {
					console.log("This pet doesn't belongs to you");
				} else if (result.Result === 1) {
					let relative = this.state.relative;
					//transfer owner and relative
					this.setState({showTrans: false, owner_id: relative, transRelative: null});
				}
			}.bind(this),
			error: function (err) {
				console.log("Something Wrong");
			}
		});
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
			paddingTop: "80px",
		};
		let mainSectionStyle = {
			display: "inline-block",
			verticalAlign: "top",
			width: "240px",
			marginRight: "25px",
			marginBottom: "60px",
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
		let namePositionStyle = {
			display: "block",
			height: "45px"
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
			zIndex: "5",
		};
		let popActionStyle = {
			position: "absolute",
			width: "45%",
			top: "150px",
			marginLeft: "25%",
			backgroundColor: "white",
			border: "1px solid black",
			zIndex: "5",
			borderRadius: "4px",
			height: "280px",
			paddingBottom: "10px",
			textAlign: "center"
		};
		let popTransStyle = {
			position: "absolute",
			width: "45%",
			top: "150px",
			marginLeft: "25%",
			backgroundColor: "white",
			border: "1px solid black",
			zIndex: "5",
			borderRadius: "4px",
			height: "320px",
			paddingBottom: "10px",
			textAlign: "center"
		};
		let actionTitleStyle = {
			display: "block",
			textAlign: "center",
			marginTop: "20px",
			fontWeight: "bold",
			marginBottom: "20px"
		};
		let actionWarnStyle = {
			display: "block",
			width: "100%",
			textAlign: "center",
			padding: "10px 0",
			backgroundColor: "#f9e84d",
			marginBottom: "10px"
		};
		let groupOwnerStyle = {
			display: "inline-block",
			color: "white",
			backgroundColor: "red",
			padding: "3px 3px",
			borderRadius: "3px",
			cursor: "pointer",
			marginRight: "2%"
		};
		let actionCloseStyle = {
			float: "right",
			verticalAlign: "middle",
			marginRight: "3%",
			color: "black",
			cursor: "pointer",
			fontWeight: "bold"
		};
		let actionProfileStyle = {
			display: "block",
			textAlign: "center",
			width: "50px",
			marginBottom: "15px",
			marginLeft: "45%",
			borderRadius: "25px"
		};
		let mainHeaderStyle = {
			display: "block",
			width: "100%",
			marginBottom: "60px",
			textAlign: "left"
		};
		let headerUserStyle = {
			display: "inline-block",
			verticalAlign: "middle",
			fontWeight: "bold",
			backgroundColor: "black",
			padding: "5px 2%",
			color: "white",
			borderRadius: "5px 0px 0px 5px"
		};
		let headerPetStyle = {
			display: "inline-block",
			verticalAlign: "middle",
			fontWeight: "bold",
			backgroundColor: "#ef8513",
			padding: "5px 2%",
			color: "white",
			borderRadius: "0px 5px 5px 0"
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
		let popAction;
		//Popup box show all pet friends
		if (this.state.showTeam) {
			popContainer = (<div style={containerPopStyle}></div>);
			popTeam = (
				<section style={popTeamStyle}>
					<Selectbox options={this.state.friend} max="2" decisions={this.state.companionIndex} closeBox={this.closeTeam.bind(this)} fontFamily="'Rubik', sans-serif" />
				</section>
			)
		}  
		//popup box show all friends as relative options
		else if (this.state.showAdd) {
			popContainer = (<div style={containerPopStyle}></div>);
			popTeam = (
				<section style={popTeamStyle}>
					<Selectbox options={this.state.relOption} closeBox={this.closeAdd.bind(this)} fontFamily="'Rubik', sans-serif" />
				</section>
			)
		}
		//pop box for end relation
		if (this.state.showEnd) {
			popContainer = (<div style={containerPopStyle}></div>);
			popAction = (
				<section style={popActionStyle}>
					<h5 style={actionCloseStyle} onClick={this.closeEnd.bind(this)}>✗</h5>
					<h4 style={actionTitleStyle}>Are you sure you want to end this relationship?</h4>
					<h5 style={actionWarnStyle}>Once you end the relationship, you won't be able to resume it yourself.</h5>
					<Confirmdel message="End Relationship" confirmDel={this.confirmEnd.bind(this)} fontFamily="'Rubik', sans-serif"/>
				</section>
			);
		} else if (this.state.showDel) {
			popContainer = (<div style={containerPopStyle}></div>);
			popAction = (
				<section style={popActionStyle}>
					<h5 style={actionCloseStyle} onClick={this.closeDel.bind(this)}>✗</h5>
					<h4 style={actionTitleStyle}>Are you sure you want to delete this relative?</h4>
					<h5 style={actionWarnStyle}>Once you delete a relative, he/she won't be able to resume it himself/herself.</h5>
					<Confirmdel message="Delete Relative" confirmDel={this.confirmDel.bind(this)} fontFamily="'Rubik', sans-serif"/>
				</section>
			);
		} else if (this.state.showTrans) {
			popContainer = (<div style={containerPopStyle}></div>);
			popAction = (
				<section style={popTransStyle}>
					<h5 style={actionCloseStyle} onClick={this.closeTrans.bind(this)}>✗</h5>
					<h4 style={actionTitleStyle}>Are you sure you want to transfer ownership to {this.state.transRelative.user_name}?</h4>
					<img style={actionProfileStyle} alt={this.state.transRelative.user_name} src={"/img/user/" + this.state.transRelative.user_id + ".jpg" }/>
					<h5 style={actionWarnStyle}>Once you transfer your ownership, you won't be able to resume it by yourself.</h5>
					<Confirmdel message="Transfer Ownership" confirmDel={this.confirmTrans.bind(this)} fontFamily="'Rubik', sans-serif"/>
				</section>
			);
		}
		let ownership;
		let ownerAction;
		let transferAction;
		if (this.props.userId === this.state.owner_id) {
			ownership = "You are the owner:";
			if (this.state.relative) {
				ownerAction = (<h6 style={groupOwnerStyle} onClick={this.delRelative.bind(this)}>Delete Relative</h6>);
				transferAction = (<h6 style={groupOwnerStyle} onClick={this.transOwner.bind(this)}>Transfer ownership</h6>);
			} else {
				ownerAction = (<h6 style={groupOwnerStyle} onClick={this.addRelative.bind(this)}>Add Relative</h6>);
			}
		} else {
			ownership = "You are the relative:";
			ownerAction =(
				<h6 style={groupOwnerStyle} onClick={this.endRelation.bind(this)}>End relation</h6>
			);
		}
		//display four skills
		let skills = [];
		for (let i = 0; i < 4; i++) {
			let skillName, skillButton, skillInput;
			if (this.state.skillError[i] === 1 && this.state.skills[i] ) {
				skillName = "Name can't be empty";
				skillButton = (
					<input type="button" style={nameFontStyle} value="Save" onClick={this.saveSkill.bind(this, i)} />
				);
				skillInput = <Inputbox id={"pet-skill-" + i} ref={"petSkill" + i} content={this.state.skills[i]?this.state.skills[i]:""} max="16" width="100%" fontFamily="'Rubik', sans-serif" />
			} else if (!this.state.skills[i]) {
				//hide update name button when skill not init
				skillName = "Please Upload Skill Image First";
				skillButton = (
					<div style={namePositionStyle}></div>
				)
			} else {
				skillName = "Skill Name";
				skillButton = (
					<input type="button" style={nameFontStyle} value="Save" onClick={this.saveSkill.bind(this, i)} />
				);
				skillInput = <Inputbox id={"pet-skill-" + i} ref={"petSkill" + i} content={this.state.skills[i]?this.state.skills[i]:""} max="16" width="100%" fontFamily="'Rubik', sans-serif" />
			}
			skills[i] = (
				<section key={"petskill" + i} style={mainSectionStyle}>
					<header style={sectionHeaderStyle}>
						<h4 style={headerContentStyle}>Update {noGetSkillTitle(i)} Skill</h4>
					</header>
					<div style={rightGroupStyle}>
						<label style={nameLabelStyle} htmlFor={"pet-skill-" + i}>
							{skillName}
						</label>
						{skillButton}
						{skillInput}
					</div>
					<Updateprofile alt={"pet skills " + i} src={this.state.skills[i]?"/img/pet/" + this.props.pet.pet_id + "/cover/" + (i + 1) + ".jpg":"/img/icon/skill.jpg"} width="104" format="image/jpg" saveProfile={this.state.skills[i]?this.savePic.bind(this, i):this.initPic.bind(this, i)} fontFamily="'Rubik', sans-serif" />
				</section>
			)
		}
		let petName;
		if (this.state.nameError) {
			petName = "Name can't be empty";
		} else {
			petName = "Pet Name:";
		}
		return (
			<div style={containerStyle}>
				<Header />
				<main style={containerMainStyle}>
					<section style={mainHeaderStyle}>
						<h4 style={headerUserStyle}><a href={"/user/" + this.props.userId}>« Back to digital home</a></h4>
						<h4 style={headerPetStyle}><a href={"/pet/" + this.props.pet.pet_id}>Back to pet hub »</a></h4>
					</section>
					<section style={mainSectionStyle}>
						<header style={sectionHeaderStyle}>
							<h4 style={headerContentStyle}>Update Group</h4>
						</header>
						<div style={rightGroupStyle}>
							<label style={nameLabelStyle} htmlFor="pet-name">{petName}</label>
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
							<Getlocation center={[this.props.pet.location_lon, this.props.pet.location_lat]} zoom="2" setZoom="2" saveLocation={this.saveLocation.bind(this)} fontFamily="'Rubik', sans-serif" />
						</div>
					</section>
					{skills}
				</main>
				<Footer />
				{popContainer}
				{popTeam}
				{popAction}
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
		if (result.Result === 0) {
			console.log("Something Wrong");
		} else if (result.Result === 1) {
			console.log("Pet not belong to you or not exist");
		} else {
			ReactDOM.render(<EditPet pet={result[0]} userId={result[1]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Something Wrong");
	}
});