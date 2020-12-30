Short sketch comparing different testing-library/react approaches.

Question:

Why does setting state, an async operation, not break a syncronous approach to testing based on getByTestId?

Answer:

The answer has to do with how react reconciler dispatches updates for performance.

If react is in a position to rollup mulitple setState operations into one pass, and there are _no_ other updates, it will behave syncronously because it does one update.

On the flip side of this, if react is _not_ in a position to batch multiple setState calls at the same time, or if react encounters a piece of async code such as a promise or a setTimeout, it will behave asyncronously because it has to do multiple setState calls or wait for the completion of a future or the next tick.

Proof:

As of today, react is not clever enough to dispatch multiple setState calls that are coming from inside a promise. see source: https://blog.logrocket.com/simplifying-state-management-in-react-apps-with-batched-updates/

This way, we can use a promise in our code sketch to force react out of both sync behavior and dispatch optiomization. (see the render count ref() for proof that more renders are happening)

In this code sketch we have two calls to update multiple pieces of state, one wrapped in a promise to force async and no dispatch, and another call that react can optimize into one syncronous state update.

In our tests, we compare and contrast each of these approaches.

Findings:

1. What we find is that the syncronous getByTestId works in situations where react can dispatch state updates into a single call and there is no async code.

2. We also find that getByTestId alone will not handle cases where setState is asyncronous because it will not wait and retry the assertion on future ticks of the event loop.

Take aways:

1. When react can roll up events, it behaves a bit more syncronously.
2. When react cant roll up updates, it behaves a bit more asyncronously.

Learnings:

Because we cannot rely on react updates to be syncronous, eventhough this is possible based on this code sketch, it is still much better practice to use findBy\* with async + await for any component that has a state update.

This is because our applications are complex and we need to account for that complexity in our tests by treating components as if they may dispatch multiple state calls. This also makes our tests much more resiliant against implementation details.
