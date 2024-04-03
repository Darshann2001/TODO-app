import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const Gif = ({darkMode, setDarkMode}) => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={[styles.textGif, { color: darkMode ? 'white' : 'black' }]}>
                Add Todo
            </Text>
            <Image source={require('../assets/giphy.gif')} style={styles.gif} />
        </View >
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: 200,
        height: 200,
    },
    textGif: {
        fontSize: 27,
        // fontStyle: "normal",
        fontWeight: "bold"
        // fontFamily: 'Arial'
    }
});

export default Gif;
