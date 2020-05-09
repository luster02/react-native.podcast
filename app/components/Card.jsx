import React from 'react'
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native'
import { Card } from 'react-native-paper';
import FontAW from 'react-native-vector-icons/FontAwesome5'

const CardComponent = ({ width, item = {}, navigation }) => {
    function nav() {
        navigation.navigate('detailModal', { item: item })
    }

    function toProfile() {
        navigation.navigate('ProfileModal', { user: item.user })
    }

    return (
        <View style={[styles.cardContainer, { width: width || 200 }]} >
            <TouchableNativeFeedback
                onPress={nav}
                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                <Card>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                </Card>
            </TouchableNativeFeedback>
            <View style={styles.row}>
                <View>
                    <TouchableNativeFeedback
                        onPress={toProfile}
                        background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
                    >
                        <Text style={styles.titleCard}>
                            {item.user.displayName ? item.user.displayName : item.user.email}
                        </Text>
                    </TouchableNativeFeedback>
                    <Text style={styles.nameCard}>
                        {item.title}
                    </Text>
                </View>
                <View style={{ marginRight: 5 }}>
                    <FontAW style={styles.icon} solid name="heart" size={17} />
                    <Text
                        style={[styles.likesNumber, { marginLeft: item.likes.length < 10 ? 5 : 2 }]}>
                        {item.likes.length}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
    },
    titleCard: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    nameCard: {
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 'bold'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    icon: {
        marginTop: 13,
    },
    likesNumber: {
        fontSize: 12,
    },
})

export default CardComponent
