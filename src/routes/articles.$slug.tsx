import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import ArticleDetail from "@/pages/ArticleDetail";
import { ARTICLES } from "@/data/articles";

const REDIRECTS: Record<string, string> = {
  "valgusnaya-deformaciya-stopy-kosточка-lechenie-novosibirsk": "valgusnaya-deformaciya-stopy-kostochka-lechenie-novosibirsk",
};

export const Route = createFileRoute("/articles/$slug")({
  beforeLoad: ({ params }) => {
    const to = REDIRECTS[params.slug];
    if (to) throw redirect({ to: "/articles/$slug", params: { slug: to }, statusCode: 301 });
  },
  loader: ({ params }) => {
    if (!ARTICLES.some((a) => a.slug === params.slug)) throw notFound();
  },
  component: Page,
});

function Page() {
  return <Layout><ArticleDetail /></Layout>;
}
