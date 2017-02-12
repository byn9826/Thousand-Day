import React, {Component} from "react";
import Waterfall from "waterfall-react";
import Like from "../snippet/attitude/Like";
class Moment extends Component {
    constructor(props) {
        super(props);
		this.state = {
            moment: this.props.moment,
            active: ""
		};
	}
    clickNumber(index) {
        console.log(index);
    }
    render() {
        let momentStyle = {
            display: "block",
            padding: "0px 2%",
            width: "96%",
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
            <section style={momentStyle}>
                <Waterfall column="3" image={images} clickNumber={this.clickNumber.bind(this)} />
            </section>
        );
    }
}
export default Moment;