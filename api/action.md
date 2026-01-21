---
title: Action
description: Справочник по методам и свойствам действия
outline: deep
---

# Action

Класс, представляющий действие (декорированный метод) с возможностями управления состоянием.

```typescript
class Action<T extends object, Args extends any[] = unknown[]>
```

Дженерики:

- `T extends object` - Тип модели, которая содержит действие
- `Args extends any[]` - Тип аргументов метода действия

## Конструктор

```typescript
constructor(
  protected _model: T,
  protected actionFunction: OriginalMethodWrapper<Args>,
  protected ownerGetter: () => Model<T>,
  protected setStateCb: (
    action: ActionLike<T, Args>,
    oldState: ActionStateName,
    newState: ActionStateName,
  ) => void,
  protected _validateArgs: (
    action: ActionLike<T, Args>,
    ...args: Args
  ) => Error[],
)
```

Создаёт новый экземпляр Action. Экземпляр не реактивен. Конструктор не вызывается напрямую. Для создания реактивных экземпляров используется статический метод [`Action.create()`](#actioncreate).

**Параметры:**

- `_model` - `T` - Экземпляр модели, содержащий метод действия
- `actionFunction` - `OriginalMethodWrapper<Args>` - оригинальный метод с флагом `Action.actionFlag`. Флаг устанавливается декоратором `@action`
- `ownerGetter` - `() => Model<T>` - Функция, возвращающая экземпляр Model, которому принадлежит действие
- `setStateCb` - `(action, oldState, newState) => void` - Callback для обновления состояния действия в модели при изменении состояния
- `_validateArgs` - `(action, ...args) => Error[]` - Функция для валидации аргументов действия

**Выбрасывает:**

- `ActionInternalError` - Если модель не содержит метод с именем из `actionFunction.name`
- `ActionInternalError` - Если метод не является действием (не имеет флага `Action.actionFlag`)

**Поведение:**

1. Извлекает имя метода из `actionFunction.name`
2. Проверяет, что модель содержит метод с таким именем
3. Проверяет, что метод является действием (имеет флаг `Action.actionFlag`)
4. Сохраняет имя в свойство `name`

## Статические свойства

### `Action.possibleState`

```typescript
static readonly possibleState: {
  readonly pending: 'pending'
  readonly error: 'error'
  readonly lock: 'lock'
  readonly ready: 'ready'
  readonly abort: 'abort'
}
```

Объект, содержащий все возможные состояния действия.

**Тип:**

`Readonly<Record<ActionStateName, ActionStateName>>`

## Статические методы

### `Action.create`

```typescript
static create<T extends ProtoModel, Args extends unknown[] = unknown[]>(
  model: T,
  actionFunction: OriginalMethodWrapper<Args>,
  ownerGetter: () => Model<T>,
  setStateCb: (
    action: ActionLike<T, Args>,
    oldState: ActionStateName,
    newState: ActionStateName,
  ) => void,
  validateArgs: (
    action: ActionLike<T, Args>,
    ...args: Args
  ) => Error[],
): ActionLike<T, Args>
```

Фабричный метод для создания нового реактивного экземпляра Action. Внутренне вызывает `constructor` и оборачивает результат в `shallowReactive()` для реактивности.

**Параметры:**

Параметры **полностью совпадают** с параметрами конструктора. См. [Конструктор](#конструктор).

**Возвращает:**

`ActionLike<T, Args>` - Реактивный (shallowReactive) экземпляр Action

**Выбрасывает:**

- `ActionInternalError` - Если модель не содержит метод с именем из `actionFunction` или метод не является действием

## Свойства экземпляра

### `name`

```typescript
readonly name: string
```

Имя действия (имя метода).

### `owner`

```typescript
readonly owner: Model<T>
```

Экземпляр модели, которому принадлежит это действие. Внутри вызывает функцию `ownerGetter`, которая передана в [конструкторе](#конструктор)

### `state`

```typescript
readonly state: ActionStateName
```

Текущее состояние действия.

**Возможные значения:**

`'pending' | 'error' | 'lock' | 'ready' | 'abort'`

### `abortController`

```typescript
readonly abortController: AbortController | null
```

Экземпляр AbortController для управления прерыванием выполнения действия.

**Значение:**

- `AbortController` - если действие находится в состоянии `pending`
- `null` - во всех остальных состояниях

### `args`

```typescript
readonly args: Args | never[]
```

Аргументы, переданные при последнем выполнении действия.

**Значение:**

- `Args` - если действие было выполнено хотя бы раз
- `never[]` (пустой массив) - если действие ещё не выполнялось

### `promise`

```typescript
readonly promise: Promise<void> | null
```

Промис текущего выполнения действия.

**Значение:**

- `Promise<void>` - если действие находится в состоянии `pending`
- `null` - во всех остальных состояниях

### `error`

```typescript
readonly error: ActionError | null
```

Экземпляр [`ActionError`](/api/action-error), содержащий информацию об ошибке выполнения.

**Значение:**

- [`ActionError`](/api/action-error) - если действие находится в состоянии `error`
- `null` - во всех остальных состояниях

### `abortReason`

```typescript
readonly abortReason: unknown
```

Причина прерывания действия.

**Значение:**

- Причина прерывания - если действие находится в состоянии `abort`
- `null` - во всех остальных состояниях

### `isPending`

```typescript
readonly isPending: boolean
```

Проверяет, находится ли действие в состоянии `pending`.
Эквивалентно: `state === 'pending'`.

### `isError`

```typescript
readonly isError: boolean
```

Проверяет, находится ли действие в состоянии `error`.
Эквивалентно: `state === 'error'`.

### `isReady`

```typescript
readonly isReady: boolean
```

Проверяет, находится ли действие в состоянии `ready`.
Эквивалентно: `state === 'ready'`.

### `isLock`

```typescript
readonly isLock: boolean
```

Проверяет, находится ли действие в состоянии `lock`.
Эквивалентно: `state === 'lock'`.

### `isAbort`

```typescript
readonly isAbort: boolean
```

Проверяет, находится ли действие в состоянии `abort`.
Эквивалентно: `state === 'abort'`.

## Методы экземпляра

### `is`

```typescript
is(...args: ActionStateName[]): boolean
```

Проверяет, находится ли действие в любом из указанных состояний.

**Параметры:**

- `...args` - `ActionStateName[]` - Имена состояний для проверки

**Возвращает:**

`boolean` - `true` если действие находится в любом из указанных состояний, иначе `false`

**Пример:**

```typescript
if (action.is('pending', 'lock')) {
  // Действие либо pending, либо заблокировано
}
```

### `validate`

```typescript
validate(...args: Args): Error[]
```

Валидирует аргументы действия. Внутри вызывает функцию `_validateArgs` преданную как аргумент [конструктора](#конструктор). Это самостоятельный метод, не используется в `exec`.

Удобно использовать для проверки пользовательского ввода, что бы получить ошибки без выполнения `exec`.

**Параметры:**

- `...args` - `Args` - Аргументы для валидации

**Возвращает:**

`Error[]` - Массив ошибок валидации. Пустой массив, если все аргументы валидны.

**Пример:**

```typescript
const errors = action.validate('arg1', 'arg2')
if (errors.length > 0) {
  // Обработать ошибки валидации
}
```

### `exec`

```typescript
exec(...args: Args): Promise<void>
```

Выполняет действие и переводит его в состояние `pending`. Если метод действия возвращает Promise, ожидает его завершения и обновляет состояние соответственно.

**Параметры:**

- `...args` - `Args` - Аргументы для передачи в метод действия
  - Если последний аргумент является `AbortController`, он будет использован для управления прерыванием
  - Иначе будет создан новый `AbortController` и добавлен в конец аргументов

**Возвращает:**

`Promise<void>` - Промис, который разрешается при успешном завершении действия или отклоняется при ошибке/прерывании.

**Выбрасывает:**

- `ActionStatusConflictError` - Если действие уже находится в состоянии `lock` или `pending`
- `ActionInternalError` - При внутренних ошибках (не перехватывается)
- `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, `URIError`, `EvalError` - Перебрасываются как есть (не перехватываются)
- `ActionUnexpectedAbortError` - Если действие было прервано, но не находилось в состоянии `pending` или `lock`

**Поведение:**

1. Проверяет, что действие не находится в состоянии `lock` или `pending`
2. Устанавливает состояние действия в `pending` перед выполнением (для предотвращения рекурсивных вызовов)
3. Сохраняет аргументы в `_args`
4. Вызывает оригинальный метод с аргументами (добавляя `AbortController` при необходимости)
5. Если метод возвращает не-Promise:
   - Немедленно устанавливает состояние в `ready`
   - Возвращает разрешённый промис
6. Если метод возвращает Promise:
   - При успехе: устанавливает состояние в `ready`
   - При ошибке: оборачивает ошибку в [`ActionError`](/api/action-error) и устанавливает состояние в `error`
   - При прерывании: устанавливает состояние в `abort` или `lock` (если прервано блокировкой)

**Важно:** Ошибки выполнения оборачиваются в [`ActionError`](/api/action-error) и сохраняются в состоянии `error`. Внешний `try/catch` не перехватит эти ошибки. Для обработки ошибок используйте проверку `action.error` после ожидания промиса или watcher по состоянию действия.

**Пример:**

```typescript
await action.exec('arg1', 'arg2')
if (action.error?.cause) {
  handleError(action.error.cause)
  return
}

// или с watcher:
watch(
  () => model.someAction.error,
  (error) => {
    if (!error) return
    handleError(error.cause)
  }
)
```

### `abort`

```typescript
abort(reason?: unknown): Promise<void>
```

Прерывает текущее выполнение действия, если оно находится в состоянии `pending`. Если действие не находится в состоянии `pending`, возвращает разрешённый промис без выполнения каких-либо действий.

**Параметры:**

- `reason` - `unknown` (опционально) - Причина прерывания. Будет доступна через `abortReason`.

**Возвращает:**

`Promise<void>` - Тот же промис, что был возвращён методом `exec()`. Промис будет отклонён с причиной прерывания.

**Пример:**

```typescript
const promise = action.exec()
action.abort('Пользователь отменил')
await promise.catch(() => {
  // Обработать прерывание
  console.log(action.abortReason) // 'Пользователь отменил'
})
```

### `lock`

```typescript
lock(): Promise<void>
```

Блокирует действие, предотвращая дальнейшее выполнение. Если действие находится в состоянии `pending`, оно будет прервано с причиной `Action.abortedByLock`.

**Возвращает:**

`Promise<void>` - Промис, который разрешается при применении блокировки.

**Поведение:**

- Если действие в состоянии `pending`: прерывает выполнение с причиной `Action.abortedByLock`, затем устанавливает состояние в `lock`
- Если действие не в состоянии `pending`: немедленно устанавливает состояние в `lock`

**Пример:**

```typescript
await action.lock()
// Действие теперь заблокировано и не может быть выполнено
// Попытка вызвать exec() выбросит ActionStatusConflictError
```

### `unlock`

```typescript
unlock(): this
```

Разблокирует действие и устанавливает его в состояние `ready`.

**Возвращает:**

`this` - Экземпляр действия (для цепочки вызовов).

**Выбрасывает:**

- `ActionStatusConflictError` - Если действие не находится в состоянии `lock`

**Пример:**

```typescript
action.unlock()
// Действие теперь готово и может быть выполнено
```

### `resetError`

```typescript
resetError(): this
```

Сбрасывает состояние ошибки и устанавливает действие в состояние `ready`.

**Возвращает:**

`this` - Экземпляр действия (для цепочки вызовов).

**Выбрасывает:**

- `ActionStatusConflictError` - Если действие не находится в состоянии `error` (т.е. нет ошибки для сброса)

**Пример:**

```typescript
if (action.error) {
  action.resetError()
  // Действие теперь готово и может быть выполнено снова
}
```

### `toString`

```typescript
toString(): string
```

Возвращает имя действия в виде строки.

**Возвращает:**

`string` - Имя действия (имя метода).

**Пример:**

```typescript
console.log(action.toString()) // 'someAction'
console.log(String(action)) // 'someAction'
```

## Интерфейсы

Интерфейс `ActionLike` (публичный контракт `Action`) вынесен в отдельный справочник: [Interfaces](/api/interfaces#actionlike).
