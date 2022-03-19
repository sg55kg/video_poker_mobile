import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native'
import { doubleDoubleBonus } from '../doubleDoubleBonus'
//import '@testing-library/jest-dom/extend-expect'

describe('Double double bonus poker class', () => {
    
    it('should create a 52 card array', () => {
        const testGame = new doubleDoubleBonus()
        const deck = testGame.deck
        expect(deck.length).toBe(52)
    })

    it('should deal 5 cards', () => {
        const testGame = new doubleDoubleBonus()
        const hand = testGame.dealHand()
        expect(hand.length).toBe(5)
    })

    it('should replace -1s when draw function is called', () => {
        const testGame = new doubleDoubleBonus()
        const startingHand = [33, -1, 12, -1, -1]
        const hand = testGame.draw(startingHand)
        expect(hand[0]).toBe(33)
        expect(hand[1]).not.toBe(-1)
        expect(hand[3]).not.toBe(-1)
        expect(hand[4]).not.toBe(-1)
    })

    it('should return GAME OVER when given a non-winning hand', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [12, 18, 19, 33, 42]
        const result = testGame.calcWin(hand)
        expect(result).toBe('GAME OVER')
    })

    it('should return JACKS OR BETTER when given two jacks', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [12, 18, 37, 39, 43]
        const result = testGame.calcWin(hand)
        expect(result).toBe('JACKS OR BETTER')
    })

    it('should return JACKS OR BETTER when given two jacks and a queen close in number', () => {
        const testGame = new doubleDoubleBonus()
        // 40 - last jack, 41 - first queen
        const hand = [12, 18, 37, 40, 41]
        const result = testGame.calcWin(hand)
        expect(result).toBe('JACKS OR BETTER')
    })

    it('should not return JACKS OR BETTER when given a queen and jack close in number', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [11, 21, 40, 41, 52]
        const result = testGame.calcWin(hand)
        expect(result).not.toBe('JACKS OR BETTER')
    })

    it('should return THREE OF A KIND when given three consecutive number two cards', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [1, 2, 3, 18, 41]
        const result = testGame.calcWin(hand)
        expect(result).toBe('THREE OF A KIND')
    })

    it('should return THREE OF A KIND when given three non-consecutive number two cards', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [1, 2, 4, 18, 41]
        const result = testGame.calcWin(hand)
        expect(result).toBe('THREE OF A KIND')

        const secondGame = new doubleDoubleBonus()
        const secondHand = [1, 3, 4, 18, 41]
        const secondResult = secondGame.calcWin(secondHand)
        expect(secondResult).toBe('THREE OF A KIND')
    })

    it('should return FOUR 5 THRU K when given four 5 cards', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [13, 16, 41, 15, 14]
        const result = testGame.calcWin(hand)
        expect(result).toBe('FOUR 5 THRU K')
    })

    it('should return FOUR 5 THRU K when given four queen cards', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [41, 42, 44, 13, 43]
        const result = testGame.calcWin(hand)
        expect(result).toBe('FOUR 5 THRU K')
    })

    it('should return FOUR ACES + 2 THRU 4 when given four aces and a three', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [51, 49, 50, 6, 52]
        const result = testGame.calcWin(hand)
        expect(result).toBe('FOUR ACES + 2 THRU 4')
    })

    it('should return FOUR ACES + 5 THRU K when given  four aces and a queen', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [51, 49, 50, 42, 52]
        const result = testGame.calcWin(hand)
        expect(result).toBe('FOUR ACES + 5 THRU K')
    })

    it('should return FOUR 2 THRU 4 + A THRU 4 when given four twos and an ace', () => {
        const  testGame = new doubleDoubleBonus()
        const hand = [51, 1, 3, 2, 4]
        const result = testGame.calcWin(hand)
        expect(result).toBe('FOUR 2 THRU 4 + A THRU 4')
    })

    it('should return ROYAL FLUSH when given a spade royal flush', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [36, 40, 44, 48, 52]
        const result = testGame.calcWin(hand)
        expect(result).toBe('ROYAL FLUSH')
    })

    it('should return ROYAL FLUSH when given a club royal flush', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [33, 37, 41, 45, 49]
        const result = testGame.calcWin(hand)
        expect(result).toBe('ROYAL FLUSH')
    })

    it('should return STRAIGHT FLUSH when given a straight flush 2-6', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [1, 5, 9, 13, 17]
        const result = testGame.calcWin(hand)
        expect(result).toBe('STRAIGHT FLUSH')
    })

    it('should return FULL HOUSE when given 3 fours and 2 queens', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [9, 11, 12, 41, 44]
        const result = testGame.calcWin(hand)
        expect(result).toBe('FULL HOUSE')
    })

    it('should return TWO PAIR when given a pair of 2s and a pair of 5s', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [1, 3, 41, 14, 15]
        const result = testGame.calcWin(hand)
        expect(result).toBe('TWO PAIR')
    })

    it('should return TWO PAIR when given two pairs of face cards', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [8, 38, 40, 42, 43]
        const result = testGame.calcWin(hand)
        expect(result).toBe('TWO PAIR')
    })

    it('should return FULL HOUSE when given triplet and pair', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [1, 3, 5, 6, 8]
        const result = testGame.calcWin(hand)
        expect(result).toBe('FULL HOUSE')
    })

    it('should return GAME OVER with single low pair', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [1, 3, 13, 27, 49]
        const result = testGame.calcWin(hand)
        expect(result).toBe('GAME OVER')
    })

    it('should return GAME OVER with no flush, pairs, etc', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [1, 6, 11, 28, 52]
        const result = testGame.calcWin(hand)
        expect(result).toBe('GAME OVER')
    })

    it('should return FLUSH without a straight flush', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [2, 10, 14, 22, 30]
        const result = testGame.calcWin(hand)
        expect(result).toBe('FLUSH')
    })

    it('should return JACKS OR BETTER with 2 face cards far apart', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [44, 26, 40, 15, 41]
        const result = testGame.calcWin(hand)
        expect(result).toBe('JACKS OR BETTER')
    })

    it('should return JACKS OR BETTER with 2 kings', () => {
        const testGame = new doubleDoubleBonus()
        const hand = [39, 47, 2, 44, 46]
        const result = testGame.calcWin(hand)
        expect(result).toBe('JACKS OR BETTER')
    })
})