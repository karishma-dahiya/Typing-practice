import React from 'react';
import useSound from 'use-sound';
import correctSound from '../correct.mp3';
import wrongSound from '../wrong.mp3';

const Typingbox = ({ nextKey, handleKeyPress, handleChange, userInput, disabled, isPracticeStarted, setIsPracticeStarted  }) => {
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

  const handleKeyDown = (e) => {
    const keyPressed = e.key;
    const expectedKey = nextKey;

    // Play sound effect based on correctness
    if (keyPressed.toLowerCase() === expectedKey.toLowerCase()) {
      playCorrect();
    } else {
      playWrong();
    }

    handleKeyPress(e);

    if (!isPracticeStarted) {
      setIsPracticeStarted(true);
    }
  };

  return (
    <div className='flex flex-col mt-20 gap-4'>
      <p className='lg:h-12 h-8 lg:py-2 py-1 w-[250px] lg:w-[700px] bg-slate-700 font-semibold text-center text-slate-50 text-lg lg:text-3xl'>
        {nextKey}
      </p>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Use handleKeyDown instead of handleKeyPress
        disabled={disabled}
        placeholder='Type here...'
        className='lg:h-14 h-9 w-[250px] lg:w-[700px] border-2 font-semibold px-2 text-black'
      />
    </div>
  );
};

export default Typingbox;



