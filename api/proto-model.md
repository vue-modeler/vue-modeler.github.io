---
title: ProtoModel
description: Справочник по методам и свойствам модели
outline: deep
---

## ProtoModel

**Файл:** `src/proto-model.ts`

Абстрактный базовый класс для создания реактивных моделей с управлением действиями.

### Статические методы

#### `ProtoModel.createModel<Target>(protoModel: Target): Model<Target>`

Оборачивает экземпляр ProtoModel прокси для обработки геттеров действий и возврата экземпляров Action вместо оригинальных методов.

**Параметры:**

- `protoModel` - Экземпляр класса, расширяющего ProtoModel

**Возвращает:** Экземпляр модели, обёрнутый прокси

**Выбрасывает:** `TypeError` если аргумент не является экземпляром ProtoModel

**Пример:**

```typescript
class TestModel extends ProtoModel {
  @action async someAction(): Promise<void> {
    return Promise.resolve()
  }
}

const model = ProtoModel.createModel(new TestModel())
const action = model.someAction // Возвращает экземпляр Action
model.someAction.exec() // Выполняет действие
model.someAction.isPending // Возвращает true, если действие в состоянии pending
```

#### `ProtoModel.model<T, Args>(...args: Args): Model<T>`

Статический фабричный метод для создания экземпляра модели. Может быть вызван на классе, расширяющем ProtoModel.

**Параметры:**

- `...args` - Аргументы для конструктора модели

**Возвращает:** Экземпляр модели

**Выбрасывает:** `Error` если вызван напрямую на ProtoModel (абстрактный класс)

**Пример:**

```typescript
class UserModel extends ProtoModel {
  constructor(private api: Api) {
    super()
  }
}

const user = UserModel.model({ fetchUser, patch })
```

### Свойства экземпляра

#### `hasPendingActions: boolean` (только чтение)

Возвращает `true`, если какое-либо действие в модели находится в состоянии pending.

#### `hasActionWithError: boolean` (только чтение)

Возвращает `true`, если какое-либо действие в модели находится в состоянии error.

### Защищённые методы

#### `watch(...args: unknown[]): WatchStopHandle`

Регистрирует наблюдатель в области эффектов модели. Использует функцию `watch` или `watchEffect` из Vue.

**Параметры:**

- `...args` - Аргументы для функции `watch` или `watchEffect` из Vue
  - Если один аргумент: обрабатывается как `watchEffect`
  - Если несколько аргументов: обрабатывается как `watch`

**Возвращает:** Функцию для остановки наблюдателя

**Выбрасывает:** `Error` если аргументы не предоставлены

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

#### `computed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T>`

Создаёт вычисляемое свойство в области эффектов модели.

**Параметры:**

- `getter` - Функция-геттер для вычисляемого свойства
- `debugOptions` - Опциональные опции отладки для computed из Vue

**Возвращает:** Экземпляр ComputedRef

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

#### `action(originalMethod: OriginalMethod | OriginalMethodWrapper): ActionLike<this>`

Получает экземпляр Action по обёрнутому оригинальному методу или создаёт новый экземпляр Action.

**Параметры:**

- `originalMethod` - Оригинальный метод или обёртка метода с декоратором action

**Возвращает:** Экземпляр Action

**Выбрасывает:** `ActionInternalError` если декоратор action не применён

**Использование:**

- **Внешний контекст:** Вызывается неявно при доступе к свойствам действий в модели
- **Внутренний контекст:** Должен вызываться явно как `this.action(this.someAction)`

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

#### `setActionState(action: ActionLike<this>): void`

Обновляет отслеживание состояния действия в модели. Это публичный метод в контексте ProtoModel, но защищённый в контексте Model.

**Параметры:**

- `action` - Экземпляр действия, для которого нужно обновить состояние

**Выбрасывает:** `Error` если действие не найдено

### Публичные методы

#### `isModelOf<T>(typeModel: ModelConstructor<T>): boolean`

Проверяет, является ли экземпляр модели определённого типа.

**Параметры:**

- `typeModel` - Конструктор типа модели для проверки

**Возвращает:** `true` если модель является экземпляром указанного типа

**Пример:**

```typescript
if (model.isModelOf(UserModel)) {
  // model является UserModel
}
```

#### `destructor(): void`

Очищает модель, останавливая все наблюдатели и область эффектов. Должен вызываться, когда модель больше не нужна, чтобы предотвратить утечки памяти.
