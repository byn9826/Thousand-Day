import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
class Watch extends Component {
	constructor(props) {
        super(props);
		this.state = {
			//store most recent 10 public moment
			recent: this.props.recentTen
		};
	}
	render() {
		let moment = [];
		for (let i = 0; i < this.state.recent.length; i++) {
			moment[i] = (
				<section key={"thousandaylovemoment" + i} className="main-moment">
					<a href={"/moment/" + this.state.recent[i].moment_id}>
						<div className="main-moment-img" style={{backgroundImage: "url(/img/pet/" + this.state.recent[i].pet_id + "/moment/" + this.state.recent[i].image_name + ")"}}></div>
					</a>
					<div className="main-moment-container">
						<h4>{this.state.recent[i].moment_message}</h4>
						<img alt="Pet" src={"/img/pet/" + this.state.recent[i].pet_id + "/cover/0.png"} />
						<h7>{new Date(this.state.recent[i].moment_date).toISOString().substring(0, 10)}</h7>
					</div>
				</section>
			);
		}
		return (
			<div  id="react-root">
				<Header visitorId={this.props.visitorId} visitorName={this.props.visitorName} loginSuccess={()=>{}} logOut={()=>{}} />
				<aside id="aside">
					<h2>Welcome</h2>
					<h4>Watch love Moments ⇋</h4>
					<section>
						<div className="aside-section aside-section-option">
							<img alt="Recent" src="/img/icon/glyphicons-moment.png" />
							<h7>Most recent moments</h7>
						</div>
						<div className="aside-section aside-section-option">
							<img alt="Recent" src="/img/icon/glyphicons-watch.png" />
							<h7>On your watch list</h7>
						</div>
					</section>
				</aside>
				<main id="main">
					{moment}
				</main>
				<Footer />
			</div>
		);
	}
}
reqwest({
	url: "/watch/view",
	method: "POST",
	success: function(result) {
		console.log(result);
		//get default data
		switch (result) {
			case "0":
				console.log("Can't connet to server, try later");
				break;
			default:
				ReactDOM.render(<Watch recentTen={result[0]} visitorName={result[1]} visitorId={result[2]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Can't connect to the server");
	}
});