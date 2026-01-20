---
title: API
description: Справочник по публичному API основных классов и интерфейсов @vue-modeler/model
outline: deep
---

Этот документ описывает публичный API основных классов и интерфейсов [@vue-modeler/model](https://www.npmjs.com/package/@vue-modeler/model).

## Содержание

- [ProtoModel](/api/proto-model)
- [Action](/api/action)
- [ActionLike](#actionlike)
- [ActionError](/api/action-error)

---

## ProtoModel

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0;">

<div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1rem; background: var(--vp-c-bg-soft);">

### Статические методы

- [`createModel`](/api/proto-model#статические-методы)
- [`model`](/api/proto-model#статические-методы)

</div>

<div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1rem; background: var(--vp-c-bg-soft);">

### Свойства экземпляра

- [`hasPendingActions`](/api/proto-model#свойства-экземпляра)
- [`hasActionWithError`](/api/proto-model#свойства-экземпляра)

</div>

<div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1rem; background: var(--vp-c-bg-soft);">

### Защищённые методы

- [`watch`](/api/proto-model#защищённые-методы)
- [`computed`](/api/proto-model#защищённые-методы)
- [`action`](/api/proto-model#защищённые-методы)
- [`setActionState`](/api/proto-model#защищённые-методы)

</div>

<div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1rem; background: var(--vp-c-bg-soft);">

### Публичные методы

- [`destructor`](/api/proto-model#публичные-методы)

</div>

</div>

Полное описание смотрите в разделе [ProtoModel](/api/proto-model).

---

## Action

**Файл:** `src/action.ts`

Класс, представляющий действие (декорированный метод) с возможностями управления состоянием.

### Статические свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `possibleState` | `object` | Объект, содержащий все возможные состояния действия |
| `actionFlag` | `Symbol` | Символ, используемый для пометки методов как действий |
| `abortedByLock` | `Symbol` | Символ, используемый как причина прерывания при блокировке действия |

### Статические методы

| Метод | Сигнатура |
|-------|-----------|
| `create` | ``Action.create<T, Args>(model, actionFunction, ownerGetter, setStateCb, validateArgs): ActionLike<T, Args>`` |

### Свойства экземпляра

| Свойство | Тип | Описание |
|----------|-----|----------|
| `name` | `string` | Имя действия (имя метода) |
| `owner` | ``Model<T>`` | Экземпляр модели, которому принадлежит это действие |
| `possibleStates` | `ActionStateName[]` | Массив всех возможных имён состояний для действий |
| `state` | `ActionStateName` | Текущее состояние действия |
| `abortController` | `AbortController \| null` | Экземпляр AbortController, если действие находится в состоянии pending |
| `args` | `Args \| never[]` | Аргументы, переданные при последнем выполнении действия |
| `promise` | ``Promise<void> \| null`` | Промис текущего выполнения, если действие находится в состоянии pending |
| `error` | `ActionError \| null` | Экземпляр ActionError, если действие находится в состоянии error |
| `abortReason` | `unknown` | Причина прерывания, если действие прервано |
| `isPending` | `boolean` | Возвращает `true`, если действие находится в состоянии pending |
| `isError` | `boolean` | Возвращает `true`, если действие находится в состоянии error |
| `isReady` | `boolean` | Возвращает `true`, если действие находится в состоянии ready |
| `isLock` | `boolean` | Возвращает `true`, если действие находится в состоянии lock |
| `isAbort` | `boolean` | Возвращает `true`, если действие находится в состоянии abort |

### Методы экземпляра

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

Полное описание смотрите в разделе [Action](/api/action).

---

## ActionLike

**Файл:** `src/action.ts`

Интерфейс, описывающий публичный контракт для экземпляров Action без деталей реализации.

### Свойства

Все свойства доступны только для чтения и соответствуют свойствам класса Action:

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

### Методы

Все методы соответствуют публичным методам класса Action:

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

---

## ActionError

**Файл:** `src/error/action-error.ts`

Класс ошибки, представляющий исключение, произошедшее во время выполнения действия. Это исключение, которое должно быть обработано и отображено пользователю в пользовательском интерфейсе.

### Конструктор

| Конструктор | Сигнатура |
|-------------|-----------|
| `new ActionError` | `new ActionError(actionName: string, options: { cause: Error })` |

### Свойства экземпляра

| Свойство | Тип | Описание |
|----------|-----|----------|
| `cause` | `Error` | Оригинальная ошибка, вызвавшая этот ActionError |

### Методы экземпляра

| Метод | Сигнатура |
|-------|-----------|
| `throwCause` | `throwCause(): void` |
| `toString` | `toString(): string` |

Полное описание смотрите в разделе [ActionError](/api/action-error).

---

## Определения типов

### ActionStateName

```typescript
type ActionStateName = 'pending' | 'error' | 'lock' | 'ready' | 'abort'
```

### Model&lt;T&gt;

Тип, представляющий экземпляр модели, обёрнутый прокси. Предоставляет доступ к действиям как к экземплярам Action вместо методов.

### OriginalMethod

Тип, представляющий оригинальный метод до применения декоратора action.

### OriginalMethodWrapper

Тип, представляющий метод после применения декоратора action.

---

## Типы ошибок

| Тип ошибки | Описание |
|------------|----------|
| `ActionStatusConflictError` | Выбрасывается при попытке изменить состояние действия недопустимым способом (например, выполнение заблокированного действия) |
| `ActionUnexpectedAbortError` | Выбрасывается, когда происходит ошибка прерывания, но действие не находится в состоянии pending или lock |
| `ActionInternalError` | Внутренняя ошибка, указывающая на проблему с настройкой или использованием действия (например, декоратор action не применён) |

---

## Примечания

1. **Управление состоянием действий**: Действия автоматически управляют своим состоянием. Вам не нужно вручную отслеживать флаги типа `isLoading` или подобные.

2. **Обработка ошибок**: Ошибки, выброшенные в действиях, автоматически перехватываются и оборачиваются в `ActionError`. Используйте `action.error` для проверки ошибок после выполнения.

3. **Поддержка прерывания**: Действия поддерживают отмену через `AbortController`. Вы можете передать свой собственный или позволить действию создать его автоматически.

4. **Механизм блокировки**: Используйте `lock()` для предотвращения выполнения действия (например, во время отправки формы). Используйте `unlock()` для повторного включения выполнения.

5. **Реактивные свойства**: Все свойства действий являются реактивными, поэтому их можно использовать в шаблонах Vue и наблюдателях.

6. **Управление памятью**: Всегда вызывайте `model.destructor()`, когда модель больше не нужна, чтобы предотвратить утечки памяти.
