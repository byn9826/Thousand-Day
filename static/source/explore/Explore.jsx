import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import Picker from "./exploreType";
import Waterfall from "../snippet/display/Waterfall";
class Explore extends Component {
	constructor(props) {
        super(props);
		this.state = {
            type: null,
			nature: null,
			moment: [],
			//store load moment for how many time
			load: 1,
			//store more moment to load or not
			more: true
        }
    }
	pickType(type) {
		if (type != -1) {
			this.setState({type: type.toString()});
			if (this.state.nature) {
				reqwest({
					url: "/explore/getMoment",
					method: "POST",
					data: {"type": type, "nature": this.state.nature, "load": 0},
					success: function(result) {
						switch(result) {
							case "0":
								console.log("Can't connect to database");
								break;
							default:
								let more = (result.length < 20)?false:true;
								this.setState({moment: result, load: 1, more: more});
						}
					}.bind(this),
					error: function (err) {
						console.log("Can't connect to the server");
					}
				});
			}
		} else {
			this.setState({type: null});
		}
	}
	pickNature(nature) {
		if (nature != -1) {
			this.setState({nature: nature.toString()});
			if (this.state.type) {
				reqwest({
					url: "/explore/getMoment",
					method: "POST",
					data: {"type": this.state.type, "nature": nature, "load": 0},
					success: function(result) {
						switch(result) {
							case "0":
								console.log("Can't connect to database");
								break;
							default:
								let more = (result.length < 20)?false:true;
								this.setState({moment: result, load: 1, more: more});
						}
					}.bind(this),
					error: function (err) {
						console.log("Can't connect to the server");
					}
				});
			}
		} else {
			this.setState({nature: null});
		}
	}
	//load more moment
	loadMore() {
		reqwest({
			url: "/explore/getMoment",
			method: "POST",
			data: {"type": this.state.type, "nature": this.state.nature, "load": this.state.load},
			success: function(result) {
				switch(result) {
					case "0":
						console.log("Can't connect to database");
						break;
					default:
						let moment = this.state.moment.concat(result);
						let more = (result.length < 20)?false:true;
						this.setState({moment: moment, load: this.state.load + 1, more: more});
				}
			}.bind(this),
			error: function (err) {
				console.log("Can't connect to the server");
			}
		});
	}
	render() {
		let allImages = [];
        for (let i = 0; i < this.state.moment.length; i++) {
            allImages[i] = [];
            allImages[i][0] = "/img/pet/" + this.state.moment[i].pet_id + "/moment/" + this.state.moment[i].image_name;
            allImages[i][1] = this.state.moment[i].moment_message;
            allImages[i][2] = "/moment/" + this.state.moment[i].moment_id;
        }
		//store load button
		let load;
		if (this.state.moment.length > 0 && this.state.more) {
			load = (<h5 className="main-load" onClick={this.loadMore.bind(this)} >Click to load more ...</h5>);
		} else if (this.state.moment.length > 0 && !this.state.more) {
			load = (<h5 className="main-lock" >No more moments</h5>);
		}
		//if user have login
		let userName = document.getElementById("user-name").innerHTML.trim();
		if (userName == "None") {
			userName = null;
		}
		return (
			<div id="react-root">
				<Header visitorName={userName} loginSuccess={()=>{}} logOut={()=>{}} />
				<main id="main">
					<section className="main-filter">
						<div className="main-filter-title">
							<img alt="type" src="/img/icon/glyphicons-type.png" />
							<h4>Filter Type</h4>
						</div>
						<Picker data={["Dog", "Cat", "Bird", "Fish", "Other"]} color="#052456" width="35px" chooseType={this.pickType.bind(this)} />
					</section>
					<section className="main-filter">
						<div className="main-filter-title">
							<img alt="type" src="/img/icon/glyphicons-nature.png" />
							<h4>Filter Nature</h4>
						</div>
						<Picker data={["Cute", "Strong", "Smart", "Beauty"]} color="#052456" width="40px" chooseType={this.pickNature.bind(this)} />
					</section>
					<div id="main-title">
						<img alt="Moment" src="/img/icon/glyphicons-moment.png" />
						<h3>Explore moments in the world</h3>
					</div>
					<Waterfall column="4" image={allImages} link="true" fontFamily="'Rubik', sans-serif" />
					{load}
				</main>
				<img id="banner" alt="Banner" src="/img/other/banner.jpg" />
				<Footer />
			</div>
		);
	}
}
//get defaultdata
ReactDOM.render(<Explore />, document.getElementById("root"));