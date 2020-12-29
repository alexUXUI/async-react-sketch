import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("It has a test suite that tests the behavior", () => {
  it(`<App /> shows list of pokemon on click`, async () => {
    // 1) Render the component
    // 2) At this point, no pokemon are in the DOM

    const { container, getByTestId, findByTestId, debug } = render(
      <App usesTimeout={true} />
    );

    // 3) Get ref to btn to set pokemon in state
    const setPokemonBtn = getByTestId("set-pokemon");

    // Search for the existence of the first Pokemon in the DOM,
    // using getByTestId. this does *not* work.
    // getByTestId("pokemon--async-1");

    // Eventhough there are no pokemon in the DOM,
    // using findByTestID works
    // findByTestId("pokemon--async-1");

    // this, however, does not work
    // await findByTestId("pokemon--async-1");

    await userEvent.click(setPokemonBtn);

    // button was clicked but this still does not find the pokemon
    // getByTestId("pokemon--async-1");

    await findByTestId("pokemon--async-1");

    await waitFor(() => {
      /**
       This works because:
       If you return a promise in the waitFor callback 
       (either explicitly or implicitly with async syntax), 
       then the waitFor utility will not call your callback again until 
       that promise rejects. This allows you to waitFor things that must be 
       checked asynchronously.
       */
      getByTestId("pokemon--async-1");
    });
  });

  it(`<App /> shows list of pokemon on click`, () => {
    // In this example, we are not using setTimeout
    const { container, getByTestId, findByTestId, debug } = render(
      <App usesTimeout={false} />
    );

    const setPokemonBtn = getByTestId("set-pokemon");

    userEvent.click(setPokemonBtn);

    getByTestId("pokemon--async-1");
  });
});
