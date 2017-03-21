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
            moment: this.props.moment,
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
                type: "json",
                method: "POST",
                contentType: "application/json", 
                headers: {"X-My-Custom-Header": "SomethingImportant"},
                data: JSON.stringify({"petId": this.props.pet.pet_id, "showMore": this.state.showMore, "addOne": this.state.addOne}),
                success: function(result) {
                    //use to update load times
                    let newShow = this.state.showMore + 1;
                    switch(result.Result) {
                        case 0:
                            //no more moment to load
                            this.setState({showMore: newShow, showMessage: "No more moments"});
                            break;
                        case 1:
                            this.setState({showMore: newShow, showMessage: "Can't load, try later"});
                            break;
                        default:
                            //Update moment array
                            let moment = this.state.moment;
                            moment = moment.concat(result);
                            if (result.length < 20) {
                                this.setState({showMore: newShow, moment: moment, showMessage: "No more moments"});
                            } else {
                                this.setState({showMore: newShow, moment: moment});
                            }
                            break;
                    }
                }.bind(this),
                error: function (err) {
                    console.log("Can't connect, try later");
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
    render() {
        let displayStyle = {
            display: "inline-block",
            width: "55%",
            marginLeft: "6%",
            marginTop: "100px",
            verticalAlign: "top"
        };
        let publish;
        if (this.props.userId == this.props.pet.owner_id || this.props.userId == this.props.pet.relative_id) {
            publish = <Publish uploadNew={this.uploadNew.bind(this)} />;
        }
        return (
            <section style={displayStyle}>
                <Ability userId={this.props.userId} pet={this.props.pet} />
                <Skill userId={this.props.userId} pet={this.props.pet} />
                {publish}
                <Moment petId={this.props.pet.pet_id} moment={this.state.moment} showMessage={this.state.showMessage} loadMore={this.loadMore.bind(this)} />
            </section>
        );
    }
}
export default Display;