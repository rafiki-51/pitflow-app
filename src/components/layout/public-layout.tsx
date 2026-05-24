import { PublicFooter } from "./public-footer";
import { PublicNavbar } from "./public-navbar";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicNavbar />
      <main className="flex flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
