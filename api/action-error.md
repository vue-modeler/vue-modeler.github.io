---
title: ActionError
description: Справочник по классу ошибки ActionError
outline: deep
---

## ActionError

Класс ошибки, представляющий исключение, произошедшее во время выполнения действия. Это исключение, которое должно быть обработано и отображено пользователю в слое UI.

### Конструктор

#### `new ActionError(actionName: string, options: { cause: Error })`

Создаёт новый экземпляр ActionError.

**Параметры:**

- `actionName` - Имя действия, в котором произошла ошибка
- `options.cause` - Оригинальная ошибка, вызвавшая этот ActionError

**Свойства:**

- `name: string` - Всегда `'ActionError'`
- `message: string` - Сообщение из ошибки-причины

### Свойства экземпляра

#### `cause: Error` (только чтение)

Оригинальная ошибка, вызвавшая этот ActionError.

### Методы экземпляра

#### `throwCause(): void`

Выбрасывает оригинальную ошибку-причину.

**Пример:**

```typescript
if (action.error) {
  action.error.throwCause() // Выбрасывает оригинальную ошибку
}
```

#### `toString(): string`

Возвращает сообщение из ошибки-причины.

**Возвращает:** Строка сообщения об ошибке

### Пример использования

```typescript
@action async fetchUser(): Promise<void> {
  try {
    const user = await this.api.fetchUser()
    this._user = user
  } catch (error) {
    // Ошибка автоматически перехватывается и оборачивается в ActionError
    // Доступ к ней через action.error
  }
}

// В компоненте или внешнем коде
await model.fetchUser.exec()
if (model.fetchUser.error) {
  console.error('Действие не выполнено:', model.fetchUser.error.cause)
  // Или повторно выбросить оригинальную ошибку
  model.fetchUser.error.throwCause()
}
```
