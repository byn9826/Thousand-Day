import React, {Component} from "react";
import reqwest from "reqwest";
import Team from "./aboutTeam";
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
            //if current user not login
            visitor: false
		};
	}
    //Watch or unwatch pet
    watchPet() {
        let currentIndex = this.state.watcher.indexOf(this.props.userId);
        let prevWatch = this.state.watcher.slice();
        let newWatch = this.state.watcher.slice();
        let addWatch;
        if (!this.props.userId) {
            this.setState({visitor: true});
            return false;
        }
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
        let watchPet;
        //If current user already watched this pet
        if (this.state.visitor) {
            watchPet = "Please login";
        } else if (this.state.watcher.indexOf(this.props.userId) !== -1 ) {
            watchPet = "Watched | by " + this.state.watcher.length;
        } else {
            watchPet = "+ Watch | by " + this.state.watcher.length;
        }
        return(
            <main style={aboutStyle}>
                <img style={aboutProfileStyle} alt={this.props.pet.pet_name} src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.png"} />
                <div style={aboutLineStyle}>
                    <h1 style={titleNameStyle}>{this.props.pet.pet_name}</h1>
                    <h4 style={titleGenderStyle}>{noGetGender(this.props.pet.pet_gender)}</h4>
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