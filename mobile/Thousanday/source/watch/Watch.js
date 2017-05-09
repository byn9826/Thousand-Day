import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    FlatList
} from "react-native";

class Watch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        let gallery = [];
        let i;
        for (i = 0; i < this.props.gallery.length; i++) {
            gallery[i] = {
                key: "https://thousanday.com/img/pet/" + this.props.gallery[i].pet_id + "/moment/" + this.props.gallery[i].image_name
            }
        }
        return (
            <FlatList
                contentContainerStyle={styles.list}
                data = {gallery}
                renderItem={({item}) => 
                    <Image
                        source={{uri: item.key}}
                        style={styles.rowImage}
                    />
                }
                getItemLayout={(data, index) => (
                    {length: 180, offset: 180 * index, index}
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    rowImage: {
        width: Dimensions.get("window").width/2.01,
        height: 180,
        marginBottom: 2,
        borderRadius: 5
    }
});

export default Watch;
