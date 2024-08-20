import { FC } from "react";
import { BookInformation } from "./lib/types";

const Card: FC<{ book: BookInformation }> = ({ book }) => {
  if (!book.name || !book.author) {
    return null;
  }

  return (
    <div>
      <h3>{book.name}</h3>
      <p>
        <b>Автор</b>: {book.author.name}
      </p>
      <p>
        <b>Описание</b>: {book.description}
      </p>
      <p>
        <b>Отзывы: </b>
        {book.reviews.length > 0
          ? book.reviews.map((r) => (
              <div key={r.id}>
                <p>
                  {r.text} — <b>{r.user.name}</b>
                </p>
              </div>
            ))
          : "-"}
      </p>
    </div>
  );
};

export default Card;
