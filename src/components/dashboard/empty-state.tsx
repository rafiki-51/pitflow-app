type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-8 text-center sm:p-12">
      <div className="mx-auto max-w-md">
        <p className="text-lg font-medium text-foreground">{title}</p>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      </div>
    </div>
  );
}
