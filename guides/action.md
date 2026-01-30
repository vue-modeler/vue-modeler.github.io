---
title: Action
description: Guide to creating and using actions in Vue Modeler
outline: deep
---

**In [@vue-modeler/model](https://www.npmjs.com/package/@vue-modeler/model), an action is a first-class object** that holds an operation to change model state, with methods to control execution and properties for execution state.

## Concept

- An action is declared as a model method with the `@action` decorator. The method is async and returns nothing.
- The method is turned into an action when the model is created.
- The action belongs to the model where it is declared.
- The action keeps the model context wherever it is used.

Benefits:

- execution status is available without boilerplate;
- cancel, lock, unlock are methods — no need to reinvent the wheel;
- action usage and error handling are consistent and predictable;
- business logic only handles state changes;
- much less code than with other approaches.

**Without actions (boilerplate):** you end up with flags like `isAddingProduct`, `addError`, try/catch/finally in every operation. **With actions:** you declare the method with `@action` and use `action.exec()`, `action.isPending`, `action.error`. The action object handles state and errors.

## Using actions

### Declare

Add `@action` to an async method that returns `Promise<void>`.

Requirements: class extends `ProtoModel`; method returns `Promise<void>`; method is decorated with `@action`.

### Get the action object

After the model is created, the action is a property and an object. Use the method name. TypeScript types work.

```typescript
// ✅ Correct — use .exec()
await cartModel.addProduct.exec(productId);

// ❌ Wrong — TypeScript will complain
await cartModel.addProduct(productId);
```

**Inside the model**, TypeScript sees the action as a method. To access its properties and methods, use `this.action(this.addProduct)`. That returns the action with correct types.

### Execute

**Outside:** get the action from the model and call `exec(...)`. It mirrors the original method signature.

**Inside the model:** either get the action via `this.action(this.addProduct)` and call `exec(...)`, or call `this.addProduct(args)` as a method (the decorator forwards to `exec`).

::: warning
Inside the class, `this.addProduct()` looks like a normal method call but it is not. The `@action` decorator replaces the method and under the hood calls `exec(...)`. So `try...catch` will not behave as usual. See [Error handling](/guides/action#handling-errors).
:::

### State

An action can be in one of five states, each with a property:

- **`isReady`** — ready to run (initial state)
- **`isPending`** — currently running
- **`isAbort`** — was cancelled
- **`isLock`** — locked and cannot run
- **`error`** — finished with error (`ActionError` or `null`)

All are reactive and read-only. Use them in templates and watchers.

### Handling errors

Any action can finish with an error. `exec(...)` catches exceptions, wraps them in `ActionError` and stores them in `error`. So `try...catch` around `exec()` does not catch those errors. Check `action.error` after awaiting `exec()` or watch `action.error`.

To rethrow: `action.error?.throwCause()`.

When a child action fails, the error stays on the child. The parent continues. To abort the parent, call `this.child.childAction.error?.throwCause()` in the parent action.

### Cancelling

Use `abort()`. It is built on `AbortController`.

To support abort:

1. The action method’s last parameter must be of type `AbortController`.
2. The parameter must be optional so TypeScript doesn’t require it when calling `exec`.
3. The method body must use the passed `AbortController` (e.g. pass it to fetch or API calls).

`exec` creates or accepts an `AbortController`, passes it as the last argument, and keeps it for the run. Calling `action.abort()` triggers abort on that controller; the action then goes to `abort` state and stores the reason in `abortReason`.

When one action calls another and both should be cancellable, pass the same `AbortController` into the child’s `exec(abortController)`.

See the full [Action API](/api/action) for all properties and methods.
