import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Image,
    View
} from "react-native";
class Footer extends Component {
    render() {
        return (
            <View style={styles.footer}>
                <Image style={styles.footerIcon} source={require("../../image/watch.png")} />
                <Image style={styles.footerIcon} source={require("../../image/explore1.png")} />
                <Image style={styles.footerIcon} source={require("../../image/camera1.png")} />
                <Image style={styles.footerIcon} source={require("../../image/love1.png")} />
                <Image style={styles.footerIcon} source={require("../../image/home1.png")} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        backgroundColor: "#f7f9fc",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderColor: "#e5e5e5",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center"
    },
    footerIcon: {
        resizeMode: "contain"
    }
});

export default Footer;
