import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View
} from "react-native";
import Header from "./source/general/Header";
import Footer from "./source/general/Footer";
import Watch from "./source/watch/Watch";
import Explore from "./source/explore/Explore";

export default class Thousanday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //store info to show which page
            route: "explore",
            //store data show watch page image gallery
            gallery: []
        };
    }
    componentWillMount() {
        //get data to show image gallery
        fetch("https://thousanday.com/watch/view", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.text())
        .then((responseText) => {
            this.setState({gallery: JSON.parse(responseText)[0]});
        });
    }
    render() {
        //show differnt page base on route
        let route;
        switch (this.state.route) {
            case "watch":
                route = <Watch gallery={this.state.gallery} />;
                break;
            case "explore":
                route = <Explore />;
                break;
        }
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.main}>
                    {route}
                </View>
                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F5FCFF"
    },
    main: {
        flex: 10,
        backgroundColor: "white"
    }
});

AppRegistry.registerComponent("Thousanday", () => Thousanday);
