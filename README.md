# Проект: Книжные Рецензии

![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Описание

Этот проект представляет собой React-приложение, которое отображает список книг, включая их авторов и рецензии пользователей. Данные о книгах, авторах и рецензиях загружаются асинхронно с использованием фиктивного API, имитирующего задержки сети. Приложение демонстрирует работу с React, TypeScript и основными принципами работы с компонентами и состояниями.

## Функционал

- **Отображение списка книг:** Приложение загружает список книг и отображает их названия, описания, авторов и рецензии.
- **Асинхронная загрузка данных:** Данные о книгах, пользователях и рецензиях загружаются асинхронно, что имитирует реальную работу с внешними API.
- **Типизация с помощью TypeScript:** Использование интерфейсов для описания типов данных и предотвращения ошибок на этапе разработки.
  
## Структура проекта

```plaintext
src/
├── lib/
│   ├── types.ts       # Определение интерфейсов для книг, рецензий и пользователей.
│   └── api.ts         # Асинхронные функции для получения данных о книгах, пользователях и рецензиях.
├── components/
│   ├── App.tsx        # Главный компонент, который загружает данные и управляет состоянием.
│   └── Card.tsx       # Компонент для отображения информации о книге.
└── index.tsx          # Входная точка приложения.
```

## Установка и запуск

### Предварительные требования

- [Node.js](https://nodejs.org/en/download/package-manager) (версия 14.x или выше)
- [npm](https://nodejs.org/en/download/package-manager) или [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

### Установка зависимостей

```bash
npm install
# или
yarn install
```

### Запуск проекта

Для запуска проекта в режиме разработки используйте команду:

```bash
npm start
# или
yarn start
```

Приложение будет доступно по адресу: `http://localhost:3000`.

### Сборка проекта

Для сборки проекта используйте команду:

```bash
npm run build
# или
yarn build
```

Собранная версия будет находиться в папке `build`.

## Используемые технологии

- **React**: Библиотека для построения пользовательских интерфейсов.
- **TypeScript**: Язык программирования, расширяющий JavaScript с поддержкой статической типизации.
- **CSS**: Стилизация приложения.

## Разработка

### Основные интерфейсы

- **`Book`**: Описывает объект книги. Включает `id`, `name`, `description`, `authorId`, `reviewIds`.
- **`User`**: Описывает объект пользователя. Включает `id`, `name`.
- **`Review`**: Описывает объект рецензии. Включает `id`, `userId`, `text`.
- **`BookInformation`**: Описывает объект книги с полной информацией об авторе и рецензиях.
- **`ReviewInformation`**: Описывает объект рецензии с полной информацией о пользователе.

### Асинхронные функции

- **`getBooks()`**: Возвращает список книг.
- **`getUsers()`**: Возвращает список пользователей.
- **`getReviews()`**: Возвращает список рецензий.

## Примеры использования

### Отображение списка книг

Компонент `App` загружает книги с помощью функции `getBooks()` и отображает их, используя компонент `Card` для каждого элемента списка.

```tsx
import { useEffect, useState } from "react";
import { getBooks } from "./lib/api";
import Card from "./components/Card";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((fetchedBooks) => setBooks(fetchedBooks));
  }, []);

  return (
    <div>
      <h1>Мои книги:</h1>
      {books.map((book) => (
        <Card key={book.id} book={book} />
      ))}
    </div>
  );
};

export default App;
```

### Отображение книги и рецензий

Компонент `Card` принимает объект `BookInformation` и отображает название книги, имя автора, описание и список рецензий.

```tsx
import { FC } from "react";
import { BookInformation } from "../lib/types";

const Card: FC<{ book: BookInformation }> = ({ book }) => (
  <div>
    <h3>{book.name}</h3>
    <p><b>Автор</b>: {book.author.name}</p>
    <p><b>Описание</b>: {book.description}</p>
    <p><b>Отзывы:</b> {book.reviews.map((review) => (
      <div key={review.id}>{review.text} - {review.user.name}</div>
    ))}</p>
  </div>
);

export default Card;
```

## Контрибьюции

Если вы хотите предложить улучшения или обнаружили ошибки, пожалуйста, создайте Pull Request или Issue в этом репозитории.

---

Спасибо за использование этого проекта!
