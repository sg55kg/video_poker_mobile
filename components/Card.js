import { useState, useEffect } from 'react'
import { StyleSheet, Pressable, Image, TouchableHighlight, Text, View } from 'react-native'
import  { getCardImage } from '../functions/getCardImage'

const Card = ({ index, number, gameStarted, selectedCards, setSelectedCards, cardsDrawn }) => {
    const [isSelected, setIsSelected] = useState(false)

    const [imageFile, setImageFile] = useState(null)

    const handleSelect = () => {
        if(gameStarted && !cardsDrawn) {
            if(isSelected) {
                setIsSelected(false)
                let newSelectedCards = [...selectedCards]
                newSelectedCards[index] = -1
                setSelectedCards(newSelectedCards)
            } else {
                setIsSelected(true)
                let newSelectedCards = [...selectedCards]
                newSelectedCards[index] = number
                setSelectedCards(newSelectedCards)
            }
        }
    }

    useEffect(() => {
        if(number) {
            let file = getCardImage(number)
            setImageFile(file)
        }
    },[number])

    useEffect(() => {
        if(!selectedCards.includes(number)) {
            setIsSelected(false)
        }
    },[cardsDrawn])

    return (
        <View>
        {isSelected ? <Text style={cardStyle.text}>HELD</Text> : <Text> </Text>}
        <Pressable onPress={handleSelect} style={cardStyle.card}>
            {gameStarted ? 
                <Image style={cardStyle.image} source={imageFile} /> : 
                <Image style={cardStyle.image} source={require('../assets/card_back.png')} />
            }
        </Pressable>
        </View> 
    )
}

export default Card

export const cardStyle = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        color: 'black',
        height: 115,
        width: 80,
        borderRadius: 5,
        margin: 5,
        borderWidth: 3,
        borderColor: 'black'
    },
    image: {
        height: '100%',
        width: '100%',

    },
    text: {
        color: 'white',
        fontSize: 14,
        alignSelf:'center',
        fontWeight: '600'
    }
})