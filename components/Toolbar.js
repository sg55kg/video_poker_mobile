import { useState, useEffect } from 'react'
import { StyleSheet, Pressable, Image, TouchableHighlight, Text, View } from 'react-native'
import{ doubleDoubleBonus, calcDDBWin } from '../functions/doubleDoubleBonus'

const Toolbar = ({ 
    betAmount,
    setBetAmount, 
    gameStarted, 
    setGameStarted, 
    cardsDrawn, 
    setCardsDrawn, 
    setGame, 
    game, 
    setCards, 
    setSelectedCards, 
    selectedCards,
    setWinType
}) => {

    const handleDealDraw = () => {
        if(!gameStarted) {
            setGameStarted(true)
        } else if(gameStarted && !cardsDrawn) {
            let drawnCards = game.draw(selectedCards)
            setCards(drawnCards)
            let result = game.calcWin(drawnCards)
            setWinType(result)
            setCardsDrawn(true)
        } else if(gameStarted && cardsDrawn) {
            setWinType(null)
            setSelectedCards([-1,-1,-1,-1,-1])
            let newGame = new doubleDoubleBonus()
            setGame(newGame)
            let newCards = newGame.dealHand()
            setCards(newCards)
            setCardsDrawn(false)
        }
    }

    const handleIncreaseBet = () => {
        if(!betAmount) {
            return setBetAmount(1)
        } else if (betAmount < 5) {
            let currentAmount = betAmount
            currentAmount++
            setBetAmount(currentAmount)
        } else {
            setBetAmount(1)
        }
    }

    const handleMaxBet = () => {
        setBetAmount(5)
    }



    return (
        <View style={toolbarStyles.container}>
            <Pressable style={toolbarStyles.dealBtn}>
                <Text style={toolbarStyles.dealBtnText}>Menu</Text>
            </Pressable>
            <View style={toolbarStyles.betBtnContainer}>
                <Pressable onPress={handleIncreaseBet} style={toolbarStyles.smallBetBtn}>
                    <Text style={toolbarStyles.smallBetBtnText}>BET 1</Text>
                </Pressable>
                <Pressable style={toolbarStyles.betBtn}>
                    <Text style={toolbarStyles.betBtnText}>5¢</Text>
                </Pressable>
                <Pressable onPress={handleMaxBet} style={toolbarStyles.smallBetBtn}>
                    <Text style={toolbarStyles.smallBetBtnText}>BET 5</Text>
                </Pressable>
            </View>
            <Pressable disabled={!betAmount} onPress={handleDealDraw} style={toolbarStyles.dealBtn}>
                <Text style={toolbarStyles.dealBtnText}>{!gameStarted || cardsDrawn ? 'DEAL' : 'DRAW'}</Text>
            </Pressable>
        </View>
    )
}

export default Toolbar

const toolbarStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(2, 18, 238)',
        flexDirection: 'row',
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    betBtnContainer: {
        width: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    betBtn: {
        backgroundColor: 'yellow',
        borderWidth: 3,
        padding: 10,
        borderRadius: 20,
        borderColor: 'red',
        alignItems: 'center'
    },
    betBtnText: {
        fontWeight: '800',
        color: 'red',
        fontSize: 20,
        paddingLeft: 5,
        paddingRight: 5,
    },
    smallBetBtn: {
        backgroundColor: 'yellow',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black'
    },
    smallBetBtnText: {
        fontSize: 17,
        fontWeight: '700',
        padding: 5
    },
    dealBtn: {
        backgroundColor: 'yellow',
        borderRadius: 5,
        padding: 10, 
        borderWidth: 3,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90
    },
    dealBtnText: {
        fontSize: 20,
        fontWeight: '700'
    }
})