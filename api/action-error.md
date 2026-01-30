---
title: ActionError
description: ActionError class reference
outline: deep
---

Error class for an exception thrown during action execution. Stored in [`Action.error`](/api/action#error).

::: tip
This is the exception you should handle and show to the user in the UI.
:::

## Constructor

### `new ActionError(actionName: string, options: { cause: Error })`

**Parameters:** `actionName` — name of the action; `options.cause` — original error.

**Properties:** `name: 'ActionError'`, `message` from cause.

## Instance properties

### `cause: Error` (read-only)

The original error that caused this ActionError.

## Instance methods

### `throwCause(): void`

Rethrows the original cause.

### `toString(): string`

Returns the cause's message.

## Example

```typescript
await model.fetchUser.exec()
if (model.fetchUser.error) {
  console.error('Action failed:', model.fetchUser.error.cause)
  model.fetchUser.error.throwCause()
}
```

See also: [Action](/api/action), [Internal errors](/api/action-internal-errors).
