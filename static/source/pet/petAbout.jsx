import React, {Component} from 'react';
import getGender from '../../js/getGender.js';
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
        let aboutStyle = {
            display: "inline-block",
            width: "18%",
            marginLeft: "10%",
            marginTop: "50px"
        };
        let aboutProfileStyle = {
            display: "block",
            width: "100%",
            borderRadius: "5px"
        };
        let aboutLineStyle = {
            display: "block",
            width: "90%",
            margin: "10px 5%"
        };
        let titleNameStyle = {
            display: "inline-block",
            marginRight: "5%",
            verticalAlign: "middle"
        };
        let titleGenderStyle = {
            display: "inline-block",
            verticalAlign: "middle"
        };
        let aboutTypeStyle = {
            display: "block",
            width: "90%",
            marginLeft: "5%",
            marginTop: "15px",
            marginBottom: "8px",
            paddingTop: "10px",
            borderTop: "1px solid #e5e5e5",
            fontWeight: "bold"
        };
        let aboutDetailStyle = {
            display: "block",
            width: "90%",
            margin: "8px 5%"
        };
        let petGender = getGender(parseInt(this.props.data.gender));
        return(
            <main style={aboutStyle}>
                <img alt = {this.props.data.name} src = {"/img/pet/" + this.props.data.id + "/" + this.props.data.profile + ".jpg"} style={aboutProfileStyle} />
                <div style={aboutLineStyle}>
                    <h1 style={titleNameStyle}>{this.props.data.name}</h1>
                    <h4 style={titleGenderStyle}>{petGender}</h4>
                </div>
                <div style={aboutLineStyle}>
                    <Like agree={this.state.like} newTotal={this.updateLike.bind(this)}/>
                </div>
                <h5 style={aboutTypeStyle}>Nature: {this.props.data.nature}</h5>
                <h5 style={aboutDetailStyle}>Type: {this.props.data.type}</h5>
                <h5 style={aboutDetailStyle}>Reg in hub: {this.props.data.reg}</h5>
            </main>
        );
    }
}
export default About;