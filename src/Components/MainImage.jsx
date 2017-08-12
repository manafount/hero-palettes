import React from 'react';

function MainImage (props) {
    return (
      <img id="bg-main" src={props.src} alt={props.heroName} onLoad={props.animateAppear}/>
    );
}
export default MainImage;