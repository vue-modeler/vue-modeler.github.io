---
title: API модели
description: Справочник по методам и свойствам модели
---

## Статические методы

### `model<T>(...args: Args): Model<T>`

Универсальный конструктор модели. Создает экземпляр класса и преобразует его в реактивную модель.

```typescript
class Counter extends ProtoModel {
  constructor(private startValue: number) {
    super()
  }
}

// Создаем модель
// ✅ TypeScript проверит типы аргументов
const counter = Counter.model(10)
```

Метод копирует сигнатуру конструктора класса, поэтому проверка типов в TypeScript работает автоматически.

## Свойства

### `hasPendingActions: boolean`

Показывает, есть ли хотя бы одно действие в состоянии `pending` (выполняется).

```typescript
if (model.hasPendingActions) {
  console.log('Есть выполняющиеся действия')
}
```

### `hasActionWithError: boolean`

Показывает, есть ли хотя бы одно действие с ошибкой.

```typescript
if (model.hasActionWithError) {
  console.log('Есть действия с ошибками')
}
```

## Методы

### `watch(...args): WatchStopHandle`

**Защищенный метод.** Доступен только внутри класса модели.

Создает наблюдатель, привязанный к effect scope модели. Это обертка вокруг `watch` и `watchEffect` из Vue Composition API.

**Сигнатура:**
- `watch(effect: () => void )` — наблюдает за эффектом  
- `watch(getter: () => unknown , callback: () => void, options?)` — наблюдает за источником

```typescript
class Counter extends ProtoModel {
  protected _count = ref(0)
  
  constructor() {
    super()
    
    // Наблюдаем за реактивным свойством
    this.watch(
      () => this._count.value,
      (newValue) => {
        console.log('Count changed:', newValue)
      }
    )
    
    // Или используем watchEffect
    this.watch(() => {
      console.log('Count is:', this._count.value)
    })
  }
}
```

**Важно:** Наблюдатель автоматически удаляется при вызове `destructor()`. Если нужно удалить наблюдатель раньше, вызовите возвращенный `stop handler`:

```typescript
const stopWatcher = this.watch(() => {
  // ...
})

// Удаляем наблюдатель вручную
stopWatcher()
```

::: warning
Не используйте напрямую `watch` или `watchEffect` из Vue Composition API внутри модели. Это приведет к утечкам памяти. Всегда используйте `this.watch()`.
:::

### `computed<T>(getter: ComputedGetter<T>, debugOptions?): ComputedRef<T>`

**Защищенный метод.** Доступен только внутри класса модели.

Создает вычисляемое свойство, привязанное к effect scope модели. Это обертка вокруг `computed` из Vue Composition API.

```typescript
class Counter extends ProtoModel {
  protected _count = ref(0)
  protected _multiplier = ref(2)
  
  constructor() {
    super()
  }
  
  // Вычисляемое свойство
  get doubledCount(): number {
    return this.computed(() => {
      return this._count.value * this._multiplier.value
    }).value
  }
}
```

**Важно:** Вычисляемое свойство автоматически очищается при вызове `destructor()`.

### `action(originalMethod): ActionPublic`

**Защищенный метод.** Доступен только внутри класса модели.

Получает объект действия по исходному методу. Используется внутри класса модели для доступа к свойствам и методам действия.

```typescript
class Counter extends ProtoModel {
  @action async increment(): Promise<void> {
    // ...
  }
  
  async checkStatus(): Promise<void> {
    // ✅ Правильно: получаем действие как объект
    const incrementAction = this.action(this.increment)
    
    if (incrementAction.isPending) {
      console.log('Increment is running')
    }
    
    // Выполняем действие
    await incrementAction.exec()
  }
}
```

**Важно:** Во внешнем контексте модель уже предоставляет действие как объект, поэтому этот метод не нужен:

```typescript
const counter = Counter.model()
// ✅ Действие уже объект
await counter.increment.exec()
```

### `isModelOf(typeModel): boolean`

Проверяет, является ли модель экземпляром указанного класса.

```typescript
class User extends ProtoModel { }
class Admin extends User { }

const user = User.model()
const admin = Admin.model()

user.isModelOf(User)   // ✅ true
user.isModelOf(Admin)  // ❌ false
admin.isModelOf(User)  // ✅ true (наследование)
admin.isModelOf(Admin) // ✅ true
```

### `destructor(): void`

Уничтожает модель: останавливает все наблюдатели, вычисляемые свойства и effect scope.

```typescript
const model = Counter.model()

// Когда модель больше не нужна
model.destructor()
```

**Важно:** Если переопределяете `destructor()` в своем классе, обязательно вызывайте `super.destructor()`, иначе будут утечки памяти:

```typescript
class CustomModel extends ProtoModel {
  destructor() {
    // Ваша логика очистки
    this.cleanup()
    
    // Обязательно вызывайте super.destructor()
    super.destructor()
  }
}
```

