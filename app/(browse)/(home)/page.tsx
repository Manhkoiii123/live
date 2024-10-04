import Results, {
  ResultsSkeleton,
} from "@/app/(browse)/(home)/_component/Results";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto text-white">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
