type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading" }: LoadingStateProps) {
  return (
    <section className="rounded-lg border border-peony/50 bg-mist px-4 py-6 text-center">
      <p className="text-sm font-medium text-bark">{label}</p>
    </section>
  );
}
