import Link from "next/link";

export default function NotFound() {
  return (
    <div className="narrow" style={{ textAlign: "center" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ margin: "10px 0 12px" }}>We could not find that page.</h1>
      <p className="muted">
        The link may be old, or the product may have sold out and been retired.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/shop" className="btn btn-secondary">
          Shop everything
        </Link>
      </div>
    </div>
  );
}
