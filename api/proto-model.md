---
title: ProtoModel
description: Справочник по методам и свойствам модели
outline: deep
---

Абстрактный базовый класс для создания реактивных моделей с управлением действиями.

```typescript
abstract class ProtoModel
```

## Статические методы

### `createModel`

```typescript
ProtoModel.createModel<Target>(protoModel: Target): Model<Target>
```

Оборачивает экземпляр ProtoModel в прокси для обработки геттеров действий и возврата экземпляров `Action` вместо оригинальных методов.

**Параметры:**

- `protoModel` `Target` - Экземпляр класса, расширяющего ProtoModel

**Возвращает:**

`Model<Target>` Экземпляр модели, обёрнутый прокси

**Выбрасывает:**

`TypeError` если аргумент не является экземпляром ProtoModel

**Пример:**

```typescript
class TestModel extends ProtoModel {
  protected _value = ''

  static customConstructor(value: string): Model<TestModel> {
    const protoModel = new TestModel()
    protoModel._value = value 

    return ProtoModel.createModel(protoModel)
  }
}

const model = TestModel.customConstructor('init value')
```

### `model`

```typescript
ProtoModel.model<T, Args>(...args: Args): Model<T>
```

Статический фабричный метод для создания экземпляра модели. Может быть вызван на классе, расширяющем ProtoModel. Копирует сигнатуру конструктора класса.

**Параметры:**

- `...args` `Args` - Аргументы для конструктора модели, совпадают с аргументами конструктора класса.

**Возвращает:**

`Model<T>` Экземпляр модели

**Выбрасывает:**

`Error` если вызван напрямую на ProtoModel (абстрактный класс)

**Пример:**

```typescript
interface Api {
  fetchUser: () => Promise<void>
  patch: () => Promise<void>
}

class UserModel extends ProtoModel {
  constructor(private api: Api) {
    super()
  }
}

const user = UserModel.model({ fetchUser, patch })
```

## Свойства экземпляра

### `hasPendingActions`

```typescript
readonly hasPendingActions: boolean
```

Возвращает `true`, если какое-либо действие в модели находится в состоянии pending.

### `hasActionWithError`

```typescript
readonly hasActionWithError: boolean
```

Возвращает `true`, если какое-либо действие в модели находится в состоянии error.

## Защищённые методы

### `watch`

```typescript
watch(...args: unknown[]): WatchStopHandle
```

Регистрирует наблюдатель в области эффектов модели. Использует `watch` или `watchEffect` из Vue.

**Параметры:**

- `...args` `unknown[]` - Аргументы для `watch` / `watchEffect` из Vue
  - Если один аргумент: обрабатывается как `watchEffect`
  - Если несколько аргументов: обрабатывается как `watch`

**Возвращает:**

`WatchStopHandle` Функцию для остановки наблюдателя

**Выбрасывает:**

`Error` если аргументы не предоставлены

**Ограничения:**

- Не может использоваться с нереактивными свойствами
- `this` во внутреннем контексте не является shallow reactive
- Используйте `ref` или `computed` для реактивных свойств

**Пример:**

```typescript
class TestModel extends ProtoModel {
  protected _count = ref(0)
  
  constructor() {
    super()
    
    this.watch(
      () => this._count.value,
      (value) => console.log(value)
    )
  }
}
```

### `computed`

```typescript
computed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T>
```

Создаёт вычисляемое свойство в области эффектов модели.

**Параметры:**

- `getter` `ComputedGetter<T>` - Функция-геттер для вычисляемого свойства
- `debugOptions` `DebuggerOptions` (опционально) - Опциональные опции отладки для computed из Vue

**Возвращает:**

`ComputedRef<T>` Экземпляр ComputedRef

**Пример:**

```typescript
class TestModel extends ProtoModel {
  protected _firstName = ref('John')
  protected _lastName = ref('Doe')
  
  get fullName() {
    return this.computed(() =>
      `${this._firstName.value} ${this._lastName.value}`
    )
  }
}
```

### `action`

```typescript
action(originalMethod: OriginalMethod | OriginalMethodWrapper): ActionLike<this>
```

Получает экземпляр Action по обёрнутому оригинальному методу или создаёт новый экземпляр Action.

**Параметры:**

- `originalMethod` `OriginalMethod | OriginalMethodWrapper` - Оригинальный метод или обёртка метода с декоратором action

**Возвращает:**

`ActionLike<this>` Экземпляр Action

**Выбрасывает:**

`ActionInternalError` если декоратор action не применён

**Использование:**

- Внешний контекст: вызывается неявно при доступе к свойствам действий в модели
- Внутренний контекст: должен вызываться явно как `this.action(this.someAction)`

**Пример:**

```typescript
class TestModel extends ProtoModel {
  @action async testAction(): Promise<void> {
    return Promise.resolve()
  }
  
  async otherAction(): Promise<void> {
    // Во внутреннем контексте используйте this.action()
    if (this.action(this.testAction).isPending) {
      console.log('testAction is pending')
    }
  }
}

// Внешний контекст
const model = TestModel.model()
model.testAction.exec() // Действие доступно напрямую
```

### `setActionState`

```typescript
setActionState(action: ActionLike<this>): void
```

Обновляет отслеживание состояния действия в модели. Это публичный метод в контексте ProtoModel, но защищённый в контексте Model.

**Параметры:**

- `action` `ActionLike<this>` - Экземпляр действия, для которого нужно обновить состояние

**Выбрасывает:**

`Error` если действие не найдено

### `validateArgs`

```typescript
protected validateArgs(action: ActionLike<this>, ...args: unknown[]): Error[]
```

Валидирует аргументы действия перед его выполнением. Может быть переопределён в дочерних классах для добавления пользовательской валидации.

Передается в конструктор действия. Разработчик вызывает валидацию через действие. Этим проверяется валидность аргументов действия в контексте общего состояния модели.  

Подробнее в разделе [Валидация аргументов](/advanced/args-validation.md)

**Параметры:**

- `action` `ActionLike<this>` - Экземпляр ддействия, для которого выполняется валидация
- `...args` `unknown[]` - Аргументы, переданные действию

**Возвращает:**

`Error[]` Массив ошибок валидации. Пустой массив означает, что валидация прошла успешно.

**По умолчанию:**

Возвращает массив с одной ошибкой, указывающей, что метод не реализован.

**Пример:**

```typescript
class CounterModel extends ProtoModel {
  @action async increment(value: number): Promise<void> {
    // ...
  }

  protected validateArgs(action: ActionLike<this>, ...args: unknown[]): Error[] {
    const errors: Error[] = []
    
    if (action === this.action(this.increment)) {
      const value = args[0] as number
      
      if (typeof value !== 'number') {
        errors.push(new Error('Value must be a number'))
      } else if (value < 0) {
        errors.push(new Error('Value must be positive'))
      } else if (value > 100) {
        errors.push(new Error('Value must not exceed 100'))
      }
    }
    
    return errors
  }
}
```

## Публичные методы

### `isModelOf`

```typescript
isModelOf<T extends ProtoModel>(typeModel: ModelConstructor<T>): boolean
```

Проверяет, является ли текущая модель экземпляром указанного типа модели.

**Параметры:**

- `typeModel` `ModelConstructor<T>` - Конструктор класса модели для проверки

**Возвращает:**

`boolean` `true`, если модель является экземпляром указанного типа, иначе `false`

**Пример:**

```typescript
class UserModel extends ProtoModel {
  // ...
}

class ProductModel extends ProtoModel {
  // ...
}

const user = UserModel.model()

console.log(user.isModelOf(UserModel))    // true
console.log(user.isModelOf(ProductModel))  // false
console.log(user instanceof UserModel)    // true (альтернативный способ)
```

### `destructor`

```typescript
destructor(): void
```

Очищает модель, останавливая все наблюдатели и область эффектов. Должен вызываться, когда модель больше не нужна, чтобы предотвратить утечки памяти.
