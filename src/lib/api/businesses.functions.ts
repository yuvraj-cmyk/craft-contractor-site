import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { getServerConfig } from "../config.server";

export const getBusinessBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { supabaseUrl, supabaseAnonKey } = getServerConfig();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: business, error } = await supabase
      .from("businesses")
      .select("business_name, city, phone")
      .eq("slug", data.slug)
      .single();

    if (error || !business) {
      throw new Error(`Business not found: ${data.slug}`);
    }

    return {
      businessName: business.business_name as string,
      city: business.city as string,
      phone: business.phone as string,
    };
  });
