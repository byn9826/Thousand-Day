import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    ListView,
    View
} from 'react-native';
import Header from "./source/general/Header";
import Footer from "./source/general/Footer";

export default class Thousanday extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }
    componentWillMount() {
        fetch('https://thousanday.com/watch/view', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.text())
        .then((responseText) => {
            console.log(JSON.parse(responseText)[0]);
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({dataSource: ds.cloneWithRows(JSON.parse(responseText)[0])});
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.main}>
                    <ListView
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={(row) =>
                            <View style={styles.mainRow}>
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
                                </View>
                            </View>
                        }
                     />
                </View>
                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: "#F5FCFF",
    },
    main: {
        flex: 10,
        backgroundColor: "white"
    },
    mainRow: {
        flex: 1,
        backgroundColor: "#f7f9fc",
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    rowImage: {
        width: 200,
        height: 200
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
    }
});

AppRegistry.registerComponent('Thousanday', () => Thousanday);
