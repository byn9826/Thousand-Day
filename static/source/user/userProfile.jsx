import React, {Component} from "react";
import noGetAbility from "../../js/noGetAbility.js";
import Updateprofile from "../snippet/button/Updateprofile";
import Inputbox from "../snippet/input/Inputbox";
import Droplist from "../snippet/box/Droplist";
import reqwest from "reqwest";
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //Store relation between user and current user
            relation: parseInt(this.props.relation),
            //store user name
            userName: this.props.user.user_name,
            //store user about
            userAbout: this.props.user.user_about || "",
            //show edit box or not
            pop: false,
            //for user type in empty user name
            nameError: null,
            //store profile image
            image: "/img/user/" + this.props.user.user_id + ".jpg",
            //store user aura
            userAura: this.props.user.user_aura
		};
	}
    beFriend() {
        //only response when login and not friend yet
        if (this.props.relation == "1") {
            reqwest({
                url: "/user/addFriend",
                method: "POST",
                data: {"receiver": this.props.user.user_id, "name": this.props.visitorName},
                success: function(result) {
                    switch(result) {
                        case "0":
                            console.log("Can't connect to db");
                            break;
                        default:
                            this.props.sendRequest(result);
                    }
                }.bind(this),
                error: function (err) {
                    console.log("Can't connect to server");
                }
            });
        }
    }
    //triger to show edit profile
    showEdit() {
        this.setState({pop: true});
    }
    //close edit profile box
    closeEdit() {
        this.setState({pop: false, nameError: null});
    }
    //save user name
    saveName() {
        let userName = this.refs.userName.state.content.trim();
        if (userName != this.state.userName) {
			//update only when name is not empty
			if (userName.length > 0) {
                reqwest({
					url: "/profile/profileName",
					method: "POST",
					data: {"name": userName},
					success: function(result) {
						switch (result) {
							case "0":
								this.refs.userName.setState({content: this.state.userName});
								console.log("Please login first");
								break;
							case "1":
								console.log("Success");
								//Update name in record
								this.setState({userName: userName, nameError: null});
								break;
							case "2":
								this.refs.userName.setState({content: this.state.userName});
								console.log("Can't connect to db");
								break;
							case "3":
								this.refs.userName.setState({content: this.state.userName});
								console.log("Name can't be empty");
								break;
						}
					}.bind(this),
					error: function (err) {
						this.refs.userName.setState({content: this.state.userName});
						console.log("can't connect to server");
					}.bind(this)
                });
            } else {
                //roll back name
				this.refs.userName.setState({content: this.state.userName});
				//show error
				this.setState({nameError: "Name can't be empty!"});
            }
        }
    }
    //save user about
    saveAbout() {
        let userAbout = this.refs.userAbout.state.content.trim();
        if (userAbout != this.state.userAbout) {
            reqwest({
                url: "/profile/profileAbout",
                method: "POST",
                data: {"about": userAbout},
                success: function(result) {
                    switch (result) {
                        case "0":
                            this.refs.userAbout.setState({content: this.state.userAbout});
                            console.log("Please login first");
                            break;
                        case "1":
                            console.log("Success");
                            //Update about in record
                            this.setState({userAbout: userAbout});
                            break;
                        case "2":
                            this.refs.userAbout.setState({content: this.state.userAbout});
                            console.log("Can't connect to db");
                            break;
                    }
                }.bind(this),
                error: function (err) {
                    this.refs.userAbout.setState({content: this.state.userAbout});
                    console.log("can't connect to server");
                }.bind(this)
            });
        }
    }
    //save user image
    saveProfile(finalUrl) {
        console.log(finalUrl);
        let formData = new FormData();
        formData.append('file', finalUrl, this.props.user.user_id + ".jpg");
        reqwest({
            url: "/profile/profileImage",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(result) {
                switch (result) {
                    case "0":
                        console.log("Please login first");
                        break;
                    case "1":
                        console.log("File not support");
                        break;
                    case "3":
                        this.setState({image: URL.createObjectURL(finalUrl)});
                        break;
                }
            }.bind(this)
        });
    }
    //update user aura
    updateAura(value) {
        console.log(value);
        //update only when different
        if (parseInt(value) != parseInt(this.state.userAura)) {
            reqwest({
                url: "/profile/profileAura",
                method: "POST",
                data: {"aura": value},
                success: function(result) {
                    switch (result) {
                        case "0":
                            console.log("Please login first");
                            break;
                        case "1":
                            console.log("Success");
                            //Update name in record
                            this.setState({userAura: value});
                            break;
                        case "2":
                            console.log("Can't connect to db");
                            break;
                    }
                }.bind(this),
                error: function (err) {
                    console.log("can't connect to server");
                }.bind(this)
            });
        }
    }
    render() {
        let watchStyle;
        //show cursor if could send become friend request
        if (this.props.relation == "1") {
            watchStyle = "main-watch-active";
        } else {
            watchStyle = "main-watch";
        }
        //show all relatives
        let relatives = this.props.relative.map((relative, index) =>
            <div key={"userRelative" + index} className="main-relative">
                <a href={"/user/" + relative}>
                    <img src={"/img/user/" + relative + ".jpg"} />
                </a>
            </div>
        );
        //show different content for become friend area
        let friend;
        //show edit button or not
        let edit;
        switch (this.props.relation) {
            case "0":
                friend = "Connect error, try later";
                break;
            case "1":
                friend = "+ Friend";
                break;
            case "2": 
                friend = "Yourself";
                edit = (<a id="main-edit" onClick={this.showEdit.bind(this)}><h6>Edit Profile</h6></a>);
                break;
            case "3": 
                friend = "Please Login";
                break;
            case "4":
                friend = "Request Sent";
                break;
            case "5":
                friend = "Friend ✓";
                break;
        }
        //show pop container or not
        let popContainer;
        let popEdit;
        if (this.state.pop) {
            popContainer = (<div className="pop-back"></div>);
            popEdit = (
                <section id="pop-edit">
                    <h5 onClick={this.closeEdit.bind(this)}>✗</h5>
                    <h4>Edit Profile</h4>
                    <div className="pop-edit-section">
                        <label htmlFor="user-name">Update your name:</label>
                        <Inputbox id="user-name" ref="userName" content={this.state.userName} max="10" width="200px" fontFamily="'Rubik', sans-serif" />
                        <h6>{this.state.nameError}</h6>
                        <input className="pop-edit-button" type="button" value="Save" onClick={this.saveName.bind(this)} />
                    </div>
                    <div className="pop-edit-section">
                        <label htmlFor="user-about">Something fun?</label>
                        <Inputbox id="user-about" ref="userAbout" content={this.state.userAbout} max="30" width="200px" fontFamily="'Rubik', sans-serif" />
                        <input className="pop-edit-button" type="button" value="Save" onClick={this.saveAbout.bind(this)} />
                    </div>
                    <Updateprofile alt="User Profile" src={"/img/user/" + this.props.user.user_id + ".jpg"} format="image/jpg" width="200" saveProfile={this.saveProfile.bind(this)} indicate="Update Image" fontFamily="'Rubik', sans-serif" />
                    <div className="pop-edit-section">
                        <label htmlFor="user-aura">Update your aura:</label>
                        <Droplist id="user-aura" width="80%" default={this.state.userAura} options={["Pets +10% Attack", "Pets +10% Defend", "Pets +10% Health", "Pets +10% Swift", "Pets +10% Lucky"]} title="Choose your aura" showTitle="true" changeValue={this.updateAura.bind(this)} fontFamily="'Rubik', sans-serif" />
                    </div>
                    <input className="pop-edit-close" type="button" value="Close" onClick={this.closeEdit.bind(this)} />
                </section>
            )
        }
        return(
            <main id="main">
                <img id="main-profile" alt={this.state.userName} src={this.state.image} />
                <h1 className="main-name">{this.state.userName}</h1>
                <h5 className="main-name"> - {this.state.userAbout}</h5>
                <h5 id="main-aura">{this.state.userAura?"Aura: Pets +10% " + noGetAbility(this.state.userAura):"No aura selected"}</h5>
                {edit}
                <h5 className={watchStyle} onClick={this.beFriend.bind(this)}>{friend}</h5>
                <h5 id="main-relative">Relative:</h5>
                {relatives}
                {popEdit}
                {popContainer}
            </main>
        );
    }
}
export default Profile;