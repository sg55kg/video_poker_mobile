import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { doubleDoubleBonus } from './functions/doubleDoubleBonus'

import Cards from './components/Cards'
import Table from './components/Table'
import Toolbar from './components/Toolbar'

export default function App() {
  const [game, setGame] = useState(null)
  const [cards, setCards] = useState([])
  const [selectedCards, setSelectedCards] = useState([-1, -1, -1, -1, -1])

  const [gameStarted, setGameStarted] = useState(false)
  const [betAmount, setBetAmount] = useState(null)
  const [cardsDrawn, setCardsDrawn] = useState(false)
  const [winType, setWinType] = useState(null)

  useEffect(() => {
    if(gameStarted) {
      let newGame = new doubleDoubleBonus()
      setGame(newGame)
      let newHand = newGame.dealHand()
      console.log(newHand)
      setCards(newHand)
    }
  },[gameStarted])

  return ( 
    <View style={styles.container}>
      <View style={styles.background}>
        <Table betAmount={betAmount} /> 
        <View style={styles.results}>
          <Text style={styles.text}>{'Double Double Bonus Poker'}</Text>
          {winType && <Text style={styles.text}>{winType}</Text>}
        </View>
        <Cards 
          cards={cards} 
          gameStarted={gameStarted} 
          selectedCards={selectedCards} 
          setSelectedCards={setSelectedCards} 
          cardsDrawn={cardsDrawn}
        />
        <Toolbar 
          betAmount={betAmount} 
          setBetAmount={setBetAmount} 
          gameStarted={gameStarted} 
          setGameStarted={setGameStarted} 
          cardsDrawn={cardsDrawn}
          setCardsDrawn={setCardsDrawn}
          setGame={setGame}
          game={game}
          setCards={setCards}
          setSelectedCards={setSelectedCards}
          selectedCards={selectedCards}
          setWinType={setWinType}
        />
        <StatusBar style="auto" /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    width: '100%',
    backgroundColor: '#000'
  },
  background: {
    height: '100%',
    marginRight: 34,
    marginLeft: 30,
    marginTop: 5,
    marginBottom:20,
    backgroundColor: 'rgb(2, 18, 238)',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  text: {
    color: 'rgb(201, 204, 6)',
    alignSelf: 'flex-start',
    fontWeight: '700',
    paddingLeft: 5,
    paddingTop: 2,
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
