import React, {Component} from "react";
import Waterfall from "../snippet/display/Waterfall";
class Moment extends Component {
    render() {
        //Get all images infos
        let allImages = [];
        for (let i = 0; i < this.props.moment.length; i++) {
            allImages[i] = [];
            //get all image src
            allImages[i][0] = "/img/pet/" + this.props.petId + "/moment/" + this.props.moment[i][1];
            //get all image message
            allImages[i][1] = this.props.moment[i][2];
            //get all a href address
            allImages[i][2] = "/moment/" + this.props.moment[i][0];
        }
        let loadStyle;
        if (this.props.showMessage == "Click to load more ...") {
            loadStyle = "moment-load";
        } else {
            loadStyle = "moment-load-not"
        }
        //4 column for 948 screen, 3 for smaller one
        let gallery;
        if (window.innerWidth > 948) {
            gallery = <Waterfall column="4" image={allImages} fontFamily="'Rubik', sans-serif" />
        } else {
            gallery = <Waterfall column="3" image={allImages} fontFamily="'Rubik', sans-serif" />
        }
        return (
            <section id="moment">
                <div id="moment-title">
                    <img alt="moment-icon" src="/img/icon/glyphicons-moment.png" / >
                    <h4>Moments</h4>
                </div>
                {gallery}
                <h5 className={loadStyle} onClick={this.props.loadMore.bind(null)}>{this.props.showMessage}</h5>
            </section>
        );
    }
}
export default Moment;