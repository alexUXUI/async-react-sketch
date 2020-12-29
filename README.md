Short sketch comparing different testing-library/react approaches.

This app is comprised of one component, `<App />`

1. Initially `<App />` does not show a list of pokemon
2. When the button "set pokemon" is clicked, the list of pokemon is mounted to the DOM
3. The `<App />` component takes one prop: usesTimeout
4. The instance that `usesTimeout` wraps its state update call in a setTimeout to simulate async behavior
5. The instance that does not have the setTimeout enabled, still has the async behavior of `setState` or `useState`

We are going to study how using async/await and findBy* compares to using no async await and using getBy*.

To run the comparison, download this repo, npm i, and npm run test.

The key difference is that eventhough both tests "pass" only the approach that uses async / await can capture the output of the next tick in the event loop. This is illustrated by the console.logs in the `useEffect` on line 6.

What we see is that for both components, the useEffect is run twice. Once when the component mounts and once when the state is updated. The difference is that only the tests that use async / await can capture the output in the setTimeout, "Timeout 2".

As a result, it can be determined that using async / await is a better approach for testing state updates even if the second appraoch techincally "works".
