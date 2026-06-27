import BookButton from "@/components/BookButton";
import { Check } from "@/components/icons";
import { getBook } from "@/sanity/lib/fetchers";

export default async function SimpleBook() {
  const book = await getBook();

  return (
    <section className="simple-book" id="book">
      <div className="container">
        <div className="simple-book-grid">
          <div>
            <div
              className="eyebrow reveal"
              style={{ color: "var(--sand)", marginBottom: 16 }}
            >
              {book.eyebrow}
            </div>
            <h2 className="reveal">{book.heading}</h2>
            <p className="reveal">{book.body}</p>
            <BookButton className="btn btn-primary reveal">
              {book.ctaLabel}
            </BookButton>
            <div className="simple-book-meta reveal">
              {book.meta.map((m, i) => (
                <span key={i}>
                  <Check /> {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
