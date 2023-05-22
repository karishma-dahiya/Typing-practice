import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typingbox from './components/Typingbox';
import Stats from './components/Stats';
import { typeKeyPressed, resetStats } from './reducers/reducers';

const App = () => {
  const [timer, setTimer] = useState(300); // Initial timer value in seconds (5 minutes)
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);
  const [isPracticeFinished, setIsPracticeFinished] = useState(false);
  const [userInput, setUserInput] = useState('');
  const state = useSelector((state) => state);
  const { keysPressed, accuracy, nextKey } = state;
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    const keyPressed = e.key;
    const expectedKey = nextKey;

    dispatch(typeKeyPressed({ keyPressed, expectedKey }));

    if (!isPracticeStarted) {
      setIsPracticeStarted(true);
    }
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const startPractice = () => {
    setIsPracticeStarted(true);
  };

  useEffect(() => {
    if (isPracticeStarted && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsPracticeFinished(true);
    }
  }, [isPracticeStarted, timer]);

  const resetPractice = () => {
    setIsPracticeStarted(false);
    setIsPracticeFinished(false);
    setTimer(300);
    setUserInput('');
    dispatch(resetStats());
  };

  return (
    <div className='h-max flex text-white flex-col justify-center items-center'>
      <h1 className='my-6 font-bold text-3xl'>Typing Practice</h1>
      {!isPracticeStarted && (
        <button
          className='mt-40 rounded text-lg h-12 w-28 bg-blue-500'
          onClick={startPractice}
        >
          Start
        </button>
      )}
      {isPracticeStarted && !isPracticeFinished && (
        <>
          <Typingbox
            nextKey={nextKey}
            handleKeyPress={handleKeyPress}
            handleChange={handleChange}
            userInput={userInput}
            disabled={isPracticeFinished}
            isPracticeStarted={isPracticeStarted} // Pass isPracticeStarted as a prop
            setIsPracticeStarted={setIsPracticeStarted} // Pass setIsPracticeStarted as a prop
          />
          <Stats keysPressed={keysPressed} accuracy={accuracy} timer={timer} />
        </>
      )}
      {isPracticeFinished && (
        <>
          <Stats keysPressed={keysPressed} accuracy={accuracy} timer={timer} />
          <button
            className='mt-5 rounded text-lg h-12 w-28 bg-blue-500'
            onClick={resetPractice}
          >
            Start Again
          </button>
        </>
      )}
    </div>
  );
};

export default App;







