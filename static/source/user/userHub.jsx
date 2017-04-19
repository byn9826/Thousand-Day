import React, {Component} from "react";
import reqwest from "reqwest";
import noGetGender from "../../js/noGetGender.js";
import noGetType from "../../js/noGetType.js";
import noGetNature from "../../js/noGetNature.js";
import Waterfall from "../snippet/display/Waterfall";
import Inputbox from "../snippet/input/Inputbox";
import Updateprofile from "../snippet/button/Updateprofile";
import Droplist from "../snippet/box/Droplist";
import Getlocation from "../snippet/display/Getlocation";
import Pickgender from "../snippet/box/Pickgender";
class Profile extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //store moment pictures
            moment: this.props.moment,
            //store start point of moment pictures
            showMore: 1,
            //store load moment button message
            showMessage: (this.props.moment.length < 20)? "No more moments": "Click to load more ...",
            //show pop container or not
            showPop: false,
            //add new pet name error
            addError: null,
            //init coordinate of map for create new
            initLocation: [-31.687500000000043, 41.81736507297239]
        };
	}
    //click add new pet button, show pop up box
    addPet() {
        this.setState({showPop: true});
    }
    //close pop box for add new pet
    closeNew() {
        this.setState({showPop: false});
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
    //save location for a pet
    saveLocation(coordinate) {
        console.log(coordinate);
    }
    //result of choose gender
    chooseGender(choice) {
        console.log(choice);
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
                                {/*
                                <div className="hub-pet-belong-info-ability">
                                    <img alt="ability-icon" src="/img/icon/glyphicons-win.png" />
                                    <h6>
                                        Win: {pet.pet_win}<br />
                                    </h6>
                                </div>
                                */}
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
                                {/*
                                <div className="hub-pet-belong-info-ability">
                                    <img alt="ability-icon" src="/img/icon/glyphicons-win.png" />
                                    <h6>
                                        Win: {pet.pet_win}<br />
                                    </h6>
                                </div>
                                */}
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
        //show add new button when user login
        let addNew;
        if (this.props.visitorId == this.props.user.user_id) {
            addNew = (
                <h6 onClick={this.addPet.bind(this)}>+ New</h6>
            );
        }
        //show pop container for add new pet
        let popContainer;
        let popEdit;
        if (this.state.showPop) {
            popContainer = (<div className="pop-background"></div>);
            popEdit = (
                <section id="pop-new">
                    <h5 onClick={this.closeNew.bind(this)}>✗</h5>
                    <h4>Register New Pet</h4>
                    <div className="pop-edit-section">
                        <label htmlFor="pet-name">His/Her name:</label>
                        <Inputbox id="pet-name" ref="petName" content="" max="10" width="200px" fontFamily="'Rubik', sans-serif" />
                        <label>Choose gender:</label>
                        <Pickgender chooseGender={this.chooseGender.bind(this)} fontFamily="'Rubik', sans-serif" />
                    </div>
                    <div className="pop-edit-section">
                        <label htmlFor="pet-type">About Him/Her:</label>
                        <Droplist id="pet-type" width="80%" options={["dog", "cat", "bird", "fish", "other"]} title="His/Her type" showTitle="true" changeValue={null} fontFamily="'Rubik', sans-serif" />
                        <Droplist id="pet-nature" width="80%" options={["cute", "strong", "smart", "beauty"]} title="His/Her nature" showTitle="true" changeValue={null} fontFamily="'Rubik', sans-serif" />
                    </div>
                    <Updateprofile alt="Pet Profile" format="image/png" width="200" saveProfile={null} indicate="Upload Image" fontFamily="'Rubik', sans-serif" />
                    <Getlocation center={this.state.initLocation} indicate="Save Location" zoom="1" setZoom="2" saveLocation={this.saveLocation.bind(this)} fontFamily="'Rubik', sans-serif" />
                </section>
            )
        }
        return (
            <section id="hub">
                <div className="hub-header">
                    <img alt="hub-icon" src="/img/icon/glyphicons-hub.png" />
                    <h4>Pets in hub</h4>
                    {addNew}          
                </div>
                {pets}
                <div className="hub-header">
                    <img alt="moment-icon" src="/img/icon/glyphicons-moment.png" />
                    <h4>Moments</h4>
                </div>
                <Waterfall column="4" image={allImages} link="true" fontFamily="'Rubik', sans-serif" />
                <h5 className={loadStyle} onClick={this.loadMore.bind(this)}>{this.state.showMessage}</h5>
                {popEdit}
                {popContainer}
            </section>
        );
    }
}
export default Profile;