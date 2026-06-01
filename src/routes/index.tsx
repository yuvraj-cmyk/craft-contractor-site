import { createFileRoute } from "@tanstack/react-router";
import { SitePageShell } from "@/components/SitePageShell";
import { DEFAULT_CONFIG } from "@/lib/site-config";

const { businessName, city, phone } = DEFAULT_CONFIG;
const TITLE = `Concrete Contractor in ${city} | ${businessName}`;
const DESCRIPTION = `${businessName} is ${city}'s licensed concrete contractor for driveways, patios, stamped concrete, foundations and repair. Free written estimates — call ${phone}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: businessName,
          image: "/og.jpg",
          telephone: phone,
          priceRange: "$$",
          address: { "@type": "PostalAddress", streetAddress: "1428 Industrial Blvd", addressLocality: city, addressRegion: "TX", postalCode: "78702", addressCountry: "US" },
        }),
      },
    ],
  }),
  component: SitePageShell,
});
