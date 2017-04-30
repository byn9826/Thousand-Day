import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
class Love extends Component {
	constructor(props) {
        super(props);
		this.state = {
			moments: this.props.petMoment
        }
    }
	render() {
		//pets with most watchers
		let rank = this.props.petRank.map((pet, index) =>
			<div key={"thousandayloverank" + index} className="aside-list">
				<img className="aside-list-profile" alt={pet.pet_name} src={"/img/pet/" + pet.pet_id + "/cover/0.png"} />
				<img className="aside-list-icon" alt="watcher" src="/img/icon/glyphicons-watch.png" />
				<h7>{pet.count}</h7>
				<h5>{pet.pet_name}</h5>
			</div>
		);
		//newest 20 moments
		let moments = this.state.moments.map((moment, index) =>
			<section key={"thousandaylovemoment" + index} className="main-moment">
				<div className="main-moment-img" style={{backgroundImage: "url(/img/pet/" + moment.pet_id + "/moment/" + moment.image_name + ")"}}></div>
				<div className="main-moment-container">
					<img alt="Pet" src={"/img/pet/" + moment.pet_id + "/cover/0.png"} />
					<h6>{moment.moment_message}</h6>
				</div>
			</section>
		);
		return (
			<div  id="react-root">
				<Header />
				<main id="main">
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
				console.log(result[0]);
				console.log(result[2]);
				ReactDOM.render(<Love petRank={result[0]} petMoment={result[2]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Can't connect to the server");
	}
});