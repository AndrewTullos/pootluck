import { PotluckApp } from "@/components/potluck-app"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center bg-background px-4 py-10 sm:py-16">
      <div className="w-full max-w-md flex flex-col gap-8">
        <header className="flex flex-col gap-1 text-center relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Potluck Planner
          </h1>
          <p className="text-sm text-muted-foreground">
            Cat Baby Shower 
          </p>       
          <p className="text-sm text-muted-foreground">
            Theme: Around the World (Dish from any culture)
          </p>
        </header>
        <PotluckApp />
      </div>
    </main>
  )
}
