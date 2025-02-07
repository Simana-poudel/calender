import TopHeading from "@/components/TopHeading";
import FestivalList from "@/components/upcommingFestival/FestivalList";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 w-full max-w-[1200px]">
        <TopHeading />
        <FestivalList />
      </main>
    </div>
  );
}
