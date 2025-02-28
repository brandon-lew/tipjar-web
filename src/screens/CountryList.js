import React, { useState, useRef, useEffect } from 'react';

export default function CountryList(props) {
  const [countryTipData, _setCountryTipData] = useState([]);
  const countryTipDataRef = useRef(countryTipData);
  const setCountryTipData = (newCountryTipData) => {
    countryTipDataRef.current = newCountryTipData;
    _setCountryTipData(newCountryTipData);
  };

  // Get country tip data
  useEffect(() => {
    fetch('https://brandonscode.herokuapp.com/tipjar/tip-data')
      .then((res) => res.json())
      .then((result) => {
        setCountryTipData(result);
      });
  });

  return (
    <div className='body fadeIn'>
      <div className='list'>
        <ul>
          {countryTipDataRef.current.map((data, key) => {
            return (
              <li key={key}>
                <button onClick={() => props.displayCountryInfo(data.country)}>
                  {data.country}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
