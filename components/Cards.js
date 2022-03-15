import { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Card from './Card'
import BlankCard from './BlankCard'

const Cards = ({ cards, gameStarted, selectedCards, setSelectedCards, cardsDrawn }) => {

    return (
        <View style={cardsStyle.container}>
            {cards.length === 5 ? cards.map((card, index) => {
                return (
                    <Card 
                        index={index} 
                        number={card} 
                        gameStarted={gameStarted} 
                        selectedCards={selectedCards} 
                        setSelectedCards={setSelectedCards}
                        cardsDrawn={cardsDrawn} 
                    />
                )
            }) : 
                <>
                <BlankCard />
                <BlankCard />
                <BlankCard />
                <BlankCard />
                <BlankCard />
                </>
            }
        </View>
    )
}

export default Cards

const cardsStyle = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center'
    }
})