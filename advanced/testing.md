---
title: Testing
description: Testing models and actions in Vue Modeler
---

[@vue-modeler/model](https://www.npmjs.com/package/@vue-modeler/model) lets you write less code, so you need fewer tests. You don't have to assert that action state is set correctly unless your model's business logic depends on it.

## Unit testing

- No extra tools: no special libraries or plugins.
- Same as testing plain class instances.

For each test:

1. Mock dependencies
2. Create the model (e.g. `MyModel.model(mockApi)`)
3. Run the test

Key points:

- Create models via the static `model` method
- Actions are `Action` objects; run them via `exec()`
- If business logic doesn't depend on action state/errors, you don't need to assert them
- Dependencies are easy to mock and pass in the constructor
- Models are reactive; be aware of reactivity when testing

## Example

A realistic example: a shopping cart. Keep it simple:

- Works only for authenticated users
- Stores SKUs without quantity
- Syncs automatically on add/remove

```typescript
// examples/cart.ts
import { ProtoModel, action } from '@vue-modeler/model'
import { ShallowReactive } from 'vue'

interface ApiService {
  fetchAll: () => Promise<string[]>
  add: (sku: string) => Promise<string[]>
  remove: (sku: string) => Promise<string[]>
}

interface User {
  isLoggedIn: boolean
}

export class Cart extends ProtoModel {
  protected _items: Set<string> = new Set()

  constructor(
    // from outside, user can be a model. Since a model is a ShallowReactive object,
    // it will be compatible with ShallowReactive<User>
    private user: ShallowReactive<User>,
    private api: ApiService,
  ) {
    super()

    this.watch(
      () => this.user.isLoggedIn,
      async (isLoggedIn: boolean) => {
        // if user state changed but init is still running — abort it
        if (this.action(this.init).isPending) {
          await this.action(this.init).abort()
        }

        // if user is logged in, run init and return.
        // No need to await init. If user state changes again while init runs — it will abort above
        if (isLoggedIn) {
          this.init()
          return
        }

        // user logged out, clear the cart
        this._items = new Set()
      },
      { immediate: true },
    )
  }

  get items(): Set<string> {
    return this._items
  }

  @action async init(): Promise<void> {
    const res = await this.api.fetchAll()
    this._items = new Set(res)
  }

  @action async add(sku: string): Promise<void> {
    const res = await this.api.add(sku)
    this._items = new Set(res)
  }

  @action async remove(sku: string): Promise<void> {
    const res = await this.api.remove(sku)
    this._items = new Set(res)
  }
}
```

Below is a test for the more complex scenario: create cart → user logs in → user logs out → user logs in again.

The full test suite is available in the [cart example tests](https://github.com/vue-modeler/model/tree/main/examples/cart).

```typescript
import { nextTick } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowReactive, ShallowReactive } from 'vue'
import { Cart } from '../cart'
import type { Model } from '@vue-modeler/model'

interface ApiService {
  fetchAll: () => Promise<string[]>
  add: (sku: string) => Promise<string[]>
  remove: (sku: string) => Promise<string[]>
}

interface User {
  isLoggedIn: boolean
}

describe('Cart', () => {
  let apiService: ApiService
  let user: ShallowReactive<User>
  let cart: Model<Cart>

  beforeEach(() => {
    apiService = {
      fetchAll: vi.fn(),
      add: vi.fn(),
      remove: vi.fn(),
    }

    user = shallowReactive<User>({
      isLoggedIn: false,
    })

    cart = Cart.model(user, apiService)
  })
  ...

  describe('watch behavior', () => {
    ...

    it('watches user login state and re-initializes items when user logs back in after logout', async () => {
      const firstItems = ['item1', 'item2']
      const secondItems = ['item3', 'item4', 'item5']

      vi.mocked(apiService.fetchAll)
        .mockResolvedValueOnce(firstItems)
        .mockResolvedValueOnce(secondItems)

      // First login
      user.isLoggedIn = true
      await nextTick()
      expect(cart.items.size).toBe(2)

      // Log out
      user.isLoggedIn = false
      await nextTick()
      expect(cart.items.size).toBe(0)

      // Log in again
      user.isLoggedIn = true
      await nextTick()
      expect(cart.items.size).toBe(3)
      expect(Array.from(cart.items)).toEqual(secondItems)
      expect(apiService.fetchAll).toHaveBeenCalledTimes(2)
    })
  })
})
```
