---
title: Testing
description: Testing models and actions in Vue Modeler
---

[@vue-modeler/model](https://www.npmjs.com/package/@vue-modeler/model) lets you write less code, so you need fewer tests. You don't have to assert that action state is set correctly unless your model's business logic depends on it.

## Unit testing

- No extra tools: no special libraries or plugins.
- Same as testing plain class instances.

For each test:

1. Mock dependencies
2. Create the model (e.g. `MyModel.model(mockApi)`)
3. Run the test

Key points:

- Create models via the static `model` method
- Actions are `Action` objects; run them via `exec()`
- If business logic doesn't depend on action state/errors, you don't need to assert them
- Dependencies are easy to mock and pass in the constructor
- Models are reactive; be aware of reactivity when testing

## Example

A simple cart: authenticated user only, stores SKUs, syncs on add/remove. Full test example (e.g. login → logout → login again and assert re-init) can use Vitest with mocks and `nextTick`. See the [cart example tests](https://github.com/vue-modeler/model/tree/main/examples/cart) for the full suite.
