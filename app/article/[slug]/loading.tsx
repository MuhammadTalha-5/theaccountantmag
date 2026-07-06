import Container from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ArticleLoading() {
  return (
    <Container className="pt-10">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <Skeleton className="mx-auto h-3 w-24" />
        <Skeleton className="mx-auto h-10 w-full" />
        <Skeleton className="mx-auto h-10 w-4/5" />
        <Skeleton className="mx-auto h-5 w-2/3" />
        <div className="flex items-center justify-center gap-3 pt-4">
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-8 w-40" />
        </div>
      </div>
      <Skeleton className="mx-auto mt-10 aspect-[16/9] max-w-5xl rounded-2xl" />
      <div className="mx-auto mt-12 max-w-2xl space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className={i % 4 === 3 ? "h-4 w-2/3" : "h-4 w-full"} />
        ))}
      </div>
    </Container>
  );
}
