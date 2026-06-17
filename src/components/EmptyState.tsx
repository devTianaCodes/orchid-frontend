type EmptyStateProps = {
  title: string;
  message?: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <section className="rounded-lg border border-peony/50 bg-mist px-4 py-6 text-center">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {message ? <p className="mt-2 text-sm leading-6 text-bark">{message}</p> : null}
    </section>
  );
}
