import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    ListView,
    Image,
    View
} from "react-native";

class Watch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        //data to show image gallery
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let gallery = ds.cloneWithRows(this.props.gallery)
        return (
            <ListView
                dataSource={gallery}
                enableEmptySections={true}
                renderRow={(row) =>
                    <View style={styles.row}>
                        <Image
                            source={{uri: "https://thousanday.com/img/pet/" + row.pet_id + "/moment/" + row.image_name}}
                            style={styles.rowImage}
                        />
                        <View style={styles.rowView}>
                            <Text
                                style={styles.viewMessage}
                                numberOfLines={4}
                            >
                                {row.moment_message}
                            </Text>
                            <Image
                                source={{uri: "https://thousanday.com/img/pet/" + row.pet_id + "/cover/0.png" }}
                                style={styles.viewImage}
                            />
                            <Text
                                style={styles.viewDate}
                                numberOfLines={2}
                            >
                                {new Date(row.moment_date).toISOString().substring(0, 10)}
                            </Text>
                        </View>
                    </View>
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        backgroundColor: "#f7f9fc",
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    rowImage: {
        width: 250,
        height: 250
    },
    rowView: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    viewMessage: {
        marginVertical: 10,
        fontSize: 16
    },
    viewImage: {
        width: 40,
        height: 40,
        borderRadius: 3
    },
    viewDate: {
        marginVertical: 5,
        fontSize: 12
    }
});

export default Watch;
