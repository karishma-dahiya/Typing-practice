import React from 'react';

const Stats = ({ keysPressed, accuracy, timer }) => {
  return (
      <div className='flex flex-col font-semibold lg:text-lg mt-10'>
        <p>Time Remaining: {timer} seconds</p>  
        <p>Keys Pressed: {keysPressed}</p>
        <p>Accuracy: {accuracy}%</p>
      
    </div>
  );
};

export default Stats;

