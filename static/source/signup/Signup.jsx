import React, {Component} from "react"
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import Updateprofile from "../snippet/button/Updateprofile";
import Facebookprofile from "../snippet/social/Facebookprofile";
class Signup extends Component {
	constructor(props) {
        super(props);
		this.state = {
			userName: window.location.pathname.split("/signup/").pop() || null,
            facebookId: document.getElementById("facebook-id").innerHTML
		};
	}
    getImg() {
        console.log(this.refs.facebook.state.data);
    }
	render() {
		return (
			<div id="react-root">
				<Header />
                <main id="main">
                    <h1>Hello, {unescape(this.state.userName)}</h1>
                    <h4 onClick={this.getImg.bind(this)}>Let's register a new digital home for you!</h4>
                    <h4 className="main-title">Step 2: Choose your profile</h4>
                    <div className="main-profile">
                        <h5>Use your Facebook profile</h5>
                        <Facebookprofile ref="facebook" facebookId={this.state.facebookId} />
                    </div>
                    <div className="main-profile">
                        <h5>Or upload a new profile</h5>
                        <Updateprofile width="200" saveProfile={null} />
                    </div>
                </main>
				<Footer />
			</div>
		);
	}
}
ReactDOM.render(<Signup />, document.getElementById("root"));