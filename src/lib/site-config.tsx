import { createContext, useContext } from "react";

export interface SiteConfig {
  businessName: string;
  city: string;
  phone: string;
  email: string;
  state: string;
}

export const DEFAULT_CONFIG: SiteConfig = {
  businessName: "Apex Concrete & Co.",
  city: "Austin",
  phone: "(512) 555-0142",
  email: "estimates@apexconcreteco.com",
  state: "TX",
};

const SiteConfigContext = createContext<SiteConfig>(DEFAULT_CONFIG);

export const useSiteConfig = () => useContext(SiteConfigContext);
export const SiteConfigProvider = SiteConfigContext.Provider;
