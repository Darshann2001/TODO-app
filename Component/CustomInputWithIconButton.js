import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomInputWithIconButton = ({ customTags, setCustomTag, addCustomTag, customTag, setCustomTags, placeholder, setShowCustomInput, setDarkMode, darkMode }) => {

    const characterCount = customTag.length;
    const remainingCharacters = 10 - characterCount;

    return (
        <View style={styles.container}>
            <View style={styles.CountParent}>
                <TextInput
                    style={styles.inputCustomTag}
                    color={darkMode ? '#fff' : 'black'}
                    placeholder={placeholder}
                    value={customTag}
                    onChangeText={setCustomTag}
                    onSubmitEditing={addCustomTag}
                />
                <Text style={styles.characterCount}>{remainingCharacters}/10</Text>
            </View>
            <TouchableOpacity onPress={() => setShowCustomInput(false)} style={styles.iconButton}>
                <Ionicons color={darkMode ? '#fff' : 'black'} name='remove-circle-outline' size={24} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        height: 40,
    },
    inputCustomTag: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
    },
    iconButton: {
        marginLeft: 3,
    },
    CountParent: {
        position: "relative",
        width: "95%",
        margin: 'auto'
    },
    characterCount: {
        position: "absolute",
        top: "50%",
        transform: [{ translateY: -10 }],
        right: 10,
    }

});

export default CustomInputWithIconButton;
