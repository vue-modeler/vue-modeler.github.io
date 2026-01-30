---
title: API
description: Public API reference for @vue-modeler/model
outline: deep
---

This document describes the public API of [@vue-modeler/model](https://www.npmjs.com/package/@vue-modeler/model).

## [ProtoModel](/api/proto-model)

Abstract base class for reactive models with action support.

### Static methods

| Method | Description |
|--------|-------------|
| [`createModel`](/api/proto-model#createmodel) | Wraps `ProtoModel` in `Model<T>` (proxy) so `@action` methods are exposed as `Action` |
| [`model`](/api/proto-model#model) | Factory for `Model<T>` with the class constructor signature |

### Instance properties (ProtoModel)

| Property | Type | Description |
|----------|------|-------------|
| [`hasPendingActions`](/api/proto-model#haspendingactions) | `boolean` | Whether any action is in `pending` |
| [`hasActionWithError`](/api/proto-model#hasactionwitherror) | `boolean` | Whether any action is in `error` |

### Protected methods (ProtoModel)

| Method | Description |
|--------|-------------|
| [`watch`](/api/proto-model#watch) | Registers `watch`/`watchEffect` in the model's EffectScope |
| [`computed`](/api/proto-model#computed) | Creates `computed` in the model's EffectScope |
| [`action`](/api/proto-model#action) | Returns the `Action` for an `@action` method |
| [`setActionState`](/api/proto-model#setactionstate) | Updates aggregated action state in the model |
| [`validateArgs`](/api/proto-model#validateargs) | Custom argument validation (override in model) |

### Public methods (ProtoModel)

| Method | Description |
|--------|-------------|
| [`isModelOf`](/api/proto-model#ismodelof) | Type check via `instanceof` |
| [`destructor`](/api/proto-model#destructor) | Stops watchers and the model's EffectScope |

## [Action](/api/action)

Class representing an action (decorated method) with execution state and control.

See [Action](/api/action) for static/instance properties and methods: `name`, `owner`, `state`, `exec`, `abort`, `lock`, `unlock`, `resetError`, etc.

## [ActionLike](/api/interfaces#actionlike)

Interface describing the public contract of `Action` without implementation details.

## [ActionError](/api/action-error)

Error class for exceptions thrown during action execution. Stored in `Action.error`. Should be handled and shown in the UI.

### Constructor / Properties / Methods

- `cause: Error` — original error
- `throwCause(): void` — rethrows the cause
- `toString(): string` — message from cause

## [Types](/api/interfaces#types)

Helper types used in the public API: `ActionStateName`, `Model<T>`, `OriginalMethod`, `OriginalMethodWrapper`.

## [Internal errors](/api/action-internal-errors)

Error classes for invalid action lifecycle/state: `ActionStatusConflictError`, `ActionUnexpectedAbortError`, `ActionInternalError`.
