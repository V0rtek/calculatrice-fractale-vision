"use client";
import React, { useState } from "react";
import { evaluate } from 'mathjs';

export default function Home() {
  const [input, setInput] = useState("");
  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  function calculateInput() {
    console.log(input);
    try {
      setInput(evaluate(input).toString()); // Suggéré par ChatGPT
    } catch {
      setInput('Error');
    }
  }

  function clearInput() {
    setInput('');
  }

  function handleButtonPress(button: string) {
    if (button === '=') {
      calculateInput();
    } else {
      setInput(input + button);
    }
  }

  // Source pour la partie adaptive: https://tailwindcss.com/docs/responsive-design
  return (
    <div className="grid bg-gray-950 grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="text-xl w-full font-bold uppercase text-blue-500 text-center">Calculatrice Fractale Vision</div>
      <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <input 
                type="text" 
                className="w-full h-full px-6 py-4 text-lg font-semibold text-black placeholder-gray-500 bg-gray-100 border-0 rounded-l-xl focus:ring-0 focus:outline-none" 
                placeholder="Calcul ici" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="p-8">
              {buttons.map((row, i) => (
                <div key={i} className="flex justify-center">
                  {row.map((button) => (
                    <button 
                      key={button} 
                      className="w-14 py-2 m-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                      onClick={() => handleButtonPress(button)}
                    >
                      {button}
                    </button>
                  ))}
                </div>
              ))}
              <button className="mt-4 w-full py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                onClick={clearInput}
                >
                Clear
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="mt-2 text-gray-500 text-center">
          Créé par Justin Morand dans le cadre du test technique pour le poste de stagiaire chez Fractale Vision.
        </p>
      </footer>
    </div>
  );
}

