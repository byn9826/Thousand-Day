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
        if (this.state.relation == 0) {
            reqwest({
                url: "/user/addFriend",
                type: "json",
                method: "POST",
                contentType: "application/json",
                headers: {"X-My-Custom-Header": "SomethingImportant"},
                data: JSON.stringify({"apply": this.props.user.user_id}),
                success: function(result) {
                    if (result.Result === 0) {
                        this.setState({relation: 4});
                        console.log("Success");
                    } else if (result.Result === 2) {
                        this.setState({relation: 4});
                        console.log("Duplicate");
                    }
                    else {
                        console.log("Something Wrong");
                    }
                }.bind(this),
                error: function (err) {
                    console.log("Something Wrong");
                }
            });
        }
    }
    render() {
        let profileStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "18%",
            marginLeft: "10%",
            marginTop: "100px"
        };
        let profileImgStyle = {
            display: "block",
            width: "80%",
            marginLeft: "10%",
            marginRight: "10%",
            borderRadius: "50%",
        };
        let profileNameStyle = {
            display: "block",
            width: "90%",
            margin: "10px 5%",
            textAlign: "center"
        };
        let profileWatchStyle;
        if (this.state.relation == 0) {
            profileWatchStyle = {
                display: "block",
                textAlign: "center",
                fontweight: "bold",
                backgroundColor: "#ef8513",
                borderRadius: "5px",
                width: "70%",
                marginLeft: "15%",
                padding: "5px 0",
                color: "white",
                marginTop: "15px",
                cursor: "pointer"
            };
        } else {
            profileWatchStyle = {
                display: "block",
                textAlign: "center",
                fontweight: "bold",
                backgroundColor: "#ef8513",
                borderRadius: "5px",
                width: "70%",
                marginLeft: "15%",
                padding: "5px 0",
                color: "white",
                marginTop: "15px"
            };
        }
        let profileBorderStyle = {
            display: "block",
            width: "90%",
            marginLeft: "5%",
            marginTop: "20px",
            textAlign: "center",
            fontWeight: "bold"
        };
        let profileAuraStyle = {
            display: "block",
            width: "90%",
            margin: "0px 5%",
            textAlign: "center",
            marginTop: "15px",
            color: "#052456",
            fontweight: "bold",
            borderBottom: "1px solid #e5e5e5",
            paddingBottom: "15px",
        };
        let borderRelativeStyle = {
            display: "block",
            width: "90%",
            margin: "10px 5%",
            borderRadius: "5px",
            padding: "5px 3%",
            backgroundColor: "#f7d7b4"
        };
        let relativeImgStyle = {
            display: "inline-block",
            width: "20%",
            marginRight: "5%",
            borderRadius: "50%",
            verticalAlign: "middle"
        };
        let relatives = this.props.relative.map((relative, index) =>
            <div key={"userRelative" + index} style={borderRelativeStyle}>
                <a href={"/user/" + relative}>
                    <img style={relativeImgStyle} src={"/img/user/" + relative + ".jpg"} />
                </a>
            </div>
        );
        let friend;
        switch (this.state.relation) {
            case 0:
                friend = "+ Friend";
                break;
            case 1:
                friend = "Friend ✓";
                break;
            case 2: 
                friend = "Yourself";
                break;
            case 3: 
                friend = "Please Login";
                break;
            default:
                friend = "Request Sent";
                break;
        }
        return(
            <main style={profileStyle}>
                <img style={profileImgStyle} alt={this.props.user.user_name} src={"/img/user/" + this.props.user.user_id + ".jpg"} />
                <h1 style={profileNameStyle}>{this.props.user.user_name}</h1>
                <h5 style={profileNameStyle}> - {this.props.user.user_about}</h5>
                <h5 style={profileAuraStyle}>Aura: Pets +10% {noGetAbility(this.props.user.user_aura)}</h5>
                <h5 style={profileWatchStyle} onClick={this.beFriend.bind(this)}>{friend}</h5>
                <h5 style={profileBorderStyle}>Relative:</h5>
                {relatives}
            </main>
        );
    }
}
export default Profile;