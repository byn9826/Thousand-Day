import React, {Component} from "react";
import Publish from "./displayPublish";
import Ability from "./displayAbility";
import Skill from "./displaySkill";
import Moment from "./displayMoment";
import reqwest from "reqwest";
import Progress from "../snippet/display/Progress";
class Display extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //store moment info to display
            moment: this.props.moment,
            //store how many moment have be added
            addOne: 0,
            //store moment load times
            showMore: 1,
            //store load moment message
            showMessage: (this.props.moment.length < 20)? "No more moments": "Click to load more ..."
		};
	}
    //load more picture
    loadMore() {
        //only load when there's more pic to load
        if (this.state.showMessage == "Click to load more ...") {
            reqwest({
                url: "/pet/loadMoment",
                method: "POST",
                data: {"petId": this.props.pet.pet_id, "showMore": this.state.showMore, "addOne": this.state.addOne},
                success: function(result) {
                    let moment = this.state.moment;
                    switch (result) {
                        case "0":
                            console.log("Can't connect to db");
                            break;
                        default:
                            //disable load when not more result
                            if (result.length == 0) {
                                this.setState({showMore: this.state.showMore + 1, showMessage: "No more moments"});
                            } else if (result.length < 20) {
                                moment = moment.concat(result);
                                this.setState({showMore: this.state.showMore + 1, moment: moment, showMessage: "No more moments"});
                            } else {
                                moment = moment.concat(result);
                                this.setState({showMore: this.state.showMore + 1, moment: moment});
                            }
                    }
                }.bind(this),
                error: function (err) {
                    console.log("Can't connect to server, try later");
                }
            });
       }
    }
    //update moment component after new post
    uploadNew(moment) {
        let oldMoment = this.state.moment;
        oldMoment.unshift(moment);
        let addOne = this.state.addOne + 1;
        this.setState({moment: oldMoment, addOne: addOne});
    }
    //update potent when submit image first time per day
    upPotent() {
        let newNumber = this.refs.displayAbility.state.potential + 1;
        this.refs.displayAbility.setState({potential: newNumber, prevPotential: newNumber});
    }
    render() {
        //show publish image section when visitor is pet owner or relative
        let publish;
        if ((this.props.visitorId === this.props.pet.owner_id || this.props.visitorId === this.props.pet.relative_id) && this.props.visitorId) {
            publish = <Publish uploadNew={this.uploadNew.bind(this)} potent={this.props.potent} upPotent={this.upPotent.bind(this)} />;
        }
        return (
            <section id="display">
                <Ability ref="displayAbility" visitorId={this.props.visitorId} pet={this.props.pet} />
                <Skill pet={this.props.pet} />
                {publish}
                <Moment petId={this.props.pet.pet_id} moment={this.state.moment} showMessage={this.state.showMessage} loadMore={this.loadMore.bind(this)} />
            </section>
        );
    }
}
export default Display;