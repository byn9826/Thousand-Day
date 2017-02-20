import React, {Component} from "react";
import reqwest from "reqwest";
import Team from "./aboutTeam";
import ModifyPet from "./ModifyPet";
import Updateprofile from "../snippet/button/Updateprofile";
import Ovaledit from "../snippet/button/Ovaledit";
import noGetGender from "../../js/noGetGender.js";
import noGetNature from "../../js/noGetNature.js";
import noGetType from "../../js/noGetType.js";
import noGetLocation from "../../js/noGetLocation.js";
class About extends Component {
    constructor(props) {
        super(props);
		this.state = {
            name: this.props.pet.pet_name,
            watcher: this.props.watcher,
            location: this.props.pet.pet_location,
            showEdit: false,
            editPet: false
		};
	}
    watchPet() {
        let currentIndex = this.state.watcher.indexOf(this.props.userId);
        let newWatch = this.state.watcher;
        if (currentIndex !== -1 ) {
            newWatch.splice(currentIndex, 1);
            this.setState({watcher: newWatch});
        } else {
            newWatch.push(this.props.userId);
            this.setState({watcher: newWatch});
        }
        console.log(newWatch);
        {/*
        reqwest({
            url: "/pet/updateWatch",
            type: "json",
            method: "POST",
            contentType: 'application/json', 
            headers: {'X-My-Custom-Header': 'SomethingImportant'},
            data: JSON.stringify({"id": this.props.userId, "watch": newWatch})
        });
        */}
    }
    showEdit() {
        this.setState({showEdit: true});
    }
    hideEdit() {
        this.setState({showEdit: false});
    }
    clickEdit() {
        this.setState({editPet: true});
    }
    saveProfile(finalUrl) {
        let formData = new FormData();
        formData.append('file', finalUrl, "7.png");
        reqwest({
            url: "/upate/petProfile",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false
        });
    }
    render() {
        let aboutStyle = {
            display: "inline-block",
            width: "18%",
            marginLeft: "10%",
            marginTop: "100px",
            verticalAlign: "top"
        };
        let aboutProfileStyle = {
            display: "block",
            width: "100%",
            borderRadius: "10px"
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
        let aboutWatchStyle = {
            display: "block",
            textAlign: "center",
            fontweight: "bold",
            backgroundColor: "#ef8513",
            borderRadius: "5px",
            width: "70%",
            padding: "5px 0",
            marginLeft: "5%",
            marginBottom: "20px",
            color: "white",
            cursor: "pointer"
        };
        let aboutFirstStyle = {
            display: "block",
            width: "90%",
            marginLeft: "5%",
            marginTop: "15px",
            marginBottom: "8px",
            paddingTop: "15px",
            borderTop: "1px solid #e5e5e5",
            fontWeight: "bold"
        };
        let aboutDetailStyle = {
            display: "block",
            width: "90%",
            margin: "8px 5%"
        };
        let aboutLastStyle = {
            display: "block",
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "8px",
            paddingBottom: "20px",
            borderBottom: "1px solid #e5e5e5"
        };
        let editPet;
        if ((this.props.userId == this.props.pet.owner_id || this.props.userId == this.props.pet.relative_id) && this.state.showEdit === true) {
            editPet = <Ovaledit value="Edit" clickEdit={this.clickEdit.bind(this)} />
        }
        let watchPet;
        if (this.state.watcher.indexOf(this.props.userId) !== -1 ) {
            watchPet = "Watched | by " + this.state.watcher.length;
        } else {
            watchPet = "+ Watch | by " + this.state.watcher.length;
        }
        let fullEdit;
        if (this.state.editPet) {
            fullEdit = (<ModifyPet pet={this.props.pet} />)
        }
        return(
            <main style={aboutStyle} onMouseEnter={this.showEdit.bind(this)} onMouseLeave={this.hideEdit.bind(this)}>
                {fullEdit}
                <Updateprofile src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.jpg"} width="200" saveProfile={this.saveProfile.bind(this)} />
                <img style={aboutProfileStyle} alt={this.state.name} src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.jpg"} />
                <div style={aboutLineStyle}>
                    <h1 style={titleNameStyle}>{this.state.name}</h1>
                    <h4 style={titleGenderStyle}>{noGetGender(this.props.pet.pet_gender)}</h4>
                    {editPet}
                </div>
                <h5 style={aboutWatchStyle} onClick={this.watchPet.bind(this)}>{watchPet}</h5>
                <h5 style={aboutFirstStyle}>Nature: {noGetNature(this.props.pet.pet_nature)}</h5>
                <h5 style={aboutDetailStyle}>Type: {noGetType(this.props.pet.pet_type)}</h5>
                <h5 style={aboutDetailStyle}>Location: {noGetLocation(this.state.location)}</h5>
                <h5 style={aboutLastStyle}>Reg in hub: {new Date(this.props.pet.pet_reg).toISOString().substring(0, 10)}</h5>
                <Team owner={this.props.owner} companion={this.props.companion} />
            </main>
        );
    }
}
export default About;