import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../Animation.json'; 

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="animation-overlay">
      <div className="animation-container">
        <Lottie options={defaultOptions} height={200} width={200} />
        {/* <p>Loading...</p> */}
      </div>
    </div>
  );
};

export default LoadingAnimation;
