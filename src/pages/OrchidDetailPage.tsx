import { Link, useParams } from "react-router-dom";

export function OrchidDetailPage() {
  const { slug } = useParams();

  return (
    <section className="rounded-lg border border-moss/25 bg-white p-6 shadow-sm">
      <Link to="/" className="text-sm font-semibold text-leaf hover:underline">
        Back to orchids
      </Link>

      <div className="mt-6 space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-bark">Orchid detail</p>
        <h2 className="text-3xl font-bold">Care page coming next</h2>
        <p className="max-w-2xl text-base leading-7 text-ink/80">
          This route is ready for the full care profile for{" "}
          <span className="font-semibold text-ink">{slug}</span>.
        </p>
      </div>
    </section>
  );
}
