export class doubleDoubleBonus {
    constructor(cash, bet) {
        this.deck = [...Array(52).keys()]
        this.cash = cash
        this.bet = bet
    }

    dealCard() {
        const card = this.deck[Math.floor(Math.random() * (this.deck.length - 1) + 1)]
        this.deck.splice(this.deck.indexOf(card), 1)

        return card
    }

    dealHand() {
        let hand = []
        for(let i = 0; i < 5; i++) {
            let card = this.dealCard()
            hand.push(card)
        }
        return hand
    }

    draw(cardArr) {
        if(!cardArr) return 
        for(let i = 0; i < 5; i++) {
            if(cardArr[i] === -1) {
                // card at this index was not held by user, so replace with a new random card
                cardArr[i] = this.dealCard()
            }
        }
        return cardArr
    }

    calcWin(cards) {
        let cardsArr = [...cards]
        cardsArr = cardsArr.sort((a,b) => a - b)
        let win = ''
    
        if(checkRoyalFlush(cardsArr)) {
            return win = 'ROYAL FLUSH'
        } 
        
        if(checkStraightFlush(cardsArr)) { // 
            return win = 'STRAIGHT FLUSH'
        } 

        if(checkStraight(cardsArr)) {
            return win = 'STRAIGHT'
        }
        
        if(checkFlush(cardsArr)) {
            return win = 'FLUSH'
        }

        if(checkPairs(cardsArr, 0, 4, 3)) {
            if(checkTriplets(cardsArr)) {
                return win = 'FULL HOUSE'
            } else if(cardsArr[1] >= 49) {
                if(cardsArr[0] <= 12) {
                    return win = 'FOUR ACES + 2 THRU 4'
                 } else {
                    return win = 'FOUR ACES + 5 THRU K'
                }
            } else if(cardsArr[0] >= 1 && cardsArr[0] <= 12) {
                if((cardsArr[4] <= 12) || (cardsArr[4] >= 49)) {
                    return win = 'FOUR 2 THRU 4 + A THRU 4'
                } else {
                    return win = 'FOUR 2 THRU 4 + 5 THRU K'
                }
            } else {
                return win = 'FOUR 5 THRU K'
            }
        }

        if(checkPairs(cardsArr, 0, 4, 2)) {
            if(!checkTriplets(cardsArr)) {
                return win = 'TWO PAIR' 
            }
            return win = 'THREE OF A KIND'
        }
        
        if(checkJacksOrBetter(cardsArr)) {
            return win = 'JACKS OR BETTER'
        }
    
        return win = 'GAME OVER'
    }

    updateCash(winType) {
        if(winType === 'GAME OVER') { return 0 }
        switch (winType) {
            case 'JACKS OR BETTER':
                return this.bet
                break
            case 'TWO PAIR':
                return this.bet
                break
            case 'THREE OF A KIND':
                return (this.bet * 3)
                break
            case 'STRAIGHT':
                return (this.bet * 4)
                break
            case 'FLUSH':
                return (this.bet * 5)
                break
            case 'FULL HOUSE':
                return (this.bet * 9)
                break
            case 'FOUR 5 THRU K':
                return (this.bet * 50)
                break
            case 'FOUR 2 THRU 4 + 5 THRU K':
                return (this.bet * 80)
                break
            case 'FOUR ACES + 5 THRU K':
                return (this.bet * 160)
                break
            case 'FOUR 2 THRU 4 + A THRU 4':
                return (this.bet * 160)
                break
            case 'FOUR ACES + 2 THRU 4':
                return (this.bet * 400)
                break
            case 'STRAIGHT FLUSH':
                return (this.bet * 55)
                break
            case 'ROYAL FLUSH':
                if(this.bet < 5) {
                    return (this.bet * 250)
                } else {
                    return (this.bet * 800)
                }
                break
        }
    }
    
}


const checkStraight = (cards) => {
    let count = 0
    for(let i = 0; i < cards.length - 1; i++) {
        for(let j = 1; j <= 52; j += 4) {
            if ((cards[i] >= j && cards[i] <= j + 3) && (cards[i+1] >= j + 4 && cards[i+1] <= j + 7)) {
                count++
            }
        }
    }
    return count === 4
}

const checkStraightFlush = (cards, start, end) => {
    let count = 0
    for(let i = 0; i < cards.length - 1; i++) {
        if(cards[i] === (cards[i+1] - 4)) {
            count++
        } else {
            return false
        }
    }
    return count === 4
}

const checkFlush = (cards) => {
    let flushCount = 1
    for(let i = cards[0] + 4; i <= 52; i += 4) {
        if(cards[flushCount] === i) {
            flushCount++
            if(flushCount === 5) { return true }
        } else if(cards[flushCount] < i) {
            return false
        }
    }
    return false
    
}

const checkRoyalFlush = (cards) => {
    if(!(cards[0] > 32 && cards[0] < 37)) { return false }
    let nextCard = cards[0] + 4
    for(let i = 1; i < 5; i++) {
        if(cards[i] === nextCard) {
            nextCard += 4
        } else {
            return false
        }
    }
    return true
}

const checkJacksOrBetter = (cards) => {
    // const jacksStartEnd = [37, 40]
    // const queensStartEnd = [41, 44]
    // const kingsStartEnd = [45, 48]
    // const acesStartEnd = [49, 52]
    for(let start = 37; start < 52; start += 4) {
        let end = start + 3
        for(let firstCard = 0; firstCard < 4; firstCard++) {
            let secondCard = firstCard + 1
            if((cards[firstCard] >= start && cards[secondCard] >= start) && (cards[firstCard] <= end && cards[secondCard] <= end)){
                return true
            }
        }
    }
}

const checkPairs = (cards, start, end, numOfPairs) => {
    let count = 0
    for(let i = start; i < end; i++) {
        for(let j = 1; j <= 52; j += 4) {
            if((cards[i] >= j && cards[i] <= j + 3) && (cards[i+1] >= j && cards[i+1] <= j + 3)) {
                count++
                break
            }
        }
    }
    return count === numOfPairs
}

const checkTriplets = (cards) => {
    let count = 0
    for(let i = 1; i <= 52; i += 4) {
        if(cards[0] >= i && cards[0] <= i + 3) {
            if((cards[1] >= i && cards[1] <= i + 3) && (cards[2] >= i && cards[2] <= i + 3)) {
                count++
                
            }
        } 
        if (cards[1] >= i && cards[1] <= i + 3) {
            if((cards[2] >= i && cards[2] <= i + 3) && (cards[3] >= i && cards[3] <= i + 3)) {
                count++
                if(count === 2) {
                    return false
                }
            }
        }
        if (cards[2] >= i && cards[2] <= i + 3) {
            if((cards[3] >= i && cards[3] <= i + 3) && (cards[4] >= i && cards[4] <= i + 3)) {
                count++
            }
        }
    }
    return count === 1
}



/*
FOUR ACES + 2 THRU 4
FOUR 2 THRU 4 + A THRU 4
FOUR ACES + 5 THRU K
FOUR 2 THRU 4 + 5 THRU K
FOUR 5 THRU K
FULL HOUSE
FLUSH
STRAIGHT
THREE OF A KIND
TWO PAIR
JACKS OR BETTER 
*/