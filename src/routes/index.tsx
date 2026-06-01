import { createFileRoute } from "@tanstack/react-router";
import { SitePageShell } from "@/components/SitePageShell";
import { DEFAULT_CONFIG } from "@/lib/site-config";

async function fetchBusiness(slug: string) {
  const url = process.env["SUPABASE_URL"] ?? "";
  const key = process.env["SUPABASE_ANON_KEY"] ?? "";

  if (!url || !key) {
    throw new Error("SUPABASE_URL or SUPABASE_ANON_KEY env var is missing");
  }

  const res = await fetch(
    `${url}/rest/v1/businesses?slug=eq.${encodeURIComponent(slug)}&select=business_name,city,phone,email,state&limit=1`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } }
  );

  if (!res.ok) throw new Error(`Supabase HTTP ${res.status}`);

  const rows: { business_name: string; city: string; phone: string; email: string; state: string }[] =
    await res.json();

  if (!rows.length) throw new Error(`No row found for slug "${slug}"`);

  return {
    businessName: rows[0].business_name,
    city: rows[0].city,
    phone: rows[0].phone,
    email: rows[0].email,
    state: rows[0].state,
  };
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    slug: typeof search.slug === "string" ? search.slug : undefined,
  }),

  loaderDeps: ({ search: { slug } }) => ({ slug }),

  loader: async ({ deps: { slug } }) => {
    if (!slug) return { data: null, error: null };
    try {
      const data = await fetchBusiness(slug);
      return { data, error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  head: () => ({
    meta: [
      { title: `Best Concrete Contractor` },
    ],
  }),

  component: function IndexPage() {
    const { data, error } = Route.useLoaderData();
    const { slug } = Route.useSearch();

    if (error) {
      return (
        <div style={{ fontFamily: "monospace", padding: 40, maxWidth: 600 }}>
          <h2 style={{ color: "red" }}>⚠ Debug: failed to load slug "{slug}"</h2>
          <pre style={{ background: "#f4f4f4", padding: 16, borderRadius: 8 }}>{error}</pre>
          <p>Check your Vercel env vars and Supabase table setup.</p>
        </div>
      );
    }

    return data
      ? <SitePageShell businessName={data.businessName} city={data.city} phone={data.phone} />
      : <SitePageShell />;
  },
});
