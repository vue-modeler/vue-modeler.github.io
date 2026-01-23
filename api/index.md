---
title: API
description: Справочник по публичному API основных классов и интерфейсов @vue-modeler/model
outline: deep
---

Этот документ описывает публичный API основных классов и интерфейсов [@vue-modeler/model](https://www.npmjs.com/package/@vue-modeler/model).

## [ProtoModel](/api/proto-model)

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


## [Action](/api/action)

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

## [ActionLike](/api/interfaces#actionlike)

Интерфейс, описывающий публичный контракт для экземпляров `Action` без деталей реализации.

## [ActionError](/api/action-error)

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

## [Типы](/api/interfaces#типы)

Вспомогательные типы, используемые в публичном API моделей и действий.

## [Внутренние ошибки](/api/action-internal-errors)

Классы ошибок, связанные с некорректным жизненным циклом и состояниями действий.
