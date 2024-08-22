import { ThemeToggler } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="border-2 h-screen max-w-[1280px] mx-auto">
      <div className="flex items-start justify-between">

        <div className="text-4xl font-semibold">Khata</div>

        <ThemeToggler />
      </div>
    </main>
  );
}
