import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
class Love extends Component {
	render() {
		//pets with most watchers
		let rank = this.props.petRank.map((pet, index) =>
			<div key={"thousandayloverank" + index} className="aside-list">
				<a href={"/pet/" + pet.pet_id}>
					<img className="aside-list-profile" alt={pet.pet_name} src={"/img/pet/" + pet.pet_id + "/cover/0.png"} />
					<img className="aside-list-icon" alt="watcher" src="/img/icon/glyphicons-watch.png" />
					<h7>{pet.count}</h7>
					<h5>{pet.pet_name}</h5>
				</a>
			</div>
		);
		//newest 10 moments
		let moments = [];
		let first;
		let second
		for (let i = 0; i < this.props.petMoment.length; i++) {
			if (this.props.petMoment[i].comment) {
				//show first comment
				first = (
					<div className="main-moment-container-first">
						<h6>{this.props.petMoment[i].comment[0].comment_content}</h6>
						<a href={"/user/" + this.props.petMoment[i].comment[0].user_id}>
							<img alt="User" src={"/img/user/" + this.props.petMoment[i].comment[0].user_id + ".jpg"} />
						</a>
					</div>
				);
				//show second comment
				if (this.props.petMoment[i].comment[1]) {
					second = (
						<div className="main-moment-container-first main-moment-container-second">
							<h6>{this.props.petMoment[i].comment[1].comment_content}</h6>
							<a href={"/user/" + this.props.petMoment[i].comment[1].user_id}>
								<img alt="User" src={"/img/user/" + this.props.petMoment[i].comment[1].user_id + ".jpg"} />
							</a>
						</div>
					);
				}
			} else {
				first = (
					<div className="main-moment-container-first"></div>
				);
				second = null;
			}
			//moment list
			moments[i] = (
				<section key={"thousandaylovemoment" + i} className="main-moment">
					<a href={"/moment/" + this.props.petMoment[i].moment_id}>
						<div className="main-moment-img" style={{backgroundImage: "url(/img/pet/" + this.props.petMoment[i].pet_id + "/moment/" + this.props.petMoment[i].image_name + ")"}}></div>
					</a>
					<div className="main-moment-container">
						<a href={"/moment/" + this.props.petMoment[i].moment_id}>
							<img alt="Pet" src={"/img/pet/" + this.props.petMoment[i].pet_id + "/cover/0.png"} />
							<h5>{this.props.petMoment[i].moment_message}</h5>
						</a>
						{first}
						{second}
					</div>
				</section>
			)
		}
		return (
			<div  id="react-root">
				<Header />
				<main id="main">
					<header id="main-header">
						<img alt="Share Moment" src="/img/icon/glyphicons-moment.png" />
						<h2>Most recent love moments</h2>
					</header>
					{moments}
				</main>
				<aside id="aside">
					<h4>Most Popular Pets</h4>
					{rank}
				</aside>
				<Footer />
			</div>
		);
	}
}
reqwest({
	url: "/love/view",
	method: "POST",
	success: function(result) {
		//get default data
		switch (result) {
			case "0":
				console.log("Can't connet to server, try later");
				break;
			default:
				//combine pet name with count
				for (let i = 0; i < result[0].length; i++) {
					for (let j = 0; j < result[1].length; j ++) {
						if (result[0][i].pet_id === result[1][j].pet_id) {
							result[0][i].count = result[1][j].count;
						}
					}
				}
				//combine moments and comments
				for (let i = 0; i < result[3].length; i++) {
					for (let j = 0; j < result[2].length; j++) {
						if (result[3][i].moment_id === result[2][j].moment_id) {
							if (!result[2][j].comment) {
								result[2][j].comment = [];
							}
							result[2][j].comment.push(result[3][i]);
						}
					}
				}
				ReactDOM.render(<Love petRank={result[0]} petMoment={result[2]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Can't connect to the server");
	}
});