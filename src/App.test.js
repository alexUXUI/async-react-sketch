import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("It tests the behavior of dispatched updates", () => {
  // this test works because react is able to roll up the
  // two state updates into one syncronous set state call
  it("tests batched update behavior", () => {
    const { getByTestId } = render(<App />);
    const batchedUpdates = getByTestId("batched-btn");

    fireEvent.click(batchedUpdates);

    getByTestId("number");
    getByTestId("letter");
  });

  // This test does not work because the set state update is
  // asyncronous since there is a promise and react is having to rerender multiple times
  xit("tests unbatched update behavior", () => {
    const { getByTestId } = render(<App />);
    const unbatchedUpdates = getByTestId("unbatched-btn");

    fireEvent.click(unbatchedUpdates);

    getByTestId("number");
    getByTestId("letter");
  });

  // this test works because we await the
  // next tick of the event loop, and for the micro and macro task queues to flush,
  // we then retry the assertions in the async waitFor using the sync getBy*
  it("tests unbatched update behavior", async () => {
    const { getByTestId } = render(<App />);
    const unbatchedUpdates = getByTestId("unbatched-btn");

    fireEvent.click(unbatchedUpdates);

    await waitFor(() => {
      getByTestId("number");
      getByTestId("letter");
    });
  });

  // this test works but is better because we dont not have to rely on
  // waitFor, we can use findBy* to get that retry behavior for free!
  it("tests unbatched update behavior", async () => {
    const { getByTestId, findByTestId } = render(<App />);
    const unbatchedUpdates = getByTestId("unbatched-btn");

    fireEvent.click(unbatchedUpdates);

    await findByTestId("number");
    await findByTestId("letter");
  });
});
