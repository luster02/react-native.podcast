import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { withTheme } from 'react-native-paper'

const Loading = ({ theme }) => {
    const { colors } = theme || {}
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default withTheme(Loading)