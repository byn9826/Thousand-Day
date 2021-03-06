import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
class Watch extends Component {
	constructor(props) {
        super(props);
		this.state = {
			//store login user id
			visitorId: this.props.visitorId,
			//store most recent 10 public moment
			recent: this.props.recentTen,
			//store most recent 20 watch moment
			watch: null,
			//store most recent 20 love moment
			love: null,
			//store most recent 20 comments
			comment: null,
			//store content on load more button
			loadContent: "Load more ..",
			//store which list the user chosed
			loadList: "recent",
			//load how many times
			loadTimes: 1
		};
	}
	//login success, init everything
	loginSuccess(id) {
		this.setState({visitorId: id, recent: this.state.recent.slice(0, 10), loadContent: "Load more ..", loadList: "recent", loadTimes: 1});
	}
	//logout, roll back everything
	logOut() {
		this.setState({visitorId: null, recent: this.state.recent.slice(0, 10), watch: null, love:null, loadContent: "Load more ..", loadList: "recent", loadTimes: 1})
	}
	//user click load more button
	loadMoment() {
		if (this.state.loadContent === "Load more ..") {
			reqwest({
				url: "/watch/loadMoment",
				method: "POST",
				data: {"type": this.state.loadList, "time": this.state.loadTimes},
				success: function(result) {
					switch (result) {
						case "0":
							this.setState({loadContent: "Can't get data, try later"});
							break;
						default:
							if (this.state.loadList === "recent") {
								let newData = this.state.recent.concat(result);
								this.setState({recent: newData, loadTimes: this.state.loadTimes + 1});
								//close load button
								if (result.length !== 10) {
									this.setState({loadContent: "No more moments .."});
								}
							} else if (this.state.loadList === "watch") {
								let newData = this.state.watch.concat(result);
								this.setState({watch: newData, loadTimes: this.state.loadTimes + 1});
								//close load button
								if (result.length !== 20) {
									this.setState({loadContent: "No more moments .."});
								}
							} else if (this.state.loadList === "love") {
								let newData = this.state.love.concat(result);
								this.setState({love: newData, loadTimes: this.state.loadTimes + 1});
								//close load button
								if (result.length !== 20) {
									this.setState({loadContent: "No more moments .."});
								}
							} else if (this.state.loadList === "comment") {
								let newData = this.state.comment.concat(result);
								this.setState({comment: newData, loadTimes: this.state.loadTimes + 1});
								//close load button
								if (result.length !== 20) {
									this.setState({loadContent: "No more moments .."});
								}
							}
					}
				}.bind(this),
				error: function (err) {
					this.setState({loadContent: "Can't connect to server .."});
				}.bind(this)
			});
		}
	}
	//user click change list
	changeList(list) {
		if (list !== this.state.loadList) {
			//change to recent list
			if (list === "recent") {
				this.setState({loadTimes: 1, loadList: "recent", recent: this.state.recent.slice(0, 10), loadContent: "Load more .."});
			} else if (list === "watch") {
				//change to watch list
				if (this.state.watch) {
					let newList = this.state.watch.slice(0, 20);
					this.setState({loadTimes: 1, loadList: "watch", watch: newList, loadContent: (newList.length === 20)?"Load more ..": "No more moments .."});
				} else {
					//init watch moment for login user
					if (this.state.visitorId) {
						reqwest({
							url: "/watch/loadMoment",
							method: "POST",
							data: {"type": "watch", "time": 0},
							success: function(result) {
								switch (result) {
									case "0":
										this.setState({loadContent: "Can't get data, try later"});
										break;
									case "1":
										this.setState({loadContent: "Please login first"});
										break;
									default:
										this.setState({loadTimes: 1, loadList: "watch", watch: result, loadContent: (result.length === 20) ?"Load more ..": "No more moments .."});
								}
							}.bind(this),
							error: function (err) {
								this.setState({loadContent: "Can't connect to server .."});
							}.bind(this)
						});
					} else {
						this.setState({loadTimes: 1, loadList: "watch", loadContent: "Please login first .."});
					}
				}
			} else if (list === "love") {
				//change to love list
				if (this.state.love) {
					let newList = this.state.love.slice(0, 20);
					this.setState({loadTimes: 1, loadList: "love", love: newList, loadContent: (newList.length === 20)?"Load more ..": "No more moments .."});
				} else {
					//init watch moment for login user
					if (this.state.visitorId) {
						reqwest({
							url: "/watch/loadMoment",
							method: "POST",
							data: {"type": "love", "time": 0},
							success: function(result) {
								switch (result) {
									case "0":
										this.setState({loadContent: "Can't get data, try later"});
										break;
									case "1":
										this.setState({loadContent: "Please login first"});
										break;
									default:
										this.setState({loadTimes: 1, loadList: "love", love: result, loadContent: (result.length === 20) ?"Load more ..": "No more moments .."});
								}
							}.bind(this),
							error: function (err) {
								this.setState({loadContent: "Can't connect to server .."});
							}.bind(this)
						});
					} else {
						this.setState({loadTimes: 1, loadList: "love", loadContent: "Please login first .."});
					}
				}
			} else if (list === "comment") {
				//change to comment list
				if (this.state.comment) {
					let newList = this.state.comment.slice(0, 20);
					this.setState({loadTimes: 1, loadList: "comment", comment: newList, loadContent: (newList.length === 20)?"Load more ..": "No more moments .."});
				} else {
					//init watch moment for login user
					if (this.state.visitorId) {
						reqwest({
							url: "/watch/loadMoment",
							method: "POST",
							data: {"type": "comment", "time": 0},
							success: function(result) {
								switch (result) {
									case "0":
										this.setState({loadContent: "Can't get data, try later"});
										break;
									case "1":
										this.setState({loadContent: "Please login first"});
										break;
									default:
										this.setState({loadTimes: 1, loadList: "comment", comment: result, loadContent: (result.length === 20) ?"Load more ..": "No more moments .."});
								}
							}.bind(this),
							error: function (err) {
								this.setState({loadContent: "Can't connect to server .."});
							}.bind(this)
						});
					} else {
						this.setState({loadTimes: 1, loadList: "comment", loadContent: "Please login first .."});
					}
				}
			}
		}
	}
	render() {
		let allMoment;
		if (this.state.loadList === "recent") {
			allMoment = this.state.recent;
		} else if (this.state.loadList === "watch") {
			allMoment = this.state.watch? this.state.watch: [];
		} else if (this.state.loadList === "love") {
			allMoment = this.state.love? this.state.love: [];
		} else if (this.state.loadList === "comment") {
			allMoment = this.state.comment? this.state.comment: [];
		}
		let moment = allMoment.map((recent, index) =>
			<section key={"thousandaylovemoment" + index} className="main-moment">
				<a href={"/moment/" + recent.moment_id}>
					<div className="main-moment-img" style={{backgroundImage: "url(/img/pet/" + recent.pet_id + "/moment/" + recent.image_name + ")"}}></div>
				</a>
				<div className="main-moment-container">
					<h4>{recent.moment_message}</h4>
					<a href={"/pet/" + recent.pet_id}>
						<img alt="Pet" src={"/img/pet/" + recent.pet_id + "/cover/0.png"} />
					</a>
					<h7>{new Date(recent.moment_date).toISOString().substring(0, 10)}</h7>
				</div>
			</section>
		)
		return (
			<div  id="react-root">
				<Header visitorId={this.props.visitorId} visitorName={this.props.visitorName} loginSuccess={this.loginSuccess.bind(this)} logOut={this.logOut.bind(this)} unread={this.props.unread} />
				<aside id="aside">
					<h2>Welcome!</h2>
					<h4>Choose a list to watch love Moments ⇋</h4>
					<section>
						<div onClick={this.changeList.bind(this, "recent")} className="aside-section" style={this.state.loadList === "recent"? {backgroundColor: "#ef8513"}: {backgroundColor: "#e5e5e5"}}>
							<img alt="Recent" src="/img/icon/glyphicons-moment.png" />
							<h7>New moments in public</h7>
						</div>
						<div onClick={this.changeList.bind(this, "watch")} className="aside-section" style={this.state.loadList === "watch"? {backgroundColor: "#ef8513"}: {backgroundColor: "#e5e5e5"}}>
							<img alt="Watch" src="/img/icon/glyphicons-watch.png" />
							<h7>On your watch list</h7>
						</div>
						<div onClick={this.changeList.bind(this, "love")} className="aside-section" style={this.state.loadList === "love"? {backgroundColor: "#ef8513"}: {backgroundColor: "#e5e5e5"}}>
							<img alt="Love" src="/img/icon/glyphicons-love.png" />
							<h7>Moments you love</h7>
						</div>
						<div onClick={this.changeList.bind(this, "comment")} className="aside-section" style={this.state.loadList === "comment"? {backgroundColor: "#ef8513"}: {backgroundColor: "#e5e5e5"}}>
							<img alt="Comment" src="/img/icon/glyphicons-comment.png" />
							<h7>Where you commented</h7>
						</div>
					</section>
				</aside>
				<main id="main">
					{moment}
					<h6 style={this.state.loadContent === "Load more .."? {cursor: "pointer"}: null} onClick={this.loadMoment.bind(this)}>{this.state.loadContent}</h6>
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
		//get default data
		switch (result) {
			case "0":
				alert("Can't connet to server, try later");
				break;
			default:
				ReactDOM.render(<Watch recentTen={result[0]} visitorName={result[1]} visitorId={result[2]} unread={result[3]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		alert("Can't connet to server, try later");
	}
});
