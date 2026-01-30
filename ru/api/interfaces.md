---
title: Интерфейсы и типы
description: Справочник по публичным интерфейсам и типам @vue-modeler/model
outline: deep
---

## Интерфейсы

### ActionLike

Интерфейс, описывающий публичный контракт для экземпляров `Action` без деталей реализации.

#### Свойства

Все свойства доступны только для чтения и соответствуют свойствам класса `Action`:

| Свойство | Тип |
|----------|-----|
| `name` | `string` |
| `owner` | ``Model<T>`` |
| `possibleStates` | `ActionStateName[]` |
| `state` | `ActionStateName` |
| `abortController` | `null \| AbortController` |
| `args` | `Args \| never[]` |
| `promise` | ``null \| Promise<void>`` |
| `error` | `null \| ActionError` |
| `abortReason` | `unknown` |
| `isPending` | `boolean` |
| `isError` | `boolean` |
| `isReady` | `boolean` |
| `isLock` | `boolean` |
| `isAbort` | `boolean` |

#### Методы

Все методы соответствуют публичным методам класса `Action`:

| Метод | Сигнатура |
|-------|-----------|
| `is` | `is(...args: ActionStateName[]): boolean` |
| `validate` | `validate(...args: Args): Error[]` |
| `exec` | `exec(...args: Args): Promise&lt;void&gt;` |
| `abort` | `abort(reason?: unknown): Promise&lt;void&gt;` |
| `lock` | `lock(): Promise&lt;void&gt;` |
| `unlock` | `unlock(): this` |
| `resetError` | `resetError(): this` |
| `toString` | `toString(): string` |

См. также: [Action](/ru/api/action) и [ActionError](/ru/api/action-error).

---

## Типы

Вспомогательные типы, используемые в публичном API моделей и действий.

### ActionStateName

```typescript
type ActionStateName = 'pending' | 'error' | 'lock' | 'ready' | 'abort'
```

### Model&lt;T&gt;

Тип, представляющий экземпляр модели, обёрнутый прокси. Предоставляет доступ к действиям как к экземплярам `Action` вместо методов.

### OriginalMethod

Тип, представляющий оригинальный метод до применения декоратора `@action`.

### OriginalMethodWrapper

Тип, представляющий метод после применения декоратора `@action`.
