import React, { useState, useRef, useEffect } from 'react';
import CountryList from './CountryList';
import CountryInfo from './CountryInfo';

export default function ListingsBody() {
  const [display, setDisplay] = useState('CountryList');
  const [countryTipData, setCountryTipData] = useState([]);
  const [countryCurrencyData, setCountryCurrencyData] = useState('');
  const [currencyData, _setCurrencyData] = useState([]);
  const currencyDataRef = useRef(currencyData);
  const setCurrencyData = (newCurrencyData) => {
    currencyDataRef.current = newCurrencyData;
    _setCurrencyData(newCurrencyData);
  };

  // Get currency data
  useEffect(() => {
    fetch('https://brandonscode.herokuapp.com/tipjar/currency-data')
      .then((res) => res.json())
      .then((result) => {
        setCurrencyData(result);
      });
  });

  // Display CountryList screen
  const displayCountryList = () => {
    setDisplay('CountryList');
  };

  // Display CountryInfo screen + get and define country data
  const displayCountryInfo = (country) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    fetch(`https://brandonscode.herokuapp.com/tipjar/search/country/${country}`)
      .then((res) => res.json())
      .then((result) => {
        for (var i = 0; i < currencyDataRef.current.length; i++) {
          if (result.currency === currencyDataRef.current[i].currency) {
            setDisplay('CountryInfo');
            setCountryTipData(result);
            setCountryCurrencyData(
              Math.round(currencyDataRef.current[i].conversion * 100) / 100
            );
          }
        }
      });
  };

  switch (display) {
    case 'CountryList':
      return <CountryList displayCountryInfo={displayCountryInfo} />;
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
