import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerConfig } from "../config.server";

export const getBusinessBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { supabaseUrl, supabaseAnonKey } = getServerConfig();

    const res = await fetch(
      `${supabaseUrl}/rest/v1/businesses?slug=eq.${encodeURIComponent(data.slug)}&select=business_name,city,phone&limit=1`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      }
    );

    if (!res.ok) throw new Error(`Supabase responded ${res.status}`);

    const rows: { business_name: string; city: string; phone: string }[] = await res.json();
    if (!rows.length) throw new Error(`No business found for slug: ${data.slug}`);

    return {
      businessName: rows[0].business_name,
      city: rows[0].city,
      phone: rows[0].phone,
    };
  });
