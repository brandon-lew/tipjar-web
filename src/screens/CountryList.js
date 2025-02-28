import React from 'react';

export default function CountryList(props) {
  return (
    <div className='body fadeIn'>
      <div className='list'>
        <ul>
          {props.tipDataRef.current.map((data, key) => {
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
