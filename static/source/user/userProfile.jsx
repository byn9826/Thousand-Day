import React, {Component} from "react";
import noGetAbility from "../../js/noGetAbility.js";
import reqwest from "reqwest";
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //Store relation between user and current user
            relation: parseInt(this.props.relation),
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
        switch (this.props.relation) {
            case "1":
                friend = "+ Friend";
                break;
            case "2": 
                friend = "Yourself";
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
        return(
            <main id="main">
                <img id="main-profile" alt={this.props.user.user_name} src={"/img/user/" + this.props.user.user_id + ".jpg"} />
                <h1 className="main-name">{this.props.user.user_name}</h1>
                <h5 className="main-name"> - {this.props.user.user_about}</h5>
                <h5 id="main-aura">Aura: Pets +10% {noGetAbility(this.props.user.user_aura)}</h5>
                <h5 className={watchStyle} onClick={this.beFriend.bind(this)}>{friend}</h5>
                <h5 id="main-relative">Relative:</h5>
                {relatives}
            </main>
        );
    }
}
export default Profile;