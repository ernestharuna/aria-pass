import type { MetaArgs, MetaFunction } from "react-router";

export const defaultMeta: MetaFunction = (args: MetaArgs<unknown, Record<string, unknown>>) => {
    return [
        // Standard Meta Tags
        { name: "theme-color", content: "#625DF5" },
        { name: "keywords", content: "concert community, music events, fan meetups, social ticketing, event organization, AriaPass, OwenaHub" },
        { name: "author", content: "OwenaHub Collective" },
        { name: "robots", content: "index, follow" },
        { name: "description", content: "Discover and organize events, advertising and ticket sales with a community of music lovers." },

        // Open Graph (Facebook, LinkedIn)
        { property: "og:title", content: "AriaPass - Discover the community behind the concerts" },
        { property: "og:description", content: "Discover and organize events, advertising and ticket sales with a community of music lovers." },
        { property: "og:image", content: "https://ariapass.owenahub.com/images/banners/app_banner.png" },
        { property: "og:url", content: "https://ariapass.owenahub.com" },
        { property: "og:type", content: "website" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@owenahub" }, // Optional: Add your Twitter handle
        { name: "twitter:title", content: "AriaPass - Discover the community behind the concerts" },
        { name: "twitter:description", content: "Discover and organize events, advertising and ticket sales with a community of music lovers." },
        { name: "twitter:image", content: "https://ariapass.owenahub.com/images/banners/app_banner.png" },
    ];
};