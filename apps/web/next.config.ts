import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only serves quality values that are explicitly allowlisted
    // here (the default list is [75]; any other q= 400s at the optimizer).
    // 50 exists for the two full-bleed photos that sit under heavy dark
    // overlays (hero, stats backdrop), where the extra compression is
    // invisible but the byte savings matter for 4G LCP. 75 stays the
    // default for everything else.
    qualities: [50, 75],
  },
};

export default nextConfig;
