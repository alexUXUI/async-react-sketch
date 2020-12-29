import { useEffect, useState } from "react";

function App({ usesTimeout }) {
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    // add some more side-effecty code to help illustrate

    // this output is logged in our test runner for both tests
    console.log(`Timeout 1`);

    // this only gets output in the test that uses Async Await
    setTimeout(() => {
      console.log(`Timeout 2`);
    }, 250);
  }, [pokemon]);

  return (
    <>
      <ul data-testid="pokemon--async">
        <button
          data-testid="set-pokemon"
          onClick={(e) => {
            usesTimeout
              ? setTimeout(() => {
                  setPokemon(POKEMON);
                }, 250)
              : setPokemon(POKEMON);
          }}
        >
          Set pokemon
        </button>
        {pokemon && pokemon.length
          ? pokemon.map((pokemon, idx) => {
              return (
                <li key={idx} data-testid={`pokemon--async-${idx + 1}`}>
                  {pokemon.name}
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}

const POKEMON = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
  "weedle",
  "kakuna",
  "beedrill",
  "pidgey",
  "pidgeotto",
  "pidgeot",
  "rattata",
  "raticate",
];

export default App;
