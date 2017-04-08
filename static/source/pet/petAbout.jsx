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
            //Store pet watcher id list
            watcher: this.props.watcher,
            //if current user not login
            notLogin: false
		};
	}
    //Watch or unwatch pet
    watchPet() {
        //if user not login, require login
        if (!this.props.visitorId) {
            this.setState({notLogin: true});
        } else  {
            //if visitor id exsit in watcher list
            let currentIndex = this.state.watcher.indexOf(this.props.visitorId);
            //copy new array for change
            let newWatch = this.state.watcher.slice();
            //add watch or remove watch
            let addWatch;
            if (currentIndex !== -1 ) {
                //unwatch if already watched
                newWatch.splice(currentIndex, 1);
                addWatch = false;
            } else {
                //watch it if not watch before
                newWatch.push(this.props.visitorId);
                addWatch = true;
            }
            //Update db
            reqwest({
                url: "/pet/updateWatch",
                method: "POST",
                data: {"petId": this.props.pet.pet_id, "addWatch": addWatch},
                success: function(result) {
                    switch (result) {
                        case "0":
                            console.log("Must Login");
                            break;
                        case "1":
                            this.setState({watcher: newWatch, notLogin: false});
                            break;
                        case "2":
                            console.log("Can't connect to db");
                            break;
                    }
                }.bind(this),
                error: function (err) {
                    console.log("Can't connect to server");
                }
            });
        }
    }
    render() {
        //content show in watch pet button
        let watchPet;
        if (this.state.notLogin && !this.props.visitorId) {
            //if visitor not login click add watch
            watchPet = "Please login";
        } else if (this.state.watcher.indexOf(this.props.visitorId) !== -1 ) {
            //if visitor already watch this pet
            watchPet = "Watched | by " + this.state.watcher.length;
        } else {
            //if visitor not watch this pet
            watchPet = "+ Watch | by " + this.state.watcher.length;
        }
        return(
            <main id="main">
                <img id="main-profile" alt={this.props.pet.pet_name} src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.png"} />
                <div id="main-name">
                    <h1>{this.props.pet.pet_name}</h1>
                    <h4>{noGetGender(this.props.pet.pet_gender)}</h4>
                </div>
                <h5 id="main-watch" onClick={this.watchPet.bind(this)}>{watchPet}</h5>
                <h5 id="main-nature">Nature: {noGetNature(this.props.pet.pet_nature)}</h5>
                <h5 className="main-title">Type: {noGetType(this.props.pet.pet_type)}</h5>
                <h5 className="main-title">Reg in hub: {new Date(this.props.pet.pet_reg).toISOString().substring(0, 10)}</h5>
                <div className="main-title">
                    <Getlocation center={[this.props.pet.location_lon, this.props.pet.location_lat]} width="150" height="150" zoom="2" display="true" />
                </div>
                <Team owner={this.props.owner} companion={this.props.companion} />
            </main>
        );
    }
}
export default About;