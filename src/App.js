import { useEffect, useLayoutEffect, useState, useRef } from "react";

function App() {
  const [number, setNumber] = useState(undefined);
  const [letter, setLetter] = useState(undefined);

  const renderCount = useRef(0);

  console.log(`Render: ${(renderCount.current += 1)}`);

  return (
    <div>
      Sample component
      <button
        data-testid="batched-btn"
        onClick={(e) => {
          setNumber(1);
          setLetter("a");
        }}
      >
        batched updates
      </button>
      <button
        data-testid="unbatched-btn"
        onClick={(e) => {
          // react doesnt know how to batch updastes from inside a promise
          Promise.resolve().then(() => {
            setNumber(1);
            setLetter("b");
          });
        }}
      >
        sync updates
      </button>
      {number && <div data-testid="number">{number}</div>}
      {letter && <div data-testid="letter">{letter}</div>}
    </div>
  );
}

export default App;
