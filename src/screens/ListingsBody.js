import React, { useState, useRef, useEffect } from 'react';
import CountryList from './CountryList';
import CountryInfo from './CountryInfo';

export default function ListingsBody() {
  const [display, setDisplay] = useState('CountryList');
  const [tipData, _setTipData] = useState([]);
  const tipDataRef = useRef(tipData);
  const setTipData = (newTipData) => {
    tipDataRef.current = newTipData;
    _setTipData(newTipData);
  };
  const [currencyData, _setCurrencyData] = useState([]);
  const currencyDataRef = useRef(currencyData);
  const setCurrencyData = (newCurrencyData) => {
    currencyDataRef.current = newCurrencyData;
    _setCurrencyData(newCurrencyData);
  };
  const [countryTipData, setCountryTipData] = useState([]);
  const [countryCurrencyData, setCountryCurrencyData] = useState('');

  useEffect(() => {
    // Get country tip data
    fetch('https://brandonscode.herokuapp.com/tipjar/tip-data')
      .then((res) => res.json())
      .then((result) => {
        setTipData(result);
      });

    // Get currency data
    fetch('https://brandonscode.herokuapp.com/tipjar/currency-data')
      .then((res) => res.json())
      .then((result) => {
        setCurrencyData(result);
      });
  }, []);

  // Display CountryList screen
  const displayCountryList = () => {
    setDisplay('CountryList');
  };

  // Display CountryInfo screen + get and define country data
  const displayCountryInfo = (country) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    for (let x = 0; x < tipDataRef.current.length; x++) {
      if (country === tipDataRef.current[x].country) {
        for (let i = 0; i < currencyDataRef.current.length; i++) {
          if (
            tipDataRef.current[x].currency ===
            currencyDataRef.current[i].currency
          ) {
            setDisplay('CountryInfo');
            setCountryTipData(tipDataRef.current[x]);
            setCountryCurrencyData(
              Math.round(currencyDataRef.current[i].conversion * 100) / 100
            );
          }
        }
      }
    }
  };

  switch (display) {
    case 'CountryList':
      return (
        <CountryList
          displayCountryInfo={displayCountryInfo}
          tipDataRef={tipDataRef}
        />
      );
    case 'CountryInfo':
      return (
        <CountryInfo
          displayCountryList={displayCountryList}
          countryTipData={countryTipData}
          countryCurrencyData={countryCurrencyData}
        />
      );
    default:
      return <CountryList displayCountryInfo={displayCountryInfo} />;
  }
}
