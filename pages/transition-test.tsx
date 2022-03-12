import { useState } from 'react';

import { Button } from '@components/ui';

const WORD = "'Hello, Coxwave'";

export default function TransitionTest() {
  const [renderWord, setRenderWord] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  return (
    <div className="flex justify-center pt-20">
      <div>
        <div className="bg-pink-400 rounded-lg mx-auto w-56 h-80 text-white flex justify-center shadow-md items-center transition-transform hover:skew-y-12 hover:-skew-x-3">
          <p className="text-4xl font-semibold pointer-events-none">Test Card</p>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-12">
          <p className="text-gray-500 text-lg">Use state: </p>
          <p className="text-2xl w-48 border-b border-gray-400 h-10">{renderWord}</p>
          <Button
            className="w-48 flex justify-center"
            disabled={disableButton}
            onClick={() => {
              setRenderWord('');
              let i = 0;
              const myInterval: NodeJS.Timeout = setInterval(() => {
                setDisableButton(true);
                const currentLetter = WORD[i++];

                setRenderWord((prev) => `${prev}${currentLetter}`);
                if (i === WORD.length) {
                  setDisableButton(false);
                  return clearInterval(myInterval);
                }
              }, 500);
            }}
          >
            Render Text
          </Button>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-12">
          <p className="text-gray-500 text-lg">Use span: </p>
          <p className="text-2xl w-48 border-b border-gray-400 h-10">
            <span>
              {WORD.split('').map((text, idx) => {
                const delayNum = 0.5 + idx / 10;

                return (
                  <span
                    aria-hidden="true"
                    style={{ animationDelay: `${delayNum}s` }}
                    key={`animation-text-${idx}`}
                  >
                    {text}
                  </span>
                );
              })}
            </span>
          </p>

          <Button className="w-48 flex justify-center" disabled={true}>
            Automatic Render
          </Button>
        </div>
      </div>
      <style jsx>
        {`
          p span span {
            position: relative;
            opacity: 0;
            animation: move-text 0.75s forwards;
          }

          @keyframes move-text {
            0% {
              bottom: -0.2em;
              opacity: 1;
            }
            50% {
              bottom: 0.2em;
            }
            100% {
              bottom: 0;
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
