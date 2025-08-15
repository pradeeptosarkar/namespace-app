import { useEffect } from "react";
import { Wrench } from "lucide-react";
import Logo from "@/components/Logo";

const Maintenance = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "We’ll be back soon – Maintenance";

    const setOrUpdateMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // SEO: concise description and discourage indexing while in maintenance
    setOrUpdateMeta("description", "Site under maintenance. We’ll be back shortly.");
    setOrUpdateMeta("robots", "noindex, nofollow");

    return () => {
      document.title = previousTitle;
      setOrUpdateMeta("robots", "index, follow");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border">
            <Wrench className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">We’ll be back soon</h1>
          <p className="mt-4 text-muted-foreground">
            We’re performing scheduled maintenance to improve your experience. Thank you for your patience.
          </p>
          <p className="mt-2 text-muted-foreground">
            If you need assistance, contact us at
            {" "}
            <a href="mailto:contact@namespacecomm.in" className="underline underline-offset-4">
              contact@namespacecomm.in
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Maintenance;
