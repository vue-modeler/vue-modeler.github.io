---
title: Dependency Container
description: Managing dependencies and object lifecycle in Vue applications
---

**[@vue-modeler/dc](https://www.npmjs.com/package/@vue-modeler/dc)** is a dependency container based on [shared composable](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md#example-a-shared-composable).

The container solves the problem of managing model and service lifecycle:

- Simplifies sharing models and services across components
- Separates business logic from presentation
- Enables MVVM, DDD, SOLID principles

## Main features

- ⚡ **Lazy loading**: creates dependencies only when needed
- 🗑️ **Auto cleanup**: removes unused dependencies
- 🔧 **Destructor support**: calls `destructor` on cleanup
- 💾 **Persistent instances**: for long-lived services

::: tip
The dependency container stores dependencies but does NOT support autowire. You wire dependencies in your own module or layer.
:::

## How it works

The container follows "create on demand, remove when unused":

1. **Register factory** — you register a factory for the instance and get a shared composable
2. **Create instance** — the instance is created only on first access
3. **Reuse** — subsequent access returns the same instance
4. **Reference tracking** — the container counts how many components use the instance
5. **Cleanup** — when the count reaches 0, the instance is removed

## Registering a factory

`provider` registers a dependency factory and creates a shared composable for use in components.

The factory is a simple function that can return any value.

The container stores whatever the factory returns. It does nothing else and does not inject dependencies.

```typescript
import { provider } from '@vue-modeler/dc';

const useDependency = provider(() => {
  // your instance factory
  return {
    // instance with methods and data
  };
});


// this works too
const useSymbol = provider(() => new Symbol('dependency'));
const useNumber = provider(() => 10);
const useTrue = provider(() => true);

// pass dependencies into the constructor
const useObject = provider(() => new SomeModel(
  useDependency(),
  useSymbol(),
  useNumber(),
  useTrue()
));
```

## Using in components

Example of using a provider in a component template:

```html
<template>
  <div>{{ model.state }}</div>
</template>

<script setup lang="ts">
import { useDependency } from '@/providers/myDependency';

const model = useObject(); // get the instance
</script>
```

## Persistent instances

Sometimes you need an instance that stays in memory after use, e.g. app-level services, caches, or state managers.

Pass `persistentInstance: true` to `provider`:

```typescript
const usePersistentService = provider(
  () => new MyService(),
  { persistentInstance: true }
);
```

Persistent instances:

- Remain in the container even after the scope is released
- Keep their state across component remounts
- Nested providers inside a persistent provider become persistent automatically
- Useful for app-level services, caches, and state managers

Example with nested providers:

```typescript
// nested provider becomes persistent with the parent
const useNestedService = provider(() => new NestedService());

const usePersistentService = provider(
  () => new MainService(useNestedService()),
  { persistentInstance: true }
);
```

::: warning
On the client, use persistent instances with care — they are not removed automatically.
:::

For SSR, persistent instances are safe: each request gets a new container instance, and the previous one is discarded with its contents.
