import { createFileRoute, notFound } from "@tanstack/react-router";
import { SitePageShell } from "@/components/SitePageShell";
import { getBusinessBySlug } from "@/lib/api/businesses.functions";

export const Route = createFileRoute("/preview/$slug")({
  loader: async ({ params }) => {
    try {
      return await getBusinessBySlug({ data: { slug: params.slug } });
    } catch {
      throw notFound();
    }
  },

  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { businessName, city, phone } = loaderData;
    const title = `Concrete Contractor in ${city} | ${businessName}`;
    const description = `${businessName} is ${city}'s licensed concrete contractor for driveways, patios, stamped concrete, foundations and repair. Free written estimates — call ${phone}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "robots", content: "noindex" },
      ],
    };
  },

  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Business not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">No preview exists for this slug. Check the Supabase table.</p>
      </div>
    </div>
  ),

  component: function PreviewPage() {
    const { businessName, city, phone } = Route.useLoaderData();
    return <SitePageShell businessName={businessName} city={city} phone={phone} />;
  },
});
