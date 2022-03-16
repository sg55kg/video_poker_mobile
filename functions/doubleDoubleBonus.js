export class doubleDoubleBonus {
    constructor() {
        this.deck = [...Array(52).keys()]
        //console.log(this.deck)
    }

    // get deck() {
    //     return this.deck
    // }

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
            return win === 'STRAIGHT'
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
    
}

// const ROYAL_FLUSH_CLUBS = [33, 37, 41, 45, 49]
// const ROYAL_FLUSH_DIAMONDS = [34, 38, 42, 46, 50]
// const ROYAL_FLUSH_HEARTS = [35, 39, 43, 47, 51]
// const ROYAL_FLUSH_SPADES = [36, 40, 44, 48, 52]

// const STRAIGHT_FLUSH_CLUBS = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49]
// const STRAIGHT_FLUSH_DIAMONDS = [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50]
// const STRAIGHT_FLUSH_HEARTS = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51]
// const STRAIGHT_FLUSH_SPADES = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52]

// const FOUR_ACES = [49, 50, 51, 52]
// const FOUR_TWOS = [1, 2, 3, 4]
// const FOUR_THREES = [5, 6, 7, 8]
// const FOUR_FOURS = [9, 10, 11, 12]
// const FOUR_FIVES = [13, 14, 15, 16]
// const FOUR_SIXES = [17, 18, 19, 20]
// const FOUR_SEVENS = [21, 22, 23, 24]
// const FOUR_EIGHTS = [25, 26, 27, 28]
// const FOUR_NINES = [29, 30, 31, 32]
// const FOUR_TENS = [33, 34, 35, 36]
// const FOUR_JACKS = [37, 38, 39, 40]
// const FOUR_QUEENS = [41, 42, 43, 44]
// const FOUR_KINGS = [45, 46, 47, 48]



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
    if((cards[0] >= 37 && cards[1] >= 37) && (cards[1] - cards[0] < 4)) {
        return true
    } else if((cards[1] >= 37 && cards[2] >= 37) && (cards[2] - cards[1] < 4)){
        return true
    } else if((cards[2] >= 37 && cards[3] >= 37) && (cards[3] - cards[2] < 4)) {
        return true
    } else if((cards[3] >= 37 && cards[4] >= 37) && (cards[4] - cards[3] < 4)) {
        return true
    } else {
        return false
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