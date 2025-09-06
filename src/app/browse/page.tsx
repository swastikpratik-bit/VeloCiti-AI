import { BrowseHero } from "@/src/components/browse";
import { BrowseClient } from "@/src/components/browse/browse-client";


export default async function BrowsePage() {
  return (
    <main className="min-h-screen">
      <BrowseHero />
      <BrowseClient />
    </main>
  );
}
