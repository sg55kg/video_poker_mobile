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
        console.log(cardsArr + 'sorted')
        let win = ''
    
        if(checkRoyalFlush(cardsArr)) {
            return win = 'ROYAL FLUSH'
        } 
        
        if(checkStraightEdit(cardsArr)) { // 
            if(checkFlush(cardsArr, 0, cardsArr.length - 1, cardsArr.length)) {
                return win = 'STRAIGHT FLUSH'
            } else {
                return win = 'STRAIGHT'
            }
        } 
        
        if(checkFlush(cardsArr, 0, 4)) { // is also checking for straight, should only be numbers seperated by 4
            return win = 'FLUSH'
        }

        if(checkStraight(cardsArr, 0, 4, 3)) {
            if(cardsArr[1] >= 49) {
                if(cardsArr[0] <= 12) {
                    return win = 'FOUR ACES + 2 THRU 4'
                } else if(cardsArr[3] < 49) {
                    return win = 'FULL HOUSE'
                } else {
                    return win = 'FOUR ACES + 5 THRU K'
                }
            } else if(cardsArr[0] >= 1 && cardsArr[0] <= 12) {
                if((cardsArr[4] <= 12) || (cardsArr[4] >= 49)) {
                    return win = 'FOUR 2 THRU 4 + A THRU 4'
                } else if (cardsArr[3] > 12) {
                    return win = 'FULL HOUSE'
                } else {
                    return win = 'FOUR 2 THRU 4 + 5 THRU K'
                }
            } else {
                return win = 'FOUR 5 THRU K'
            }
        }

        if(checkStraight(cardsArr, 0, 4, 2)) { //two pair gets caught here and made 3. Maybe add nested check
            if(checkStraight(cardsArr, 0, 2, 1) && (checkStraight(cardsArr, 1, 4, 1))) {
                return win = 'TWO PAIR' 
            }
            return win = 'THREE OF A KIND'
        }
        
        if(checkStraight(cardsArr, 0, 3, 2)) {
            if(checkStraight(cardsArr, 3, 4, 1)) {
                return win = 'FULL HOUSE'
            } else {
                return win = 'THREE OF A KIND'
            }
        }
        if(checkStraight(cardsArr, 2, 4, 2)) {
            if(checkStraight(cardsArr, 0, 2, 1)) {
                return win = 'FULL HOUSE'
            } else {
                return win = 'THREE OF A KIND'
            }
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


const checkStraight = (cards, start, end, numOfPairs) => {
    let count = 0
    // check if there are consecutive numbers in the player's hand to narrow down 3/4 of a kind/straight/full house
    for(let i = start; i < end; i++) {
        for(let j = 1; j <= 52; j += 4) {
            if((cards[i] >= j && cards[i] <= j + 3) && (cards[i+1] >= j && cards[i+1] <= j + 3)) {
                count++
                console.log(cards[i] + " " + cards[i+1] + " " + count)
                break
            }
        }
    }
    console.log(count)
    if(count === numOfPairs) { 
        return true 
    } else { 
        return false 
    }
}

const checkStraightEdit = (cards) => {
    let count = 0
    for(let i = 0; i < cards.length - 1; i++) {
        for(let j = 1; j <= 52; j += 4) {
            if ((cards[i] >= j && cards[i] <= j + 3) && (cards[i+1] >= j + 4 && cards[i+1] <= j + 7)) {
                count++
            }
        }
    }
    console.log("cards: " + cards + " " + count)
    return count === 4
}

const checkFlush = (cards, start, end) => {
    let count = 0
    for(let i = start; i < end; i++) {
        if(cards[i] === (cards[i+1] - 4) || !(cards[i+1] - cards[i] > 3)) {
            count++
        }
    }
    return count === 4
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
    console.log('check jacks')
    // const jacksStartEnd = [37, 40]
    // const queensStartEnd = [41, 44]
    // const kingsStartEnd = [45, 48]
    // const acesStartEnd = [49, 52]
    if((cards[0] >= 37 && cards[1] >= 37) && (cards[1] - cards[0] < 4)) {
        console.log('first ' + (cards[1] - cards[0]))
        return true
    } else if((cards[1] >= 37 && cards[2] >= 37) && (cards[2] - cards[1] < 4)){
        console.log('sec ' + (cards[2] - cards[1]))
        return true
    } else if((cards[2] >= 37 && cards[3] >= 37) && (cards[3] - cards[2] < 4)) {
        console.log('thir ' + (cards[3] - cards[2]))
        return true
    } else if((cards[3] >= 37 && cards[4] >= 37) && (cards[4] - cards[3] < 4)) {
        console.log('four ' + (cards[4] - cards[3]))
        return true
    } else {
        return false
    }
}

const checkSameNum = (cards) => {
    for(let i = start; i < end; i++) {
        for(let j = 1; j <= 52; j += 4) {
            if((cards[i] >= j && cards[i] <= j + 3) && (cards[i+1] >= j && cards[i+1] <= j + 3)) {
                count++
                console.log(cards[i] + " " + cards[i+1] + " " + count)
                break
            }
        }
    }
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