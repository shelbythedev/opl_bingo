import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import shuffle from "shuffle-array";

import "./styles.css";

import { start } from "./Confetti";

function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}

function Tile({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const bbb = [
  'Crown Royal bag',
  'Danny Brown smells weed',
  'No shirt',
  'Hooptie',
  'Dan Abrams is punny',
  'License plate lights out',
  'K9',
  'At gunpoint',
  'Car pursuit',
  'Foot pursuit',
  'Taser deployed',
  'Not my pants',
  'Not my weed',
  'Not my car',
  'Suspended license',
  'Sovereign Citizen',
  'Living in a car',
  '"Couple of (2) beers"',
  'Dan says, "What`s going on in...',
  '"I see lights flashing"',
  'Spikes deployed',
  'Sticks talks about Tulsa',
  'Tail light touch',
  'Request backup',
  '"Step it up"',
  'Missed a court date',
  'Domestic disturbance',
  'Gun found',
  'Narcotics found',
  'Cell phone camera',
  'TV shoutout',
  '"Don`t film me"/No cameras',
  'Off-road vehicle',
  'Trespassed',
  'A puppy!',
  'Obama Mart',
  'Florida Man',
  'Octogenarian',
  'No insurance',
  'No license',
  'Warrants',
  'Underwear',
  '"I didn`t do anything!"',
  'Tail light out',
  'Hoarder',
  'Fentanyl',
  'Trafficking',
  'Consent to search',
  'Dan: "We`ll keep an eye on that..."',
  '"Civil matter"',
  'Disgruntled neighbors',
  'Intoxicated',
  'Crowd scatters',
  'Stolen car',
  'Hoodie',
  'Wreck',
  '"Few minutes out"',
  '"Got something here"',
  '"Let`s get in a break"',
  'Bicycle',
  'Crying',
  'Handcuffed',
  'Reading rights (Miranda)',
  'Standoff',
  'Say no to [butt]crack',
  'Resisting arrest',
  'Uncooperative',
  'Unresponsive',
  'Evidence thrown out window',
  'Felony stop',
  'No ID',
  '"Don`t reach"/"Quit reaching"',
  'Knife found',
  'Officer Sarcasm arrives',
  'Not my drugs',
  '"Anything to drink tonight?"',
  'Field sobriety test',
  '"Show [me/us] your hands"',
  '"Get on the ground"'
];

const data = shuffle(bbb).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

function App() {
  const [state, setState] = useState({ checked: {} });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className="App">
      <h1>Bingo</h1>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
      </div>
      {state.won ? <Confetti /> : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
