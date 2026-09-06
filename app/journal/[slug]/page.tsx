import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "@/lib/journal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="wrap" style={{ maxWidth: 720, paddingBottom: 90 }}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/journal">Journal</Link>
        <span>/</span>
        {post.title}
      </nav>

      <article data-testid="post-article" data-slug={post.slug}>
        <p className="small muted">
          {formatDate(post.date)} · {post.author} · {post.readingTime}
        </p>
        <h1 style={{ margin: "10px 0 24px" }} data-testid="post-title">
          {post.title}
        </h1>
        {post.body.map((paragraph, i) => (
          <p key={i} style={{ fontSize: "1.0625rem", color: "var(--ink-2)" }}>
            {paragraph}
          </p>
        ))}
      </article>

      <Link href="/journal" className="btn btn-ghost" style={{ marginTop: 20 }}>
        ← All posts
      </Link>
    </div>
  );
}
