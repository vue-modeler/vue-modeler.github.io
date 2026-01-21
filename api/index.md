---
title: API
description: Справочник по публичному API основных классов и интерфейсов @vue-modeler/model
outline: deep
---

Этот документ описывает публичный API основных классов и интерфейсов [@vue-modeler/model](https://www.npmjs.com/package/@vue-modeler/model).

## ProtoModel

Абстрактный базовый класс для создания реактивных моделей с управлением действиями.

### Статические методы

| Метод | Описание |
|-------|----------|
| [`createModel`](/api/proto-model#createmodel) | Оборачивает `ProtoModel` в `Model<T>` (proxy) для доступа к `@action` как к `Action` |
| [`model`](/api/proto-model#model) | Фабрика для создания `Model<T>` с сигнатурой конструктора класса |

### Свойства экземпляра (ProtoModel)

| Свойство | Тип | Описание |
|----------|-----|----------|
| [`hasPendingActions`](/api/proto-model#haspendingactions) | `boolean` | Есть ли в модели действия в состоянии `pending` |
| [`hasActionWithError`](/api/proto-model#hasactionwitherror) | `boolean` | Есть ли в модели действия в состоянии `error` |

### Защищённые методы (ProtoModel)

| Метод | Описание |
|-------|----------|
| [`watch`](/api/proto-model#watch) | Регистрирует `watch`/`watchEffect` в локальном `EffectScope` модели |
| [`computed`](/api/proto-model#computed) | Создаёт `computed` в локальном `EffectScope` модели |
| [`action`](/api/proto-model#action) | Возвращает `Action` для метода с `@action` (создаёт при первом обращении) |
| [`setActionState`](/api/proto-model#setactionstate) | Обновляет агрегированное состояние действий модели |
| [`validateArgs`](/api/proto-model#validateargs) | Пользовательская валидация аргументов действий (переопределяется в модели) |

### Публичные методы (ProtoModel)

| Метод | Описание |
|-------|----------|
| [`isModelOf`](/api/proto-model#ismodelof) | Проверка типа модели через `instanceof` |
| [`destructor`](/api/proto-model#destructor) | Останавливает watchers и `EffectScope` модели |

Полное описание смотрите в разделе [ProtoModel](/api/proto-model).

---

## Action

Класс, представляющий действие (декорированный метод) с возможностями управления состоянием.

### Статические свойства (Action)

| Свойство | Тип | Описание |
|----------|-----|----------|
| [`possibleState`](/api/action#actionpossiblestate) | `object` | Все возможные состояния действия |
| [`actionFlag`](/api/action#статические-свойства) | `Symbol` | Флаг, которым декоратор `@action` помечает методы |
| [`abortedByLock`](/api/action#статические-свойства) | `Symbol` | Маркер причины abort при `lock` |

### Статические методы (Action)

| Метод | Описание |
|-------|----------|
| [`create`](/api/action#actioncreate) | Фабрика реактивного (`shallowReactive`) экземпляра `Action` |

### Свойства экземпляра (Action)

| Свойство | Тип | Описание |
|----------|-----|----------|
| [`name`](/api/action#name) | `string` | Имя действия (имя метода) |
| [`owner`](/api/action#owner) | ``Model<T>`` | Владелец действия (модель) |
| [`possibleStates`](/api/action#свойства-экземпляра) | `ActionStateName[]` | Все возможные состояния |
| [`state`](/api/action#state) | `ActionStateName` | Текущее состояние |
| [`abortController`](/api/action#abortcontroller) | `AbortController \| null` | AbortController, если действие `pending` |
| [`args`](/api/action#args) | `Args \| never[]` | Аргументы последнего запуска |
| [`promise`](/api/action#promise) | ``Promise<void> \| null`` | Promise текущего запуска (`pending`) |
| [`error`](/api/action#error) | `ActionError \| null` | Ошибка выполнения (`error`) |
| [`abortReason`](/api/action#abortreason) | `unknown` | Причина abort |
| [`isPending`](/api/action#ispending) | `boolean` | `state === 'pending'` |
| [`isError`](/api/action#iserror) | `boolean` | `state === 'error'` |
| [`isReady`](/api/action#isready) | `boolean` | `state === 'ready'` |
| [`isLock`](/api/action#islock) | `boolean` | `state === 'lock'` |
| [`isAbort`](/api/action#isabort) | `boolean` | `state === 'abort'` |

### Методы экземпляра (Action)

| Метод | Описание |
|-------|----------|
| [`is`](/api/action#is) | Проверяет состояние(я) действия |
| [`validate`](/api/action#validate) | Запускает валидацию аргументов |
| [`exec`](/api/action#exec) | Выполняет действие |
| [`abort`](/api/action#abort) | Прерывает выполнение |
| [`lock`](/api/action#lock) | Блокирует выполнение |
| [`unlock`](/api/action#unlock) | Снимает блокировку |
| [`resetError`](/api/action#reseterror) | Сбрасывает ошибку |
| [`toString`](/api/action#tostring) | Строковое представление |

Полное описание смотрите в разделе [Action](/api/action).

---

## ActionLike

Интерфейс, описывающий публичный контракт для экземпляров `Action` без деталей реализации.

Полное описание смотрите в разделе [Interfaces](/api/interfaces#actionlike).

---

## ActionError

Класс ошибки, представляющий исключение, произошедшее во время выполнения действия. Это исключение, которое должно быть обработано и отображено пользователю в пользовательском интерфейсе.

### Конструктор (ActionError)

| Конструктор | Описание |
|-------------|----------|
| [`new ActionError(...)`](/api/action-error#конструктор) | Ошибка, возникающая при выполнении действия (`Action.error`) |

### Свойства экземпляра (ActionError)

| Свойство | Тип | Описание |
|----------|-----|----------|
| [`cause`](/api/action-error#cause-error-только-чтение) | `Error` | Оригинальная ошибка-причина |

### Методы экземпляра (ActionError)

| Метод | Описание |
|-------|----------|
| [`throwCause`](/api/action-error#throwcause-void) | Выбрасывает оригинальную ошибку-причину |
| [`toString`](/api/action-error#tostring-string) | Возвращает сообщение из ошибки-причины |

Полное описание смотрите в разделе [ActionError](/api/action-error).

---

## Определения типов

Вспомогательные типы, используемые в публичном API моделей и действий.

Полное описание смотрите в разделе [Interfaces](/api/interfaces#определения-типов).

---

## Типы ошибок

Ошибки, связанные с некорректным жизненным циклом и состояниями действий.

| Тип ошибки | Описание |
|------------|----------|
| `ActionStatusConflictError` | Выбрасывается при попытке изменить состояние действия недопустимым способом (например, выполнение заблокированного действия) |
| `ActionUnexpectedAbortError` | Выбрасывается, когда происходит ошибка прерывания, но действие не находится в состоянии pending или lock |
| `ActionInternalError` | Внутренняя ошибка, указывающая на проблему с настройкой или использованием действия (например, декоратор action не применён) |

Полное описание смотрите в разделе [Action](/api/action).

---

## Примечания

**См. также:** [Руководство по действиям](/guides/action) и [Обработка ошибок](/guides/error-handling/).

1. **Управление состоянием действий**: Действия автоматически управляют своим состоянием. Вам не нужно вручную отслеживать флаги типа `isLoading` или подобные.

2. **Обработка ошибок**: Ошибки, выброшенные в действиях, автоматически перехватываются и оборачиваются в `ActionError`. Используйте `action.error` для проверки ошибок после выполнения.

3. **Поддержка прерывания**: Действия поддерживают отмену через `AbortController`. Вы можете передать свой собственный или позволить действию создать его автоматически.

4. **Механизм блокировки**: Используйте `lock()` для предотвращения выполнения действия (например, во время отправки формы). Используйте `unlock()` для повторного включения выполнения.

5. **Реактивные свойства**: Все свойства действий являются реактивными, поэтому их можно использовать в шаблонах Vue и наблюдателях.

6. **Управление памятью**: Всегда вызывайте `model.destructor()`, когда модель больше не нужна, чтобы предотвратить утечки памяти.
