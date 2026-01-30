---
title: Internal Errors
description: Action internal error classes reference
outline: deep
---

# Internal Errors

Error classes for invalid action lifecycle or state. They usually indicate misconfiguration or misuse and should not be caught in application code.

## ActionStatusConflictError

Thrown when trying to change action state in an invalid way.

**Examples:**
- Running a locked action
- Running an action that is already `pending`
- Unlocking an action that is not locked

```typescript
await action.lock()
await action.exec() // Throws ActionStatusConflictError
```

## ActionUnexpectedAbortError

Thrown when an abort occurs but the action is not in `pending` or `lock`.

**Examples:** Aborting an action that is already finished or in a wrong state.

## ActionInternalError

Internal error for action setup or usage problems.

**Examples:**
- `@action` decorator not applied to the method
- Model does not have a method with the given name
- Method is not an action (missing `Action.actionFlag`)

```typescript
class MyModel extends ProtoModel {
  async fetchData() { } // Missing @action — ActionInternalError when creating Action
}
```

See also: [Action](/api/action), [ActionError](/api/action-error).
