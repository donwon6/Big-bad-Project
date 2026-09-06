export default function Stars({ rating, count }: { rating: number; count?: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="stars">
      <span className="stars-icons" aria-hidden="true">
        {"★★★★★".slice(0, rounded)}
        <span style={{ opacity: 0.28 }}>{"★★★★★".slice(0, 5 - rounded)}</span>
      </span>
      <span>
        {rating.toFixed(1)}
        {count !== undefined ? ` (${count})` : ""}
      </span>
      <span className="sr-only" style={{ position: "absolute", left: -9999 }}>
        {rating} out of 5 stars{count !== undefined ? `, ${count} reviews` : ""}
      </span>
    </span>
  );
}
