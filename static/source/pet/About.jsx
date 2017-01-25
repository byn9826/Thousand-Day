import React, {Component} from 'react';
import Like from '../snippet/attitude/Like';
class About extends Component {
    constructor(props) {
        super(props);
		this.state = {
            like: 0
		};
	}
    updateLike(change) {
        let like = this.state.like;
        this.setState({like: like + change});
        console.log(this.state.like);
    }
    render() {
        return(
            <main id="about">
                <img alt = {this.props.data.title} src = {"/img/pet/" + this.props.data.id + "/" + this.props.data.profile + ".jpg"} />
                <h1>{this.props.data.name}</h1>
                <h5>♂</h5>
                <Like agree={this.state.like} newTotal={this.updateLike.bind(this)}/>
                <h4><b>Point: {this.props.data.point}</b></h4>
                <h4><b>Nature: {this.props.data.nature}</b></h4>
                <h4>Type: {this.props.data.type}</h4>
                <h4>Reg in hub: {this.props.data.day}</h4>
            </main>
        );
    }
}
export default About;