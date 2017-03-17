import React, {Component} from 'react';
import Postimg from "../snippet/input/Postimg";
class Publish extends Component {
    submitImg(message, img) {
        console.log(message);
        console.log(img);
    }
    render() {
        let containerStyle = {
            display: "block",
            width: "100%",
        };
        return (
            <section style={containerStyle}>
                <Postimg content="" max="150" title="Share your story today" submitImg={this.submitImg.bind(this)} fontFamily="'Rubik', sans-serif" />
            </section>
        );
    }
}
export default Publish;