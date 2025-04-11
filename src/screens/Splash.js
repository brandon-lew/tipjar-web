import React from 'react';

// List of splash photos
const photos = [
  'banner1.jpg',
  'banner2.jpg',
  'banner3.jpg',
  'banner4.jpg',
  'banner5.jpg',
  'banner6.jpg',
  'banner7.jpg',
  'banner8.jpg',
  'banner9.jpg',
  'banner10.jpg',
];

// Get random photo
const random = Math.floor(Math.random() * photos.length);

// Define background image
const splashBackground = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/${photos[random]})`,
};

export default function Splash(props) {
  return (
    <div className='splash' style={splashBackground}>
      <div className='overlay'>
        <div className='header'>
          <h1>TIP JAR</h1>
          <p>A globetrotting guide to gratuity</p>
          <button onClick={() => props.displayListings()}>
            Choose a Location
          </button>
        </div>
      </div>
    </div>
  );
}
