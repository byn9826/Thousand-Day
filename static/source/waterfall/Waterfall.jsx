import React, {Component} from "react";
import ReactDOM from "react-dom";
import Waterfall from "../snippet/WaterfallReact";
import Header from "../general/Header";
import Footer from "../general/Footer";
class Example extends Component {
    constructor(props) {
        super(props);
		this.state = {
            column: 3,
            id:""
		};
	}
    clickNumber(index) {
        this.setState({id: index});
    }
    changeLayout(event) {
        this.setState({column: parseInt(event.target.value)});
    }
	render() {
		let rootStyle = {
			display: "block",
			width: "100%"
		};
        let mainStyle = {
            display: "inline-block",
            marginLeft: "10%",
            width: "32%",
            verticalAlign: "top",
            marginTop: "40px"
        };
        let containerStyle = {
            display: "inline-block",
            width: "42%",
            marginLeft: "5%",
            verticalAlign: "top",
            marginTop: "40px"
        };
        let images = [
            ["/img/pet/0/moment/0.jpg", "I'm a beauty guy with long legs"],
            ["/img/pet/0/moment/1.jpg", "Boring, sleep"],
            ["/img/pet/0/moment/2.jpg", "Unhappy"],
            ["/img/pet/0/moment/3.jpg", "I'm sunflower"],
            ["/img/pet/0/moment/4.jpg", "Love the bed"],
            ["/img/pet/0/moment/5.jpg", "Just leave me alone"],
            ["/img/pet/0/moment/0.jpg", "I'm a beauty guy with long legs"],
            ["/img/pet/0/moment/1.jpg", "Boring, sleep"],
            ["/img/pet/0/moment/2.jpg", "Unhappy"],
            ["/img/pet/0/moment/3.jpg", "I'm sunflower"],
            ["/img/pet/0/moment/4.jpg", "Love the bed"],
            ["/img/pet/0/moment/5.jpg", "Just leave me alone"]
        ];
		return (
			<div style={rootStyle}>
				<Header />
                <main id="main" style={mainStyle}>
                    <h1>Waterfall-React</h1>
                    <h2>Responsive and Interactive Pinterest Like Image Gallery by React</h2>
					<h3>
						<b>install:</b><br />
						npm install waterfall-react --save
					</h3>
                    <a className="github-button" href="https://github.com/byn9826/WaterfallReact" data-icon="octicon-star" data-style="mega" data-count-href="/byn9826/WaterfallReact/stargazers" data-count-api="/repos/byn9826/WaterfallReact#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star byn9826/WaterfallReact on GitHub">Star</a>
                </main>
                <section style={containerStyle}>
                    <h5>Change the column numbers: </h5><input type="text" value={this.state.column} onChange={this.changeLayout.bind(this)} />
                    <div>Index number of the image you clicked: {this.state.id}</div>
                    <Waterfall column={this.state.column} image={images} clickNumber={this.clickNumber.bind(this)} />
                </section>
				<Footer />
			</div>
		);
	}
}
ReactDOM.render(<Example />, document.getElementById("root"));