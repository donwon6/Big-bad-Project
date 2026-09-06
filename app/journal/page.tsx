import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, posts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on brewing, roasting and the gear we actually use.",
};

export default function JournalPage() {
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <p className="eyebrow">Notes from the shop</p>
          <h1>Journal</h1>
          <p>
            What we have learned pulling shots, roasting small lots and answering
            the same good questions across the counter.
          </p>
        </div>
      </div>

      <div className="wrap section">
        <div className="stack" data-testid="post-list">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="panel"
              data-testid="post-card"
              data-slug={post.slug}
            >
              <p className="small muted" style={{ margin: 0 }}>
                {formatDate(post.date)} · {post.readingTime}
              </p>
              <h2 style={{ fontSize: "1.5rem", margin: "8px 0 10px" }}>
                <Link href={`/journal/${post.slug}`} data-testid="post-link">
                  {post.title}
                </Link>
              </h2>
              <p style={{ color: "var(--ink-2)", marginBottom: 12 }}>{post.excerpt}</p>
              <Link href={`/journal/${post.slug}`} className="btn btn-ghost">
                Read the post →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
