import type { OrchidListPagination } from "../api/orchidApi";

type PaginationControlsProps = {
  pagination: OrchidListPagination;
  onPageChange: (page: number) => void;
};

export function PaginationControls({ pagination, onPageChange }: PaginationControlsProps) {
  return (
    <nav
      aria-label="Orchid pages"
      className="flex flex-wrap items-center justify-center gap-3 text-sm"
    >
      <button
        type="button"
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={!pagination.hasPreviousPage}
        className="h-11 min-w-24 rounded-md border border-moss/45 bg-mist px-4 font-semibold text-rosy transition hover:border-rosy focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy disabled:cursor-not-allowed disabled:opacity-45"
      >
        Previous
      </button>

      <span className="min-w-28 text-center font-medium text-white" aria-live="polite">
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={!pagination.hasNextPage}
        className="h-11 min-w-24 rounded-md border border-moss/45 bg-mist px-4 font-semibold text-rosy transition hover:border-rosy focus:outline-none focus-visible:ring-2 focus-visible:ring-rosy disabled:cursor-not-allowed disabled:opacity-45"
      >
        Next
      </button>
    </nav>
  );
}
