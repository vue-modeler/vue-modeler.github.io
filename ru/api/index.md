---
title: API
description: Справочник по публичному API основных классов и интерфейсов @vue-modeler/model
outline: deep
---

Этот документ описывает публичный API основных классов и интерфейсов [@vue-modeler/model](https://www.npmjs.com/package/@vue-modeler/model).

## [ProtoModel](/ru/api/proto-model)

Абстрактный базовый класс для создания реактивных моделей с управлением действиями.

### Статические методы

| Метод | Описание |
|-------|----------|
| [`createModel`](/ru/api/proto-model#createmodel) | Оборачивает `ProtoModel` в `Model<T>` (proxy) для доступа к `@action` как к `Action` |
| [`model`](/ru/api/proto-model#model) | Фабрика для создания `Model<T>` с сигнатурой конструктора класса |

### Свойства экземпляра (ProtoModel)

| Свойство | Тип | Описание |
|----------|-----|----------|
| [`hasPendingActions`](/ru/api/proto-model#haspendingactions) | `boolean` | Есть ли в модели действия в состоянии `pending` |
| [`hasActionWithError`](/ru/api/proto-model#hasactionwitherror) | `boolean` | Есть ли в модели действия в состоянии `error` |

### Защищённые методы (ProtoModel)

| Метод | Описание |
|-------|----------|
| [`watch`](/ru/api/proto-model#watch) | Регистрирует `watch`/`watchEffect` в локальном `EffectScope` модели |
| [`computed`](/ru/api/proto-model#computed) | Создаёт `computed` в локальном `EffectScope` модели |
| [`action`](/ru/api/proto-model#action) | Возвращает `Action` для метода с `@action` (создаёт при первом обращении) |
| [`setActionState`](/ru/api/proto-model#setactionstate) | Обновляет агрегированное состояние действий модели |
| [`validateArgs`](/ru/api/proto-model#validateargs) | Пользовательская валидация аргументов действий (переопределяется в модели) |

### Публичные методы (ProtoModel)

| Метод | Описание |
|-------|----------|
| [`isModelOf`](/ru/api/proto-model#ismodelof) | Проверка типа модели через `instanceof` |
| [`destructor`](/ru/api/proto-model#destructor) | Останавливает watchers и `EffectScope` модели |


## [Action](/ru/api/action)

Класс, представляющий действие (декорированный метод) с возможностями управления состоянием.

### Статические свойства (Action)

| Свойство | Тип | Описание |
|----------|-----|----------|
| [`possibleState`](/ru/api/action#actionpossiblestate) | `object` | Все возможные состояния действия |
| [`actionFlag`](/ru/api/action#статические-свойства) | `Symbol` | Флаг, которым декоратор `@action` помечает методы |
| [`abortedByLock`](/ru/api/action#статические-свойства) | `Symbol` | Маркер причины abort при `lock` |

### Статические методы (Action)

| Метод | Описание |
|-------|----------|
| [`create`](/ru/api/action#actioncreate) | Фабрика реактивного (`shallowReactive`) экземпляра `Action` |

### Свойства экземпляра (Action)

| Свойство | Тип | Описание |
|----------|-----|----------|
| [`name`](/ru/api/action#name) | `string` | Имя действия (имя метода) |
| [`owner`](/ru/api/action#owner) | ``Model<T>`` | Владелец действия (модель) |
| [`possibleStates`](/ru/api/action#свойства-экземпляра) | `ActionStateName[]` | Все возможные состояния |
| [`state`](/ru/api/action#state) | `ActionStateName` | Текущее состояние |
| [`abortController`](/ru/api/action#abortcontroller) | `AbortController \| null` | AbortController, если действие `pending` |
| [`args`](/ru/api/action#args) | `Args \| never[]` | Аргументы последнего запуска |
| [`promise`](/ru/api/action#promise) | ``Promise<void> \| null`` | Promise текущего запуска (`pending`) |
| [`error`](/ru/api/action#error) | `ActionError \| null` | Ошибка выполнения (`error`) |
| [`abortReason`](/ru/api/action#abortreason) | `unknown` | Причина abort |
| [`isPending`](/ru/api/action#ispending) | `boolean` | `state === 'pending'` |
| [`isError`](/ru/api/action#iserror) | `boolean` | `state === 'error'` |
| [`isReady`](/ru/api/action#isready) | `boolean` | `state === 'ready'` |
| [`isLock`](/ru/api/action#islock) | `boolean` | `state === 'lock'` |
| [`isAbort`](/ru/api/action#isabort) | `boolean` | `state === 'abort'` |

### Методы экземпляра (Action)

| Метод | Описание |
|-------|----------|
| [`is`](/ru/api/action#is) | Проверяет состояние(я) действия |
| [`validate`](/ru/api/action#validate) | Запускает валидацию аргументов |
| [`exec`](/ru/api/action#exec) | Выполняет действие |
| [`abort`](/ru/api/action#abort) | Прерывает выполнение |
| [`lock`](/ru/api/action#lock) | Блокирует выполнение |
| [`unlock`](/ru/api/action#unlock) | Снимает блокировку |
| [`resetError`](/ru/api/action#reseterror) | Сбрасывает ошибку |
| [`toString`](/ru/api/action#tostring) | Строковое представление |

## [ActionLike](/ru/api/interfaces#actionlike)

Интерфейс, описывающий публичный контракт для экземпляров `Action` без деталей реализации.

## [ActionError](/ru/api/action-error)

Класс ошибки, представляющий исключение, произошедшее во время выполнения действия. Это исключение, которое должно быть обработано и отображено пользователю в пользовательском интерфейсе.

### Конструктор (ActionError)

| Конструктор | Описание |
|-------------|----------|
| [`new ActionError(...)`](/ru/api/action-error#конструктор) | Ошибка, возникающая при выполнении действия (`Action.error`) |

### Свойства экземпляра (ActionError)

| Свойство | Тип | Описание |
|----------|-----|----------|
| [`cause`](/ru/api/action-error#cause-error-только-чтение) | `Error` | Оригинальная ошибка-причина |

### Методы экземпляра (ActionError)

| Метод | Описание |
|-------|----------|
| [`throwCause`](/ru/api/action-error#throwcause-void) | Выбрасывает оригинальную ошибку-причину |
| [`toString`](/ru/api/action-error#tostring-string) | Возвращает сообщение из ошибки-причины |

## [Типы](/ru/api/interfaces#типы)

Вспомогательные типы, используемые в публичном API моделей и действий.

## [Внутренние ошибки](/ru/api/action-internal-errors)

Классы ошибок, связанные с некорректным жизненным циклом и состояниями действий.
