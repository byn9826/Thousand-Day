import React, {Component} from "react";
import reqwest from "reqwest";
import Team from "./aboutTeam";
import Ovaledit from "../snippet/button/Ovaledit";
import Getlocation from "../snippet/display/Getlocation";
import noGetGender from "../../js/noGetGender.js";
import noGetNature from "../../js/noGetNature.js";
import noGetType from "../../js/noGetType.js";
class About extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //Store pet watcher id
            watcher: this.props.watcher,
            //If edit button should show or not
            showEdit: false
		};
	}
    //Watch or unwatch pet
    watchPet() {
        let currentIndex = this.state.watcher.indexOf(this.props.userId);
        let prevWatch = this.state.watcher.slice();
        let newWatch = this.state.watcher.slice();
        let addWatch;
        //If watched before, unwatch it
        if (currentIndex !== -1 ) {
            newWatch.splice(currentIndex, 1);
            this.setState({watcher: newWatch});
            addWatch = false;
        } else {
            //watch it if not watch before
            newWatch.push(this.props.userId);
            this.setState({watcher: newWatch});
            addWatch = true;
        }
        //Update db
        reqwest({
            url: "/pet/updateWatch",
            type: "json",
            method: "POST",
            contentType: "application/json", 
            headers: {"X-My-Custom-Header": "SomethingImportant"},
            data: JSON.stringify({"petId": this.props.pet.pet_id, "addWatch": addWatch}),
            success: function(result) {
                if (result.Result === 1) {
                    //Roll back watch list if error
                    this.setState({watcher: prevWatch});
                    console.log("Something Wrong");
                }
            }.bind(this),
            error: function (err) {
                //Roll back watch list if error
                this.setState({watcher: prevWatch});
                console.log("Something Wrong");
            }.bind(this)
        });
    }
    //Show edit button
    showEdit() {
        this.setState({showEdit: true});
    }
    //Hide edit button
    hideEdit() {
        this.setState({showEdit: false});
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
            borderRadius: "10px",
            marginBottom: "20px"
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
        let editPet;
        //Show edit button only when mouse hover and user is the pet owners
        if ((this.props.userId == this.props.pet.owner_id || this.props.userId == this.props.pet.relative_id) && this.state.showEdit === true) {
            editPet = <Ovaledit value="Edit" fontFamily="'Rubik', sans-serif" href={"/edit/pet/" + this.props.pet.pet_id} />
        }
        let watchPet;
        //If current user already watched this pet
        if (this.state.watcher.indexOf(this.props.userId) !== -1 ) {
            watchPet = "Watched | by " + this.state.watcher.length;
        } else {
            watchPet = "+ Watch | by " + this.state.watcher.length;
        }
        return(
            <main style={aboutStyle} onMouseEnter={this.showEdit.bind(this)} onMouseLeave={this.hideEdit.bind(this)}>
                <img style={aboutProfileStyle} alt={this.props.pet.pet_name} src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.png"} />
                <div style={aboutLineStyle}>
                    <h1 style={titleNameStyle}>{this.props.pet.pet_name}</h1>
                    <h4 style={titleGenderStyle}>{noGetGender(this.props.pet.pet_gender)}</h4>
                    {/*Show edit button on mouse hover*/}
                    {editPet}
                </div>
                {/*Watch or unwatch pet when user click*/}
                <h5 style={aboutWatchStyle} onClick={this.watchPet.bind(this)}>{watchPet}</h5>
                <h5 style={aboutFirstStyle}>Nature: {noGetNature(this.props.pet.pet_nature)}</h5>
                <h5 style={aboutDetailStyle}>Type: {noGetType(this.props.pet.pet_type)}</h5>
                <h5 style={aboutDetailStyle}>Reg in hub: {new Date(this.props.pet.pet_reg).toISOString().substring(0, 10)}</h5>
                <div style={aboutDetailStyle}>
                    <Getlocation center={[this.props.pet.location_lon, this.props.pet.location_lat]} width="150" height="150" zoom="10" display="true" />
                </div>
                <Team owner={this.props.owner} companion={this.props.companion} />
            </main>
        );
    }
}
export default About;