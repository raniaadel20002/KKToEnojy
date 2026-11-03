"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Search,
  Star,
  Trash2,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  useDeleteReviewsProjectMutation,
  useReviewsProjectByIdQuery,
  useReviewsProjectQuery,
} from "./hooks";
import type { ReviewsProject } from "./types";

const pageSizes = [6, 10, 20];

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function getReviewerName(review: ReviewsProject) {
  return `${review.firstName ?? ""} ${review.lastName ?? ""}`.trim() || "Guest";
}

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function renderStars(rate: number | null) {
  const rating = Math.max(0, Math.min(5, rate ?? 0));

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      className={
        index < rating
          ? "fill-[#f5b301] text-[#f5b301]"
          : "fill-transparent text-slate-300"
      }
      key={index}
      size={16}
    />
  ));
}

export function AdminReviewsProjectPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<ReviewsProject | null>(null);

  const reviewsQuery = useReviewsProjectQuery({
    pageNumber,
    pageSize,
  });
  const deleteMutation = useDeleteReviewsProjectMutation();

  const allReviews = reviewsQuery.data?.data ?? [];

  // Client-side search filtering on current page
  const filteredReviews = useMemo(() => {
    if (!activeSearch.trim()) return allReviews;
    const term = activeSearch.toLowerCase().trim();
    return allReviews.filter((r) => {
      const name = `${r.firstName ?? ""} ${r.lastName ?? ""}`.toLowerCase();
      const email = (r.email ?? "").toLowerCase();
      const comment = (r.comment ?? "").toLowerCase();
      return name.includes(term) || email.includes(term) || comment.includes(term);
    });
  }, [allReviews, activeSearch]);

  const hasNextPage = allReviews.length >= pageSize;

  useEffect(() => {
    if (reviewsQuery.error) {
      toast.error(getErrorText(reviewsQuery.error, "Unable to load reviews."));
    }
  }, [reviewsQuery.error]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveSearch(searchTerm.trim());
  }

  function clearSearch() {
    setSearchTerm("");
    setActiveSearch("");
  }

  function handleDeleteReview() {
    if (!reviewToDelete) {
      return;
    }

    deleteMutation.mutate(reviewToDelete.id, {
      onSuccess: () => {
        toast.success("Review deleted successfully.");
        setReviewToDelete(null);
        if (selectedReviewId === reviewToDelete.id) {
          setSelectedReviewId(null);
        }
      },
      onError: (err) => {
        toast.error(getErrorText(err, "Unable to delete review."));
      },
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">
            Moderation
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">
            ReviewsProject
          </h1>
          <p className="mt-3 max-w-[760px] text-base leading-[1.7] text-[var(--color-muted)]">
            Read project testimonials and traveller reviews, inspect customer
            feedback, and delete reviews when needed.
          </p>
        </div>

        <div className="rounded-lg border border-black/5 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Showing
          </p>
          <p className="mt-1 text-2xl font-bold text-[var(--color-deep-ocean)]">
            {filteredReviews.length}
          </p>
        </div>
      </div>

      {/* Filter & Page Size Bar */}
      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="grid gap-3 lg:grid-cols-[1fr_150px_120px]">
          <form className="relative" onSubmit={handleSearch}>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              size={18}
            />
            <input
              className="h-11 w-full rounded-lg border border-black/10 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by customer, email, or comment..."
              type="text"
              value={searchTerm}
            />
          </form>

          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setPageSize(Number(event.target.value));
            }}
            value={pageSize}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>

          <button
            className="h-11 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!searchTerm && !activeSearch}
            onClick={clearSearch}
            type="button"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Review List */}
      <section className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
            ReviewsProject List
          </p>
          {reviewsQuery.isFetching ? (
            <span className="flex items-center gap-2 text-xs font-semibold text-[var(--color-muted)]">
              <Loader2 className="animate-spin" size={15} />
              Updating
            </span>
          ) : null}
        </div>

        {reviewsQuery.isLoading ? (
          <div className="grid min-h-[340px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading reviews</span>
            </div>
          </div>
        ) : null}

        {!reviewsQuery.isLoading && filteredReviews.length === 0 ? (
          <div className="grid min-h-[340px] place-items-center px-4 py-12 text-center">
            <div>
              <MessageSquareText
                className="mx-auto text-[var(--color-ocean)]"
                size={34}
              />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No reviews found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Reviews will appear here after travellers submit feedback.
              </p>
            </div>
          </div>
        ) : null}

        {!reviewsQuery.isLoading && filteredReviews.length > 0 ? (
          <div>
            <div className="hidden grid-cols-[minmax(240px,1fr)_minmax(320px,1.6fr)_minmax(140px,0.7fr)_minmax(160px,0.8fr)_96px] gap-4 bg-[#f5f9ff] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:grid">
              <span>Customer</span>
              <span>Comment</span>
              <span>Rating</span>
              <span>Date</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-black/5">
              {filteredReviews.map((review) => (
                <ReviewsProjectRow
                  key={review.id}
                  onDelete={() => setReviewToDelete(review)}
                  onView={() => setSelectedReviewId(review.id)}
                  review={review}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Pagination Bar */}
        <div className="flex flex-col gap-3 border-t border-black/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted)]">
            Page {pageNumber}
          </p>
          <div className="flex gap-2">
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={pageNumber === 1 || reviewsQuery.isFetching}
              onClick={() =>
                setPageNumber((current) => Math.max(1, current - 1))
              }
              type="button"
            >
              <ChevronLeft size={17} />
              <span>Previous</span>
            </button>
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasNextPage || reviewsQuery.isFetching}
              onClick={() => setPageNumber((current) => current + 1)}
              type="button"
            >
              <span>Next</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Review Details Modal */}
      {selectedReviewId ? (
        <ReviewsProjectDetailsPanel
          onClose={() => setSelectedReviewId(null)}
          reviewId={selectedReviewId}
        />
      ) : null}

      {/* Delete Confirmation Modal */}
      {reviewToDelete ? (
        <ConfirmDeletePanel
          isDeleting={deleteMutation.isPending}
          onCancel={() => setReviewToDelete(null)}
          onConfirm={handleDeleteReview}
          review={reviewToDelete}
        />
      ) : null}
    </div>
  );
}

function ReviewsProjectRow({
  onDelete,
  onView,
  review,
}: {
  onDelete: () => void;
  onView: () => void;
  review: ReviewsProject;
}) {
  return (
    <div className="grid gap-4 px-4 py-4 xl:grid-cols-[minmax(240px,1fr)_minmax(320px,1.6fr)_minmax(140px,0.7fr)_minmax(160px,0.8fr)_96px] xl:items-center">
      {/* Customer Info */}
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#e8f5f9] text-[var(--color-ocean)]">
            <User size={19} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[var(--color-deep-ocean)]">
              {getReviewerName(review)}
            </p>
            <p className="mt-1 truncate text-xs text-[var(--color-muted)]">
              {review.email || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Comment
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--foreground)] xl:mt-0">
          {review.comment || "-"}
        </p>
      </div>

      {/* Rating */}
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Rating
        </p>
        <div className="flex items-center gap-1">{renderStars(review.rate)}</div>
        <p className="mt-1 text-xs font-semibold text-[var(--color-muted)]">
          {review.rate ?? 0} / 5
        </p>
      </div>

      {/* Date */}
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Date
        </p>
        <p className="mt-1 text-xs font-medium text-[var(--color-deep-ocean)] xl:mt-0">
          {formatDate(review.createdAt)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-start gap-2 xl:justify-end">
        <button
          aria-label={`View review ${review.id}`}
          className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)] cursor-pointer"
          onClick={onView}
          type="button"
        >
          <Eye size={17} />
        </button>
        <button
          aria-label={`Delete review ${review.id}`}
          className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 cursor-pointer"
          onClick={onDelete}
          type="button"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

function ReviewsProjectDetailsPanel({
  onClose,
  reviewId,
}: {
  onClose: () => void;
  reviewId: number;
}) {
  const reviewQuery = useReviewsProjectByIdQuery(reviewId);
  const review = reviewQuery.data?.data;

  useEffect(() => {
    if (reviewQuery.error) {
      toast.error(getErrorText(reviewQuery.error, "Unable to load review details."));
    }
  }, [reviewQuery.error]);

  return (
    <ReviewModalFrame
      eyebrow="ReviewsProject Details"
      onClose={onClose}
      title={review ? getReviewerName(review) : "Review Details"}
    >
      {reviewQuery.isLoading ? (
        <div className="grid min-h-[320px] place-items-center p-5 text-[var(--color-deep-ocean)]">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading review details</span>
          </div>
        </div>
      ) : null}

      {reviewQuery.isError && !review ? (
        <div className="grid min-h-[220px] place-items-center p-5 text-center">
          <div>
            <p className="text-sm font-medium text-[var(--color-muted)]">
              Could not load review details.
            </p>
            <button
              className="mt-4 h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
              onClick={() => void reviewQuery.refetch()}
              type="button"
            >
              Try again
            </button>
          </div>
        </div>
      ) : null}

      {review ? (
        <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <div className="rounded-lg border border-black/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
                  Feedback
                </p>
                <div className="flex items-center gap-1">
                  {renderStars(review.rate)}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
                {review.comment || "-"}
              </p>
              <p className="mt-4 text-xs font-semibold text-[var(--color-muted)]">
                Submitted on {formatDate(review.createdAt)}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 p-4">
            <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
              Customer Info
            </p>
            <div className="mt-4 space-y-3">
              <InfoItem label="Full Name" value={getReviewerName(review)} />
              <IconInfoItem icon={Mail} label="Email" value={review.email || "-"} />
              <IconInfoItem icon={Phone} label="Phone" value={review.phone || "-"} />
              <InfoItem label="Review ID" value={String(review.id)} />
            </div>
          </div>
        </div>
      ) : null}
    </ReviewModalFrame>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#f7fbfd] px-3 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-bold text-[var(--color-deep-ocean)]">
        {value}
      </p>
    </div>
  );
}

function IconInfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg bg-[#f7fbfd] px-3 py-3">
      <Icon className="mt-0.5 shrink-0 text-[var(--color-ocean)]" size={17} />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-bold text-[var(--color-deep-ocean)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function ReviewModalFrame({
  children,
  eyebrow,
  onClose,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="max-h-full w-full max-w-[880px] overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ocean)]">
              {eyebrow}
            </p>
            <h2 className="mt-1 line-clamp-2 text-xl font-bold text-[var(--color-deep-ocean)]">
              {title}
            </h2>
          </div>
          <button
            aria-label="Close review details"
            className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function ConfirmDeletePanel({
  isDeleting,
  onCancel,
  onConfirm,
  review,
}: {
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  review: ReviewsProject;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[440px] rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-deep-ocean)]">
          Delete ReviewsProject
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--color-muted)]">
          This will permanently delete the review from {getReviewerName(review)}. This
          action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] cursor-pointer"
            disabled={isDeleting}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            disabled={isDeleting}
            onClick={onConfirm}
            type="button"
          >
            {isDeleting ? (
              <Loader2 className="animate-spin" size={17} />
            ) : (
              <Trash2 size={17} />
            )}
            <span>Delete</span>
          </button>
        </div>
      </section>
    </div>
  );
}
