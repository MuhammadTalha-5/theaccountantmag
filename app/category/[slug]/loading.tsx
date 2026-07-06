import Container from "@/components/ui/Container";
import { ArticleListSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <Container className="pt-10">
      <div className="max-w-3xl space-y-4 border-b-2 border-ink-950/10 pb-8">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </div>
      <div className="mt-10">
        <ArticleListSkeleton count={6} />
      </div>
    </Container>
  );
}
