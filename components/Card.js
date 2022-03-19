import { useState, useEffect, useRef } from 'react'
import { StyleSheet, Pressable, Image, TouchableHighlight, Text, View, Animated } from 'react-native'
import  { getCardImage } from '../functions/getCardImage'

const Card = ({ index, number, gameStarted, selectedCards, setSelectedCards, cardsDrawn }) => {
    const [isSelected, setIsSelected] = useState(false)
    const [imageFile, setImageFile] = useState(null)

    const flipAnimation = useRef(new Animated.Value(0)).current
    let flipRotation = 0

    //flipAnimation.addListener(({ value }) => flipRotation = value)

    const flipToFrontStyle = {
        transform: [{ 
            rotateY: flipAnimation.interpolate({
                inputRange: [ 0, 180 ],
                outputRange: [ "0deg", "180deg" ]
            }) 
        }]
    }

    const flipToBackStyle = {
        transform: [{ 
            rotateY: flipAnimation.interpolate({
                inputRange: [ 0, 180 ],
                outputRange: [ "180deg", "360deg" ]
            })
        }]
    }

    const flipToFront = () => {
        Animated.timing(flipAnimation, {
            toValue: 180,
            duration: 100,
            useNativeDriver: true,
        }).start()
    }

    const flipToBack = () => {
        Animated.timing(flipAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start()
    }

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
            setTimeout(() => flipToFront(), 105)
            flipToBack()
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
            <Animated.Image style={{ ...cardStyle.image, ...flipToBackStyle }} source={imageFile} /> 
            <Animated.Image style={{ ...cardStyle.imageBack, ...flipToFrontStyle }} source={require('../assets/card_back.png')} />   
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
        //backgroundColor: 'white',
       // backgroundImage: 'url(../assets/card_back.png)',
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
        position: 'absolute',
    },
    imageBack: {
        height: '100%',
        width: '100%',   
        backfaceVisibility: 'hidden'
    },
    text: {
        color: 'white',
        fontSize: 14,
        alignSelf:'center',
        fontWeight: '600'
    }
})