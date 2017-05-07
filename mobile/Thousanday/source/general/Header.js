import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerBrand}>
                    Thousanday
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#ef8513"
    },
    headerBrand: {
        color: "white",
        fontSize: 20,
        marginLeft: 10
    }
});

export default Header;
