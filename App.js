import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { doubleDoubleBonus } from './functions/doubleDoubleBonus'
import { useWallet } from './hooks/useWallet'

import Cards from './components/Cards'
import Table from './components/Table'
import Toolbar from './components/Toolbar'
import DenomModal from './components/DenomModal'

export default function App() {
  const [game, setGame] = useState(null)
  const [cards, setCards] = useState([null, null, null, null, null])
  const [selectedCards, setSelectedCards] = useState([-1, -1, -1, -1, -1])

  const [gameStarted, setGameStarted] = useState(false)
  const [betAmount, setBetAmount] = useState(null)
  const [cardsDrawn, setCardsDrawn] = useState(false)
  const [winType, setWinType] = useState(null)
  const [denomination, setDenomination] = useState(0.25)
  
  const { wallet, handleChangeWallet } = useWallet()
  const [showDenomModal, setShowDenomModal] = useState(false)

  useEffect(() => {
    if(gameStarted) {
      let newGame = new doubleDoubleBonus(wallet, (denomination * betAmount))
      setGame(newGame)
      let newHand = newGame.dealHand()
      setCards(newHand)
    }
  },[gameStarted])

  return ( 
    <View style={styles.container}>
      
      <View style={styles.background}>
      {showDenomModal && <DenomModal showDenomModal={showDenomModal} setShowDenomModal={setShowDenomModal} />}
        <Table betAmount={betAmount} /> 
        <View style={styles.results}>
          <View style={{ flex: .7 }}>
            <Text style={styles.gameType}>{'Double Double Bonus Poker'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.result}>{winType ? winType : ''}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 3 }}>
          <View style={{ flex: .6, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{...styles.wallet, fontSize: 22, fontWeight: '800'}}>{`$${wallet.toFixed(2)}`}</Text>
          </View>
          <Cards 
            cards={cards} 
            gameStarted={gameStarted} 
            selectedCards={selectedCards} 
            setSelectedCards={setSelectedCards} 
            cardsDrawn={cardsDrawn}
            wallet={wallet}
          />
          <View style={{ flex: .6, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={styles.wallet}>{`CREDIT ${wallet.toFixed(2) * 100}`}</Text>
          </View>
        </View>
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
          denomination={denomination}
          setDenomination={setDenomination}
          wallet={wallet}
          handleChangeWallet={handleChangeWallet}
          showDenomModal={showDenomModal}
          setShowDenomModal={setShowDenomModal}
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
    backgroundColor: 'rgb(2, 15, 202)',
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
    width: '100%',
    //justifyContent: 'center'
  },
  gameType: {
    textAlign: 'left',
    color: 'rgb(201, 204, 6)',
    //borderWidth: 1,
    textShadowColor: 'black',
    textShadowOffset: {width:2,height:2},
    textShadowRadius: 1,
    fontWeight: '700',

  },
  result: {
    textAlign: 'left',
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: '700',

  },
  wallet: {
    color: 'rgb(201, 204, 6)',
    fontWeight: '700',
    fontSize: 15,
    padding: 5
  }
});
