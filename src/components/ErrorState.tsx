type ErrorStateProps = {
  title?: string;
  message: string;
};

export function ErrorState({ title = "Something went wrong", message }: ErrorStateProps) {
  return (
    <section className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center">
      <h2 className="text-lg font-semibold text-red-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-red-800">{message}</p>
    </section>
  );
}
