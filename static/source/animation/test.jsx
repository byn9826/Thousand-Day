import React, {Component} from "react";
class Test extends Component {
    render() {
        return (
            <section style={this.props.style} onClick={this.props.animation.bind(this)} >
                Test
            </section>
        );
    }
}
export default Test;