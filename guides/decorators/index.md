---
title: Decorators
description: Using decorators in Vue Modeler
---

# Decorators

The main decorator in Vue Modeler is `@action`, used to declare async actions on model methods.

## @action

Use `@action` on async methods that return `Promise<void>`:

```typescript
import { ProtoModel } from '@vue-modeler/model'
import { action } from '@vue-modeler/model'

export class UserModel extends ProtoModel {
  users = []

  @action async fetchUsers(): Promise<void> {
    const response = await fetch('/api/users')
    this.users = await response.json()
  }
}
```

The decorator marks the method so that when the model is created, it becomes an action object with `exec()`, `isPending`, `error`, etc. See [Action](/guides/action) for full usage.

## Constraints

- Only on class methods (not standalone functions).
- Only on methods (not on properties).
- Only in classes that extend `ProtoModel`.
