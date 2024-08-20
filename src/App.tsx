import "./styles.css";
import { Book, BookInformation } from "./lib/types";
import { getBooks, getUsers, getReviews } from "./lib/api";
import { useEffect, useState, FC } from "react";
import Card from "./Card";

// Техническое задание:
// Доработать приложение App, чтобы в отрисованном списке
// были реальные отзывы, автор книги и автор отзыва.
// Данные об отзывах и пользователях можно получить при помощи асинхронных
// функций getUsers, getReviews

// функция getBooks возвращает Promise<Book[]>
// функция getUsers возвращает Promise<User[]>
// функция getReviews возвращает Promise<Review[]>

// В объектах реализующих интерфейс Book указаны только uuid
// пользователей и обзоров

// // В объектах реализующих интерфейс BookInformation, ReviewInformation
// указана полная информация об пользователе и обзоре.

const fetchBookInformation = async (
  books: Book[],
  users: User[],
  reviews: Review[]
): Promise<BookInformation[]> => {
  return Promise.all(
    books.map(async (book) => {
      const author = users.find((user) => user.id === book.authorId)!;
      const bookReviews = await Promise.all(
        book.reviewIds.map(async (reviewId) => {
          const review = reviews.find((r) => r.id === reviewId)!;
          const reviewer = users.find((user) => user.id === review.userId)!;
          return {
            id: review.id,
            text: review.text,
            user: reviewer,
          };
        })
      );
      return {
        id: book.id,
        name: book.name || "Книга без названия",
        description: book.description,
        author,
        reviews: bookReviews,
      };
    })
  );
};

const App: FC = () => {
  const [books, setBooks] = useState<BookInformation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [fetchedBooks, fetchedUsers, fetchedReviews] = await Promise.all([
        getBooks(),
        getUsers(),
        getReviews(),
      ]);
      const bookInformation = await fetchBookInformation(
        fetchedBooks,
        fetchedUsers,
        fetchedReviews
      );
      setBooks(bookInformation);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading && books.map((b) => <Card key={b.id} book={b} />)}
    </div>
  );
};

export default App;
