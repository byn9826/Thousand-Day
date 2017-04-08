import React, {Component} from "react";
import reqwest from "reqwest";
import noGetGender from "../../js/noGetGender.js";
import noGetType from "../../js/noGetType.js";
import noGetNature from "../../js/noGetNature.js";
import Waterfall from "../snippet/display/Waterfall";
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //store moment pictures
            moment: this.props.moment,
            //store start point of moment pictures
            showMore: 1,
            //store load moment button message
            showMessage: (this.props.moment.length < 20)? "No more moments": "Click to load more ..."
		};
	}
    //load more picture
    loadMore() {
        //only response when there's more picture
        if (this.state.showMessage == "Click to load more ...") {
            reqwest({
                url: "/user/loadMoment",
                method: "POST",
                type: "json",
                contentType: "application/json", 
                headers: {"X-My-Custom-Header": "SomethingImportant"},
                data: JSON.stringify({"petsList": this.props.petsList, "showMore": this.state.showMore}),
                success: function(result) {
                    let newShow = this.state.showMore + 1;
                    switch (result) {
                        case 0:
                            console.log("Db error");
                            break;
                        case 1:
                            //no more to load
                            this.setState({showMore: newShow, showMessage: "No more moments"});
                            break;
                        default:
                            //Update moment array
                            let moment = this.state.moment.concat(result);
                            //Check moment length
                            if (result.length < 20) {
                                this.setState({showMore: newShow, moment: moment, showMessage: "No more moments"});
                            } else {
                                this.setState({showMore: newShow, moment: moment});
                            }
                    }
                }.bind(this),
                error: function (err) {
                    console.log("Can't connect to server");
                }
            });
        }
    }
    render() {
        //show cursor when could load more moment
        let loadStyle;
        if (this.state.showMessage == "Click to load more ...") {
            loadStyle = "hub-load";
        } else {
            loadStyle = "hub-load-hide";
        }
        //Show all pets
        let pets;
        //if not pets right now
        if (this.props.pet.length === 0) {
            pets = (
                <div className="hub-pet">
                    <h6>No pets right now ...</h6>
                </div>
            )
        } else {
            // if visitor is the user of this page, show edit button
            if (this.props.visitorId == this.props.user.user_id) {
                pets = this.props.pet.map((pet, index) =>
                    <div key={"petdetail" + index} className="hub-pet">
                        <a href={"/pet/" + pet.pet_id}>
                            <img className="hub-pet-profile" alt={pet.pet_name} src={"/img/pet/" + pet.pet_id + "/cover/0.png"} />
                        </a>
                        <div className="hub-pet-belong">
                            <a className="hub-pet-belong-button" href={"/edit/pet/" + pet.pet_id}><h6>Edit</h6></a>
                            <div className="hub-pet-belong-info">
                                <h6 className="hub-pet-belong-info-type">{noGetType(pet.pet_type)}</h6>
                                <a href={"/pet/" + pet.pet_id}><h5 className="hub-pet-belong-info-name">{pet.pet_name}</h5></a>
                                <h6 className="hub-pet-belong-info-gender">{noGetGender(pet.pet_gender)} {noGetNature(pet[4])}</h6>
                            </div>
                            <div className="hub-pet-belong-info">
                                <div className="hub-pet-belong-info-ability">
                                    <img alt="ability-icon" src="/img/icon/glyphicons-ability.png" />
                                    <h6>
                                        Ability: {pet.pet_ability}<br />
                                    </h6>
                                </div>
                                <div className="hub-pet-belong-info-ability">
                                    <img alt="ability-icon" src="/img/icon/glyphicons-moment.png" />
                                    <h6>
                                        Potential: {pet.pet_potential}<br />
                                    </h6>
                                </div>
                                <div className="hub-pet-belong-info-ability">
                                    <img alt="ability-icon" src="/img/icon/glyphicons-win.png" />
                                    <h6>
                                        Win: {pet.pet_win}<br />
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                //if visitor is not user of current page hide edit button
                pets = this.props.pet.map((pet, index) =>
                    <div key={"petdetail" + index} className="hub-pet">
                        <a href={"/pet/" + pet.pet_id}>
                            <img className="hub-pet-profile" alt={pet.pet_name} src={"/img/pet/" + pet.pet_id + "/cover/0.png"} />
                        </a>
                        <div className="hub-pet-belong">
                            <div className="hub-pet-belong-info">
                                <h6 className="hub-pet-belong-info-type">{noGetType(pet.pet_type)}</h6>
                                <a href={"/pet/" + pet.pet_id}><h5 className="hub-pet-belong-info-name">{pet.pet_name}</h5></a>
                                <h6 className="hub-pet-belong-info-gender">{noGetGender(pet.pet_gender)} {noGetNature(pet[4])}</h6>
                            </div>
                            <div className="hub-pet-belong-info">
                                <div className="hub-pet-belong-info-ability">
                                    <img alt="ability-icon" src="/img/icon/glyphicons-ability.png" />
                                    <h6>
                                        Ability: {pet.pet_ability}<br />
                                    </h6>
                                </div>
                                <div className="hub-pet-belong-info-ability">
                                    <img alt="ability-icon" src="/img/icon/glyphicons-moment.png" />
                                    <h6>
                                        Potential: {pet.pet_potential}<br />
                                    </h6>
                                </div>
                                <div className="hub-pet-belong-info-ability">
                                    <img alt="ability-icon" src="/img/icon/glyphicons-win.png" />
                                    <h6>
                                        Win: {pet.pet_win}<br />
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        let allImages = [];
        for (let i = 0; i < this.state.moment.length; i++) {
            allImages[i] = [];
            allImages[i][0] = "/img/pet/" + this.state.moment[i].pet_id + "/moment/" + this.state.moment[i].image_name;
            allImages[i][1] = this.state.moment[i].moment_message;
            allImages[i][2] = "/moment/" + this.state.moment[i].moment_id;
        }
        return (
            <section id="hub">
                <div className="hub-header">
                    <img alt="hub-icon" src="/img/icon/glyphicons-hub.png" />
                    <h4>Pets in hub</h4>
                </div>
                {pets}
                <div className="hub-header">
                    <img alt="moment-icon" src="/img/icon/glyphicons-moment.png" />
                    <h4>Moments</h4>
                </div>
                <Waterfall column="4" image={allImages} link="true" fontFamily="'Rubik', sans-serif" />
                <h5 className={loadStyle} onClick={this.loadMore.bind(this)}>{this.state.showMessage}</h5>
            </section>
        );
    }
}
export default Profile;