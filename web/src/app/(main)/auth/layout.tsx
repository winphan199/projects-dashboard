import { ReactNode } from "react";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-1">
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
