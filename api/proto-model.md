---
title: ProtoModel
description: Model methods and properties reference
outline: deep
---

Abstract base class for reactive models with action support.

```typescript
abstract class ProtoModel
```

## Static methods

### `createModel`

```typescript
ProtoModel.createModel<Target>(protoModel: Target): Model<Target>
```

Wraps a ProtoModel instance in a proxy so action getters return `Action` instances instead of the original methods.

**Parameters:** `protoModel` — instance of a class extending ProtoModel  
**Returns:** `Model<Target>`  
**Throws:** `TypeError` if the argument is not a ProtoModel instance

### `model`

```typescript
ProtoModel.model<T, Args>(...args: Args): Model<T>
```

Static factory for creating a model instance. Call on a class extending ProtoModel. Mirrors the class constructor signature.

**Parameters:** `...args` — constructor arguments  
**Returns:** `Model<T>`  
**Throws:** `Error` if called directly on ProtoModel (abstract class)

## Instance properties

### `hasPendingActions`

`readonly hasPendingActions: boolean` — `true` if any action is in `pending`.

### `hasActionWithError`

`readonly hasActionWithError: boolean` — `true` if any action is in `error`.

## Protected methods

### `watch`

Registers a watcher in the model's effect scope. Uses Vue's `watch`/`watchEffect`. Returns `WatchStopHandle`. Cannot use with non-reactive properties in constructor (`this` is not yet reactive there).

### `computed`

Creates a computed in the model's effect scope. Parameters: getter, optional debug options. Returns `ComputedRef<T>`.

### `action`

`action(originalMethod): ActionLike<this>` — returns the Action for an `@action` method (creates on first access). Inside the model, use `this.action(this.someAction)` to get the action with correct types.

### `setActionState`

Updates action state tracking in the model. Public on ProtoModel, protected on Model.

### `validateArgs`

`protected validateArgs(action, ...args): Error[]` — validates action arguments. Override in your model for custom validation. See [Argument validation](/advanced/args-validation). Default implementation returns one error (not implemented).

## Public methods

### `isModelOf`

`isModelOf<T>(typeModel: ModelConstructor<T>): boolean` — type check via constructor.

### `destructor`

`destructor(): void` — cleans up the model: stops watchers and effect scope. Call when the model is no longer needed to avoid memory leaks.
