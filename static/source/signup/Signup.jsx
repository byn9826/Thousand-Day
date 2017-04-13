import React, {Component} from "react"
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import Inputbox from "../snippet/input/Inputbox";
import Updateprofile from "../snippet/button/Updateprofile";
import Urltoprofile from "../snippet/social/Urltoprofile";
class Signup extends Component {
	constructor(props) {
        super(props);
		this.state = {
            //default user name
			userName: window.location.pathname.split("/signup/").pop() || null,
            //get facebook id
            facebookId: document.getElementById("facebook-id").innerHTML.trim() != ""?document.getElementById("facebook-id").innerHTML.trim():null,
            //get google id
            googleId: document.getElementById("google-id").innerHTML.trim() != ""?document.getElementById("google-id").innerHTML.trim():null,
            //get google profile
            googleProfile: document.getElementById("google-profile").innerHTML.trim() + "?sz=200",
            //value of terms check
            terms: false,
            //show error for sign up
            error: "",
            //if user have upload new profile
            profile: null
		};
	}
    //change check term value
    checkTerm() {
        this.setState({terms: !this.state.terms});
    }
    //update profile record
    saveProfile(finalUrl) {
        this.setState({profile: finalUrl});
        console.log(finalUrl);
    }
    //if user click sign up
    signUp() {
        let name = this.refs.userName.state.content.trim();
        let image;
        if (name == "") {
            //name can't be empty
            this.setState({error: "User Name can't be empty in step one."});
        } else if (!this.state.profile && !this.refs.facebook.state.data) {
            //must have a profile image
            this.setState({error: "Please upload profile image in step two."});    
        } else if (!this.state.terms) {
            //must check terms
            this.setState({error: "Please agree to our terms and privacy policy."});   
        } else {
            //use uploaded profile file
            if (this.state.profile) {
                image = this.state.profile;
            } else {
                //not uploaded use facebook default image
                image = this.refs.facebook.state.data;
            }
            let fileData = new FormData();
            fileData.append("file", image, "0.jpg");
            //Update db
            reqwest({
                url: "/signup/createAccount/" + name,
                method: "POST",
                data: fileData,
        	    contentType: false,
        	    processData: false,
                success: function(result) {
                    switch (result) {
                        case "0":
                            console.log("Must Login");
                            break;
                        case "1":
                            this.setState({error: "User Name can't be empty in step one."});
                            break;
                        case "2":
                            this.setState({error: "Profile image type not supported."});
                            break;
                        case "3":
                            this.setState({error: "DB error, try later."});
                            break;
                        default:
                            //sign up success redirect
                            let id = parseInt(result.id);
                            window.location.replace("/user/" + id);
                            break;
                    }
                }.bind(this),
                error: function (err) {
                    this.setState({error: "Can't connect to server"});
                    console.log(err);
                }.bind(this)
            });
        }
    }
	render() {
        let platform;
        let profile;
        if (this.state.facebookId) {
            platform = "FACEBOOK";
            profile = <Urltoprofile ref="facebook" url={"http://graph.facebook.com/" + this.state.facebookId + "/picture?type=square&w‌​idth=720&height=720"} />
        } else if (this.state.googleId) {
            platform = "GOOGLE";
            profile = <Urltoprofile ref="facebook" url={this.state.googleProfile} />
        }
		return (
			<div id="react-root">
				<Header loginSuccess={null} logOut={null} hideName={true}/>
                <main id="main">
                    <h1>Create Account</h1>
                    <h4>Hello, {unescape(this.state.userName)}. Let's register a new digital home for your pets and you!</h4>
                    <h4 className="main-title">Step 1: Set up your nickname</h4>
                    <Inputbox ref="userName" content={unescape(this.state.userName)} max="10" width="30%" fontFamily="'Rubik', sans-serif" />
                    <h4 className="main-title">Step 2: Choose your profile</h4>
                    <div className="main-profile">
                        <h5>Use your {platform} profile</h5>
                        {profile}
                    </div>
                    <div className="main-profile">
                        <h5>Or upload a new profile</h5>
                        <Updateprofile width="200" saveProfile={this.saveProfile.bind(this)} format="image/jpg" />
                    </div>
                    <h4 className="main-title">Step 3: Agree to our Terms & Privacy Policy</h4>
                    <h5 id="main-terms"><a href="/terms&privacy" target="__blank">Terms & Privacy Policy @ Thousanday.com</a></h5>
                    <div id="main-check">
                        <input type="checkbox" checked={this.state.terms} onClick={this.checkTerm.bind(this)}/>
                        <h6>By signing up, you agree to our Terms & Privacy Policy.</h6>
                    </div>
                    <h4 className="main-title">Finally, confirm signup</h4>
                    <h6 id="main-error">{this.state.error}</h6>
                    <input id="main-confirm" type="button" value={"SIGN UP WITH " + platform} onClick={this.signUp.bind(this)} />
                </main>
				<Footer />
			</div>
		);
	}
}
ReactDOM.render(<Signup />, document.getElementById("root"));