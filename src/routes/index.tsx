import { createFileRoute } from "@tanstack/react-router";
import { SitePageShell } from "@/components/SitePageShell";
import { DEFAULT_CONFIG } from "@/lib/site-config";
import { getBusinessBySlug } from "@/lib/api/businesses.functions";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    slug: typeof search.slug === "string" ? search.slug : undefined,
  }),

  loaderDeps: ({ search: { slug } }) => ({ slug }),

  loader: async ({ deps: { slug } }) => {
    if (!slug) return null;
    try {
      return await getBusinessBySlug({ data: { slug } });
    } catch {
      return null;
    }
  },

  head: () => ({
    meta: [
      { title: `Concrete Contractor in ${DEFAULT_CONFIG.city} | ${DEFAULT_CONFIG.businessName}` },
      { name: "description", content: `${DEFAULT_CONFIG.businessName} is ${DEFAULT_CONFIG.city}'s licensed concrete contractor.` },
    ],
  }),

  component: function IndexPage() {
    const data = Route.useLoaderData();
    return data
      ? <SitePageShell businessName={data.businessName} city={data.city} phone={data.phone} />
      : <SitePageShell />;
  },
});
