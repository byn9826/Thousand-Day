import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Image,
    View
} from "react-native";

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //store choose of type
            type: null,
            //store choose of nature
            nature: null
        };
    }
    chooseType(type) {
        if (this.state.type === type) {
            this.setState({type: null});
        } else {
            this.setState({type: type});
        }
    }
    chooseNature(nature) {
        if (this.state.nature === nature) {
            this.setState({nature: null});
        } else {
            this.setState({nature: nature});
        }
    }
    render() {
        return (
            <View style={styles.watch}>
                <View style={styles.watchHeader}>
                    <View style={styles.headerFilter}>
                        <Image style={styles.filterIcon} source={require("../../image/filter.png")} />
                        <Text style={styles.filterContent}>
                            Filter
                        </Text>
                    </View>
                    <View style={styles.headerOption}>
                        <View style={styles.optionType}>
                            <Text onPress={this.chooseType.bind(this, "dog")} style={(this.state.type === "dog")?styles.typeChoose:styles.typeSingle}>
                                Dog
                            </Text>
                            <Text onPress={this.chooseType.bind(this, "cat")} style={(this.state.type === "cat")?styles.typeChoose:styles.typeSingle}>
                                Cat
                            </Text>
                            <Text onPress={this.chooseType.bind(this, "bird")} style={(this.state.type === "bird")?styles.typeChoose:styles.typeSingle}>
                                Bird
                            </Text>
                            <Text onPress={this.chooseType.bind(this, "fish")} style={(this.state.type === "fish")?styles.typeChoose:styles.typeSingle}>
                                Fish
                            </Text>
                            <Text onPress={this.chooseType.bind(this, "other")} style={(this.state.type === "other")?styles.typeChoose:styles.typeSingle}>
                                Other
                            </Text>
                        </View>
                        <View style={styles.optionType}>
                            <Text onPress={this.chooseNature.bind(this, "cute")} style={(this.state.nature === "cute")?styles.typeChoose:styles.typeSingle}>
                                Cute
                            </Text>
                            <Text onPress={this.chooseNature.bind(this, "strong")} style={(this.state.nature === "strong")?styles.typeChoose:styles.typeSingle}>
                                Strong
                            </Text>
                            <Text onPress={this.chooseNature.bind(this, "smart")} style={(this.state.nature === "smart")?styles.typeChoose:styles.typeSingle}>
                                Smart
                            </Text>
                            <Text onPress={this.chooseNature.bind(this, "beauty")} style={(this.state.nature === "beauty")?styles.typeChoose:styles.typeSingle}>
                                Beauty
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.watchDisplay}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    watch: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    watchHeader: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderStyle: "solid",
        borderColor: "#f7d7b4",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    headerFilter: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    filterIcon: {
        resizeMode: "contain"
    },
    filterContent: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10
    },
    headerOption: {
        flex: 6,
        flexDirection: "column",
    },
    optionType: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    typeSingle: {
        fontSize: 16,
        paddingHorizontal: 10,
        marginHorizontal: 6,
        marginVertical: 8,
        paddingVertical: 2,
        borderStyle: "solid",
        borderColor: "#f7d7b4",
        borderWidth: 1,
        borderRadius: 3
    },
    typeChoose: {
        fontSize: 16,
        paddingHorizontal: 10,
        marginHorizontal: 6,
        marginVertical: 8,
        backgroundColor: "#052456",
        paddingVertical: 2,
        borderStyle: "solid",
        borderColor: "#052456",
        borderWidth: 1,
        borderRadius: 3,
        color: "white"
    },
    watchDisplay: {
        flex: 5,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
});

export default Explore;