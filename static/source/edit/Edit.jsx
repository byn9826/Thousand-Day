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
class Edit extends Component {
	constructor(props) {
        super(props);
		this.state = {
			//store pet name
            petName: this.props.pet.pet_name,
			//indicate update name label
			nameLabel: "Pet Name",
			//store first companion id
			companionFirst: this.props.pet.companion_first,
			//store second companion id
			companionSecond: this.props.pet.companion_second,
			//store all friends info
			friend: null,
			//store already exist companion
			companionIndex: [],
			//If show the popup box for all pets
			showTeam: false,
			//for add and del update relative id
			relative: this.props.pet.relative_id || null,
			//if show del relative pop box
			showDel: false,
			//if show add relative pop box
			showAdd: false,
			//store all relative options
			relOption: null,
			//store owner id
			ownerId: this.props.pet.owner_id,
			//if show transfer ownership or not
			showTrans: false,
			//store trans relative user info
			transRelative: null,
			//if show end relation pop box
			showEnd: false,
			//store all pet skill names 
			skills: [this.props.pet.skillone_name, this.props.pet.skilltwo_name, this.props.pet.skillthree_name, this.props.pet.skillfour_name],
			//indicate update skillname error
			skillError: [0, 0, 0, 0],
		};
	}
	logOut() {
		window.location.replace("/pet/" + this.props.pet.pet_id);
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
						switch (result) {
							case "0":
								this.refs.petName.setState({content: this.state.petName});
								console.log("Not your pet");
								break;
							case "1":
								console.log("Success");
								//Update name in record
								this.setState({petName: petName});
								break;
							case "2":
								this.refs.petName.setState({content: this.state.petName});
								console.log("Can't connect to db");
								break;
							case "3":
								this.refs.petName.setState({content: this.state.petName});
								console.log("Name can't be empty");
								break;
						}
					}.bind(this),
					error: function (err) {
						this.refs.petName.setState({content: this.state.petName});
						console.log("can't connect to server");
					}.bind(this)
				});
			} else {
				//roll back name
				this.refs.petName.setState({content: this.state.petName});
				//show error
				this.setState({nameLabel: "Name can't be empty"});
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
				switch(result) {
					case "0":
						console.log("Not your pet");
						break;
					case "1":
						if (index === 0) {
							this.setState({companionFirst: null})
						} else {
							this.setState({companionSecond: null})
						}
						break;
					case "2":
						console.log("Can't connect to db");
						break;
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to server");
			}
		});
	}
	//Show popbox for all friends pet
	searchTeam() {
		reqwest({
			url: "/edit/pet/searchTeam",
			method: "POST",
			success: function(result) {
				switch (result) {
					case "0":
						console.log("Please login");
						break;
					case "1":
						console.log("Can't connect to db");
						break;
					default:
						if (result.length > 0) {
							let refine = [], index = [];
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
						} else {
							this.setState({friend: [], companionIndex: [], showTeam: true});
						}
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to server");
			}
		});
	}
	//Close popbox for choose companion
	closeTeam(callback, changed) {
		//Only update when change made
		if (changed) {
			let first = null, second = null;
			//if first companion chosed
			if (callback.length > 0) {
				first = this.state.friend[callback[0]][3];
			}
			//if second companion chosed
			if (callback.length > 1) {
				second = this.state.friend[callback[1]][3];
			}
			reqwest({
				url: "/edit/pet/updateTeam",
				method: "POST",
				data: {"first": first, "second": second},
				success: function(result) {
					switch (result) {
						case "0":
							console.log("Please login first");
							break;
						case "1":
							console.log("Can't connect to db");
							break;
						case "2":
							this.setState({companionFirst: first, companionSecond: second, companionIndex: [first, second]});
							break;
					}
				}.bind(this),
				error: function (err) {
					console.log("Can't connect to server");
				}
			});
		}
		this.setState({showTeam: false});
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
				switch (result) {
					case "0":
						console.log("Please login");
						break;
					case "1":
						//empty relative id, close pop box
						this.setState({relative: null, showDel: false});
						break;
					case "2":
						console.log("DB error");
						break;
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to server");
			}
		});
	}
	//open add relative box, search friend
	addRelative() {
		reqwest({
			url: "/edit/pet/searchRelative",
			method: "POST",
			success: function(result) {
				switch (result) {
					case "0":
						console.log("Not your pet");
						break;
					case "1":
						console.log("Db error");
						break;
					default:
						//reproduce info for friends select
						let refine = [];
						for (let i = 0; i < result.length; i++) {
							refine[i] = [];
							refine[i][0] = result[i].user_name;
							refine[i][1] = "/img/user/" + result[i].user_id + ".jpg";
							refine[i][2] = result[i].user_aura?"Pets + 10% " + noGetAbility(result[i].user_aura):"No Aura Selected";
							refine[i][3] = result[i].user_id;
						}
						this.setState({showAdd: true, relOption: refine});
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to server");
			}
		});
	}
	//close add relative box, update db
	closeAdd(result, changed) {
		//Only update when change made
		if (changed && result && this.state.relOption[result[0]]) {
			//get relative id
			let choice = this.state.relOption[result[0]][3];
			reqwest({
				url: "/edit/pet/addRelative",
				method: "POST",
				data: {"choice": choice},
				success: function(result) {
					switch (result) {
						case "0":
							console.log("Not your pet");
							break;
						case "1":
							console.log("DB error");
							break;
						case "2":
							//success update relative id
							this.setState({relative: choice});
							break;
					}
				}.bind(this),
				error: function (err) {
					console.log("Can't connect to server");
				}
			});
		}
		//close box
		this.setState({showAdd: false});
	}
	//show trans owner pop box, and show relative info
	transOwner() {
		reqwest({
			url: "/edit/pet/showRelative",
			method: "POST",
			success: function(result) {
				switch (result) {
					case '0':
						console.log("Not your pet");
						break;
					case "1":
						console.log("DB error");
						break;
					default:
						//show pop box of transfer relative
						this.setState({showTrans: true, transRelative: result});
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect with server");
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
				switch (result) {
					case "0":
						console.log("There's no relative");
						break;
					case "1":
						//change owner id, close pop box, clear relative info
						let relative = this.state.relative;
						this.setState({showTrans: false, ownerId: relative, transRelative: null});
						break;
					case "2":
						console.log("DB error");
						break;
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to server");
			}
		});
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
				switch (result) {
					case "0":
						console.log("Not your pet");
						break;
					case "1":
						//redirct to user's home page
						window.location.replace("/user/" + this.props.userId);
						break;
					case "2":
						console.log("DB error");
						break;
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to server");
			}
		});
	}
	//Update pet's profile
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
				switch (result) {
					case "0":
						console.log("Not your pet");
						break;
					case "1":
						console.log("File not support");
						break;
					case "2":
						console.log("Success");
						break;
					case "3":
						console.log("Fail, try later");
						break;
				}
			},
			error: function (err) {
				console.log("Can't connect to server");
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
					console.log(result);
					console.log(typeof(result));
					switch (result) {
						case 0:
							console.log("Not your pet");
							break;
						case 1:
							console.log("Success");
							break;
						case 2:
							console.log("Db error");
							break;
					}
				},
				error: function (err) {
					console.log("Can't connect to server");
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
						switch (result) {
							case "0":
								console.log("Not your pet");
								//roll back
								this.refs["petSkill" + num].setState({content: this.state.skills[num]});
								break;
							case "1":
								console.log("Name can't be empty");
								this.refs["petSkill" + num].setState({content: this.state.skills[num]});
								break;
							case "2":
								let skills = this.state.skills;
								skills[num] = petSkill;
								//Update name in record, reset error message
								this.setState({skills: skills, skillError: [0, 0, 0, 0]});
								break;
							case "3":
								console.log("Db error");
								this.refs["petSkill" + num].setState({content: this.state.skills[num]});
								break;
						}
					}.bind(this),
					error: function (err) {
						this.refs["petSkill" + num].setState({content: this.state.skills[num]});
						console.log("Something Wrong");
					}.bind(this)
				});
			} else {
				//error code 1 for name empty
				let error = this.state.skillError;
				error[num] = 1;
				//show error message
				this.setState({skillError: error});
				//roll back empty input
				this.refs["petSkill" + num].setState({content: this.state.skills[num]});
			}
		}
	}
	//update skill images when skill already inited
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
				switch (result) {
					case "0":
						console.log("Not your pet");
						break;
					case "1":
						console.log("File Type not support");
						break;
					case "2":
						console.log("Success");
						break;
					case "3":
						console.log("Can't save file");
						break;
				}
			},
			error: function (err) {
				console.log("Can't connect to server");
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
				switch (result) {
					case "0":
						console.log("Not your pet");
						break;
					case "1":
						console.log("File Type not support");
						break;
					case "2":
						console.log("Success");
						//update skills
						let skills = this.state.skills;
						skills[num] = "Unknow Skill";
						this.setState({skills: skills});
						//this.refs["petSkill" + num].setState({content: "Unknow Skill"});
						break;
					case "3":
						console.log("Can't save skill");
						break;
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to server");
			}
		});
	}
	render() {
		//Display first companion when exist
		let firstCompanion;
		if (this.state.companionFirst) {
			firstCompanion = (<Delmember profile={"/img/pet/" + this.state.companionFirst + "/cover/0.png"} index={0} clickDel={this.delTeam.bind(this)} width="80" height="80" fontFamily="'Rubik', sans-serif" />);
		} else {
			firstCompanion = (<img className="main-section-group-companion" alt="add-companion1" src="/img/icon/glyphicons-add.png" onClick={this.searchTeam.bind(this)} />);
		}
		//Display second companion when exist
		let secondCompanion;
		if (this.state.companionSecond) {
			secondCompanion = (<Delmember profile={"/img/pet/" + this.state.companionSecond + "/cover/0.png"} index={1} clickDel={this.delTeam.bind(this)} width="80" height="80" fontFamily="'Rubik', sans-serif" />);
		} else {
			secondCompanion = (<img className="main-section-group-companion" alt="add-companion2" src="/img/icon/glyphicons-add.png" onClick={this.searchTeam.bind(this)} />);
		}
		//store pop up background
		let popContainer;
		//store pop up team select box
		let popTeam;
		//Popup box show all pet friends for choose companion
		if (this.state.showTeam) {
			popContainer = (<div className="pop-back"></div>);
			popTeam = (
				<section className="main-team">
					<Selectbox options={this.state.friend} max="2" decisions={this.state.companionIndex} closeBox={this.closeTeam.bind(this)} fontFamily="'Rubik', sans-serif" />
				</section>
			)
		} else if (this.state.showAdd) {
			//popup box show all friends as relative options
			popContainer = (<div className="pop-back"></div>);
			popTeam = (
				<section className="main-team">
					<Selectbox options={this.state.relOption} closeBox={this.closeAdd.bind(this)} fontFamily="'Rubik', sans-serif" />
				</section>
			)
		}
		//indicate owner or relative
		let ownership;
		//indicate user's privilege
		let ownerAction;
		//indicate user's transfer privilege
		let transferAction;
		//if user is the owner
		if (this.props.userId === this.state.ownerId) {
			ownership = "You are the owner:";
			//if relative exist
			if (this.state.relative) {
				ownerAction = (<h6 className="main-section-group-owner" onClick={this.delRelative.bind(this)}>Delete Relative</h6>);
				transferAction = (<h6 className="main-section-group-owner" onClick={this.transOwner.bind(this)}>Transfer ownership</h6>);
			} else {
				//if relative not exist
				ownerAction = (<h6 className="main-section-group-owner" onClick={this.addRelative.bind(this)}>Add Relative</h6>);
			}
		} else {
			//if user is relative
			ownership = "You are the relative:";
			ownerAction =(
				<h6 className="main-section-group-owner" onClick={this.endRelation.bind(this)}>End relation</h6>
			);
		}
		//pop box for ownership actions
		let popAction;
		if (this.state.showDel) {
			//delete relative popbox
			popContainer = (<div className="pop-back"></div>);
			popAction = (
				<section className="main-action">
					<h5 className="main-action-close" onClick={this.closeDel.bind(this)}>✗</h5>
					<h4 className="main-action-title">Are you sure you want to delete this relative?</h4>
					<h5 className="main-action-warn">Once you delete a relative, he/she won't be able to resume it himself/herself.</h5>
					<Confirmdel message="Delete Relative" confirmDel={this.confirmDel.bind(this)} fontFamily="'Rubik', sans-serif"/>
				</section>
			);
		} else if (this.state.showTrans) {
			//transfer relative popbox
			popContainer = (<div className="pop-back"></div>);
			popAction = (
				<section className="main-trans">
					<h5 className="main-action-close" onClick={this.closeTrans.bind(this)}>✗</h5>
					<h4 className="main-action-title">Are you sure you want to transfer ownership to {this.state.transRelative.user_name}?</h4>
					<img className="main-trans-img" alt={this.state.transRelative.user_name} src={"/img/user/" + this.state.transRelative.user_id + ".jpg" }/>
					<h5 className="main-action-warn">Once you confirmed transfer, you won't be able to resume it.</h5>
					<Confirmdel message="Transfer Ownership" confirmDel={this.confirmTrans.bind(this)} fontFamily="'Rubik', sans-serif"/>
				</section>
			);
		} else if (this.state.showEnd) {
			popContainer = (<div className="pop-back"></div>);
			popAction = (
				<section className="main-action">
					<h5 className="main-action-close" onClick={this.closeEnd.bind(this)}>✗</h5>
					<h4 className="main-action-title">Are you sure you want to end this relationship?</h4>
					<h5 className="main-action-warn">Once you end the relationship, you won't be able to resume it yourself.</h5>
					<Confirmdel message="End Relationship" confirmDel={this.confirmEnd.bind(this)} fontFamily="'Rubik', sans-serif"/>
				</section>
			);
		} 
		//display four skills
		let skills = [];
		for (let i = 0; i < 4; i++) {
			let skillName, skillButton, skillInput;
			//skill error 1 indicate empty name
			if (this.state.skillError[i] === 1 && this.state.skills[i] ) {
				skillName = "Name can't be empty";
				skillButton = (
					<input type="button" className="main-section-skill-save" value="Save" onClick={this.saveSkill.bind(this, i)} />
				);
				skillInput = <Inputbox id={"pet-skill-" + i} ref={"petSkill" + i} content={this.state.skills[i]?this.state.skills[i]:""} max="16" width="100%" fontFamily="'Rubik', sans-serif" />
			} else if (!this.state.skills[i]) {
				//hide update name button when skill not init
				skillName = "Please Upload Skill Image First";
				skillButton = (
					<div className="main-section-skill-hide"></div>
				)
			} else {
				skillName = "Skill Name";
				skillButton = (
					<input type="button" className="main-section-skill-save" value="Save" onClick={this.saveSkill.bind(this, i)} />
				);
				skillInput = <Inputbox id={"pet-skill-" + i} ref={"petSkill" + i} content={this.state.skills[i]?this.state.skills[i]:""} max="16" width="100%" fontFamily="'Rubik', sans-serif" />
			}
			//save picture when skill have been inited, init picture when not inited
			skills[i] = (
				<section key={"petskill" + i} className="main-section">
					<header>
						<h4>Update {noGetSkillTitle(i)} Skill</h4>
					</header>
					<div className="main-section-group">
						<label htmlFor={"pet-skill-" + i}>
							{skillName}
						</label>
						{skillButton}
						{skillInput}
					</div>
					<Updateprofile alt={"pet skills " + i} src={this.state.skills[i]?"/img/pet/" + this.props.pet.pet_id + "/cover/" + (i + 1) + ".jpg":"/img/icon/skill.jpg"} width="104" format="image/jpg" saveProfile={this.state.skills[i]?this.savePic.bind(this, i):this.initPic.bind(this, i)} fontFamily="'Rubik', sans-serif" />
				</section>
			)
		}
		return (
			<div id="react-root">
				<Header visitorId={this.props.userId} visitorName={this.props.userName} loginSuccess={null} logOut={this.logOut.bind(this)} unread={this.props.unread} />
				<main id="main">
					<section id="main-header">
						<h4 id="main-header-left">
							<a href={"/user/" + this.props.userId}>« Back to digital home</a>
						</h4>
						<h4 id="main-header-right">
							<a href={"/pet/" + this.props.pet.pet_id}>Back to pet hub »</a>
						</h4>
					</section>
					<section className="main-section">
						<header>
							<h4>Update Group</h4>
						</header>
						<div className="main-section-group">
							<label htmlFor="pet-name">{this.state.nameLabel}</label>
							<input type="button" className="main-section-skill-save" value="Save" onClick={this.saveName.bind(this)} />
							<Inputbox id="pet-name" ref="petName" content={this.state.petName} max="10" width="100%" fontFamily="'Rubik', sans-serif" />
						</div>
						<div className="main-section-group">
							<h5 className="main-section-group-title">Build Team:</h5>
							{firstCompanion}
							{secondCompanion}
						</div>
						<div className="main-section-group">
							<h5 className="main-section-group-title">{ownership}</h5>
							{ownerAction}
							{transferAction}
						</div>
					</section>
					<section className="main-section">
						<header>
							<h4>Update Profile</h4>
						</header>
						<Updateprofile src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.png"} width="200" saveProfile={this.saveProfile.bind(this)} fontFamily="'Rubik', sans-serif" />
					</section>
					<section className="main-section">
						<header>
							<h4>Update Location</h4>
						</header>
						<div id="main-section-loc">
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
		switch (result) {
			case "0":
				console.log("Please login");
				break;
			case "1":
				console.log("Pet not exist");
				break;
			case "2":
				console.log("You are not pet owner");
				break;
			default:
				ReactDOM.render(<Edit pet={result[0]} userId={result[1]} userName={result[2]} unread={result[3]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Can't connect to server");
	}
});