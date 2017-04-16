import React, {Component} from "react";
import noGetAbility from "../../js/noGetAbility.js";
import Updateprofile from "../snippet/button/Updateprofile";
import Inputbox from "../snippet/input/Inputbox";
import reqwest from "reqwest";
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //Store relation between user and current user
            relation: parseInt(this.props.relation),
            //store user name
            userName: this.props.user.user_name,
            //show edit box or not
            pop: false,
            //for user type in empty user name
            nameError: null
		};
	}
    beFriend() {
        //only response when login and not friend yet
        if (this.props.relation == "1") {
            reqwest({
                url: "/user/addFriend",
                method: "POST",
                data: {"receiver": this.props.user.user_id},
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
    saveProfile(finalUrl) {
        console.log(finalUrl);
        let formData = new FormData();
        formData.append('file', finalUrl, this.props.user.user_id + ".jpg");
        reqwest({
            url: "/profile/profileImage",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false
        });
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
                    <Inputbox id="user-name" ref="userName" content={this.state.userName} max="10" width="200px" fontFamily="'Rubik', sans-serif" />
                    <h6>{this.state.nameError}</h6>
                    <input className="pop-edit-button" type="button" value="Update Name" onClick={this.saveName.bind(this)} />
                    <Updateprofile alt="User Profile" src={"/img/user/" + this.props.user.user_id + ".jpg"} format="image/jpg" width="200" saveProfile={this.saveProfile.bind(this)} indicate="Update Image" fontFamily="'Rubik', sans-serif" />
                </section>
            )
        }
        return(
            <main id="main">
                <img id="main-profile" alt={this.state.userName} src={"/img/user/" + this.props.user.user_id + ".jpg"} />
                <h1 className="main-name">{this.state.userName}</h1>
                <h5 className="main-name"> - {this.props.user.user_about}</h5>
                <h5 id="main-aura">{this.props.user.user_aura?"Aura: Pets +10% " + noGetAbility(this.props.user.user_aura):"No aura selected"}</h5>
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