---
title: Action
description: Action methods and properties reference
outline: deep
---

Class representing an action (decorated method) with execution state and control.

```typescript
class Action<T extends object, Args extends any[] = unknown[]>
```

**Generics:** `T` — model type; `Args` — action method arguments.

## Static: `possibleState`, `actionFlag`, `abortedByLock`

All possible state names; symbol used by `@action`; symbol for lock-induced abort.

## Static: `Action.create`

Factory for a reactive (shallowReactive) Action instance. Not called directly; used internally.

## Instance properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Action (method) name |
| `owner` | `Model<T>` | Owning model |
| `state` | `ActionStateName` | Current state |
| `abortController` | `AbortController \| null` | When `pending` |
| `args` | `Args \| never[]` | Last exec arguments |
| `promise` | `Promise<void> \| null` | Current run when `pending` |
| `error` | `ActionError \| null` | When `error` |
| `abortReason` | `unknown` | When `abort` |
| `isPending`, `isError`, `isReady`, `isLock`, `isAbort` | `boolean` | State flags |

## Instance methods

| Method | Description |
|--------|-------------|
| `is(...states): boolean` | Whether action is in any of the given states |
| `validate(...args): Error[]` | Validates arguments (does not run exec) |
| `exec(...args): Promise<void>` | Runs the action. Catches exceptions → `ActionError` in `error`. Optional last arg: `AbortController`. |
| `abort(reason?): Promise<void>` | Cancels if `pending` |
| `lock(): Promise<void>` | Locks; if `pending`, aborts with `abortedByLock` |
| `unlock(): this` | Unlocks (only when `lock`) |
| `resetError(): this` | Clears error state (only when `error`) |
| `toString(): string` | Action name |

**Note:** `exec` catches exceptions and puts them in `error`; `try/catch` around `exec()` will not catch those. Check `action.error` after awaiting or watch it.

See also: [ActionLike](/api/interfaces#actionlike), [ActionError](/api/action-error), [Internal errors](/api/action-internal-errors).
