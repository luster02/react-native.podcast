import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAW from 'react-native-vector-icons/FontAwesome5'

const Categories = ({ icon, name, navigation }) => {

    function nav() {
        navigation.push('category', { name: name })
    }

    return (
        <TouchableOpacity
            onPress={nav}
        >
            <View style={styles.iconCat}>
                <FontAW name={icon} color="#fff" size={35} />
                <Text style={styles.textCat}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconCat: {
        height: 115,
        width: 115,
        backgroundColor: '#5f6caf',
        borderRadius: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5
    },
    textCat: {
        color: "#fff",
        fontSize: 11,
        marginTop: 7
    }
})

export default Categories
