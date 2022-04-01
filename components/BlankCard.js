import { StyleSheet, Pressable, Image, TouchableHighlight, Text, View } from 'react-native'
import { cardStyle } from './Card'

const BlankCard = () => {
    return (
        <View>
            <Text style={cardStyle.text}> </Text>
            <Pressable style={cardStyle.card}>
                <Image style={cardStyle.image} source={require('../assets/card_back.png')} />
            </Pressable>
        </View>
    )
}

export default BlankCard