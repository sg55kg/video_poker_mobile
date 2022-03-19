import { useState, useRef, useEffect } from 'react'
import { useInterval } from './useInterval'

export const useWallet = () => {
    const walletRef = useRef(100.00)
    const [wallet, setWallet] = useState(100.00)
    const newWallet = useRef(null)
    const [changed, setChanged] = useState(false)
    const [btnsDisabled, setBtnsDisabled] = useState(false)

    const handleChangeWallet = (newAmount) => {
        if(wallet.current === newAmount) { 
            setChanged(false) 
            newWallet.current = null
            setBtnsDisabled(false)
        } else { 
            newWallet.current = newAmount
            setChanged(true) 
            setBtnsDisabled(true)
        }
    }

    useInterval(() => {
        let walletVal = walletRef.current
        let newVal = newWallet.current
        if(walletVal.toFixed(2) === newVal.toFixed(2) || !newWallet.current) {
            setChanged(false)
            newWallet.current = null
            setBtnsDisabled(false)
        } else {
            if(walletVal > newVal) { 
                walletRef.current -= .05
                setWallet(walletRef.current)
             } else if (walletVal < newVal) { 
                walletRef.current += .05
                setWallet(walletRef.current)
            }
        }
        
    }, changed ? 10 : null)

    return { wallet, handleChangeWallet, btnsDisabled }
    
}

//export default UseWallet