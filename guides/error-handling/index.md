---
title: Error Handling
description: Error handling in Vue Modeler
---

# Error Handling

Actions catch exceptions thrown during execution, wrap them in `ActionError` and store them in `action.error`. So `try...catch` around `action.exec()` does not catch those errors.

Check `action.error` after awaiting `exec()`, or watch `action.error` in the component.

```typescript
await action.exec()
if (action.error?.cause instanceof HttpError) {
  console.error('HTTP error:', action.error.cause.message)
}
action.error?.throwCause() // rethrow the original error
```

See [Action — Handling errors](/guides/action#handling-errors) and [ActionError API](/api/action-error).
