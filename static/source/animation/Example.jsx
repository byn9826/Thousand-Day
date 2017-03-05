import React, {Component} from "react";
import ReactDOM from "react-dom";
import Header from "../general/Header";
import Footer from "../general/Footer";
import {InlineAnimation} from "inline-animation";
import Test from "./test";
class AnimationEG extends Component {
	constructor() {
		super();
		this.state = {
            action: null,
			direction: null,
			destiny: null,
			moveLeft: 50,
			moveTop: 50
        };
	}
	action(type) {
		switch (type) {
			case 0:
				this.setState({action: "rotate", direction: "left", destiny: "90"}, () => {this.refs.test.trigger();});
				break;
			case 1:
				this.setState({action: "rotate", direction: "right", destiny: "90"}, () => {this.refs.test.trigger();});
				break;
			case 2:
				this.setState({action: "horizontal", direction: "left", destiny: "100"}, () => {this.refs.test.trigger();});
				break;
			case 3:
				this.setState({action: "horizontal", direction: "right", destiny: "100"}, () => {this.refs.test.trigger();});
				break;
			case 4:
				this.setState({action: "vertical", direction: "top", destiny: "50"}, () => {this.refs.test.trigger();});
				break;
			case 5:
				this.setState({action: "vertical", direction: "bottom", destiny: "50"}, () => {this.refs.test.trigger();});
				break;
			case 6:
				this.setState({action: "fade", direction: "out", destiny: "1"}, () => {this.refs.test.trigger();});
				break;
			case 7:
				this.setState({action: "fade", direction: "in", destiny: "1"}, () => {this.refs.test.trigger();});
				break;
			case 8:
				this.setState({action: "scale", direction: "up", destiny: "0.3"}, () => {this.refs.test.trigger();});
				break;
			case 9:
				this.setState({action: "scale", direction: "down", destiny: "0.3"}, () => {this.refs.test.trigger();});
				break;
			case 10:
				this.setState({action: "move", direction: "center", destiny: [this.state.moveLeft, this.state.moveTop]}, () => {this.refs.test.trigger();});
				break;
		}
	}
	moveLeft(event) {
		this.setState({moveLeft: parseFloat(event.target.value)});
	}
	moveTop(event) {
		this.setState({moveTop: parseFloat(event.target.value)});
	}
	render() {
		let right = {
			position: "absolute",
			clear: "both",
			left: "40%",
			width: "45%",
			height: "500px",
			top: "100px",
			border: "1px dashed #f7d7b4",
			verticalAlign: "top",
			overflow: "hidden"
		};
		let input = {
			width: "20px"
		};
		let style = {
            position: "absolute",
            top: "200px",
            left: "180px",
            padding: "10px 2%",
            width: "120px",
			height: "40px",
			verticalAlign: "middle",
			textAlign: "center",
            marginTop: "40px",
            border: "2px solid #f7d7b4",
            borderRadius: "5px",
			opacity: "1"
        };
        let test = <Test />
		return (
			<div id = "container">
				<Header />
				<main id = "main">
					<h1>Inline-Animation</h1>
					<h2>Inline Animation by React</h2>
					<h3>
						<b>install:</b><br />
						npm install Inline-Animation --save
					</h3>
					<a className = "github-button" href = "https://github.com/byn9826/thousanday-react" data-style = "mega" aria-label = "Star byn9826/thousanday-react on GitHub">Star</a>
					<section>
						<h3 className = "main-list">Play around with these effects:</h3>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 0)}>Rotate to Left 90 deg</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 1)}>Rotate to Right 90 deg</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 2)}>Move to Left 100 px</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 3)}>Move to Right 100 px</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 4)}>Move to Top 50 px</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 5)}>Move to Bottom 50 px</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 6)}>Fade Out completely</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 7)}>Fade In completely</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 8)}>Scale Up 50%</a></h6>
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 9)}>Scale Down 50%</a></h6><br />
						<h6 className = "orange-box"><a href="#" onClick={this.action.bind(this, 10)}>Move center to -> </a></h6>
						<input type="text" value={this.state.moveLeft} style={input} onChange={this.moveLeft.bind(this)} />
						<input type="text" value={this.state.moveTop} style={input} onChange={this.moveTop.bind(this)} /><br />
						<h3 className = "main-list">Other React UI components</h3>
						<h6 className = "orange-box"><a href="http://www.thousanday.com/react">Thousanday-React</a></h6>
					</section>
				</main>
				<section style={right}>
					<InlineAnimation ref="test" action={this.state.action} direction={this.state.direction} component={test} style={style} destiny={this.state.destiny} />
				</section>
				<Footer />
			</div>
		)
	}
};
ReactDOM.render(<AnimationEG />, document.getElementById("root"));
