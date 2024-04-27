// src/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './currency.css';

function CurrencyConverter() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        setExchangeRates(response.data.rates);
      })
      .catch(error => {
        console.error('Error fetching exchange rates: ', error);
      });
  }, [fromCurrency]);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSwap = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);

    const tempAmount = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
  };
  
  const handleConvertCurrency = () => {
    const rate = exchangeRates[toCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
  };

  return (
    <div className='currency'>
        <div>
            <h2>Currency Converter</h2>
            <div className='currency-container'>
                <div className='currency-1'>
                    <div className='f1'>
                        <label>From</label>
                        <input type="number" value={amount} onChange={handleAmountChange} /> 
                    </div>
                    <div className='f2'>
                    <label>Currency Type</label>
                        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                            {Object.keys(exchangeRates).map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                </div>    
            <div>
            <div className='currency-2'>
                <div className='f1'>
                    <label>To</label>
                    <input type="text" value={convertedAmount} readOnly />
                </div>
                <div className='f2'>
                    <label>Currency Type</label>
                    <select value={toCurrency} onChange={handleToCurrencyChange}>
                        {Object.keys(exchangeRates).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            
            </div>
            <button onClick={handleSwap} className='swap-btn'>Swap</button>
            <button onClick={handleConvertCurrency} className='covert-btn'>Convert Currency</button>
            </div>
        </div>       
    </div>
    
  );
}

export default CurrencyConverter;
