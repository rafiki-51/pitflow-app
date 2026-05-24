type DashboardSectionCardProps = {
  title: string;
  description: string;
};

export function DashboardSectionCard({
  title,
  description,
}: DashboardSectionCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface p-5 transition-colors hover:bg-surface-muted">
      <h2 className="text-base font-medium text-foreground">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
