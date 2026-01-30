---
title: Interfaces and Types
description: Public interfaces and types for @vue-modeler/model
outline: deep
---

## Interfaces

### ActionLike

Public contract for `Action` instances without implementation details.

#### Properties (read-only)

Same as `Action`: `name`, `owner`, `possibleStates`, `state`, `abortController`, `args`, `promise`, `error`, `abortReason`, `isPending`, `isError`, `isReady`, `isLock`, `isAbort`.

#### Methods

Same as `Action`: `is`, `validate`, `exec`, `abort`, `lock`, `unlock`, `resetError`, `toString`.

See also: [Action](/api/action), [ActionError](/api/action-error).

---

## Types

### ActionStateName

```typescript
type ActionStateName = 'pending' | 'error' | 'lock' | 'ready' | 'abort'
```

### Model&lt;T&gt;

Type for a model instance wrapped in a proxy. Exposes actions as `Action` instances instead of methods.

### OriginalMethod

Original method type before `@action` is applied.

### OriginalMethodWrapper

Method type after `@action` is applied.
