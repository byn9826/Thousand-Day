import React, {Component} from "react";
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
class Love extends Component {
	constructor(props) {
        super(props);
		this.state = {

        }
    }
	
	render() {
		return (
			<div  id="react-root">
				<Header />
				<main id="main">
					
				</main>
				<Footer />
			</div>
		);
	}
}
//get defaultdata
ReactDOM.render(<Love />, document.getElementById("root"));