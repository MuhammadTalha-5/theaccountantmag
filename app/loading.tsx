import Container from "@/components/ui/Container";
import { ArticleListSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <Container className="pt-6">
      <Skeleton className="aspect-[4/5] w-full rounded-2xl sm:aspect-[16/10] lg:aspect-[21/10]" />
      <div className="mt-16">
        <Skeleton className="mb-8 h-9 w-56" />
        <ArticleListSkeleton count={6} />
      </div>
    </Container>
  );
}
