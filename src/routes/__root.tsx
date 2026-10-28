import type {ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import PromoPopup from "@/components/PromoPopup";
import NotFound from "@/pages/NotFound";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import appCss from "@/index.css?url";

const TITLE = "Лечение артроза и боли в суставах в Новосибирске — Ваш Ортопед";
const DESCRIPTION =
    "Лечение артроза, артрита, боли в коленях и спине без операции. PRP-терапия, SVF, гиалуроновая кислота. Клиника «Ваш Ортопед», Новосибирск. Запись: +7 999 464 91 94.";
const OG_DESCRIPTION =
    "Клиника «Ваш Ортопед» в Новосибирске — лечение артроза, артрита, бурсита, синовита, тендинита. PRP-терапия, SVF-терапия. Запись: +7 999 464 91 94.";
const OG_IMAGE = "https://cdn.poehali.dev/projects/***/bucket/e2499b19-7adf-49c3-8d97-24a9359d9af0.png";

const METRIKA = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108160921', 'ym');
ym(108160921, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

// Routes whose pages do not render the <SEO> component: they keep the site defaults.
const NO_SEO_ROUTES = ["/admin", "/booking-admin", "/dds"];

export const Route = createRootRoute({
    head: ({matches}) => {
        // Pages with the <SEO> component render their own title/description/og tags.
        const leaf: string = matches[matches.length - 1]?.routeId ?? "";
        const ownSeo = leaf !== "__root__" && !NO_SEO_ROUTES.some((r) => leaf === r || leaf.startsWith(`${r}/`));
        return {
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            ...(ownSeo ? [] : [
                {title: TITLE},
                {name: "description", content: DESCRIPTION},
            ]),
            {name: "author", content: "Ваш Ортопед"},
            ...(ownSeo ? [] : [
                {property: "og:type", content: "website"},
                {property: "og:site_name", content: "Ваш Ортопед"},
                {property: "og:title", content: TITLE},
                {property: "og:description", content: OG_DESCRIPTION},
                {property: "og:image", content: OG_IMAGE},
                {property: "og:image:width", content: "1200"},
                {property: "og:image:height", content: "1200"},
                {property: "og:locale", content: "ru_RU"},
                {name: "twitter:card", content: "summary_large_image"},
                {name: "twitter:title", content: TITLE},
                {name: "twitter:description", content: "Лечение заболеваний суставов в Новосибирске. Запись: +7 999 464 91 94."},
                {name: "twitter:image", content: OG_IMAGE},
                {name: "robots", content: "index, follow"},
            ]),
            {name: "google-site-verification", content: "c7SckHNBDvSg_8MyyKD1wBFJ0z7uUTV4ecZngU3s_uE"},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Golos+Text:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap",
            },
            {rel: "icon", type: "image/png", href: OG_IMAGE},
            ...(ownSeo ? [] : [{rel: "canonical", href: "https://vash-ortoped.ru/"}]),
            {rel: "alternate", hrefLang: "ru", href: "https://vash-ortoped.ru/"},
            {rel: "alternate", hrefLang: "x-default", href: "https://vash-ortoped.ru/"},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {children: METRIKA},
        ],
        };
    },
    component: RootComponent,
    notFoundComponent: NotFound,
});

function RootComponent() {
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <PromoPopup/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <Scripts/>
        </body>
        </html>
    );
}
