import { createFileRoute, notFound } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import ArticleDetail from "@/pages/ArticleDetail";
import { ARTICLES } from "@/data/articles";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    if (!ARTICLES.some((a) => a.slug === params.slug)) throw notFound();
  },
  component: Page,
});

function Page() {
  return <Layout><ArticleDetail /></Layout>;
}
