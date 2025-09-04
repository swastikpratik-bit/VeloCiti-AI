import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { AddCarForm } from "./add-car";
import { GenerateImage } from "./generate-image";
import { auth } from "@/src/auth";
import { redirect } from "next/navigation";

export default async function SellPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold mb-4">
              Sell Your <span className="text-cyan">Car</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create professional car listings with AI auto-fill and generate
              stunning images
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="add-car" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="glass border border-cyan/20">
                <TabsTrigger
                  value="add-car"
                  className="data-[state=active]:bg-cyan data-[state=active]:text-black"
                >
                  Add Car
                </TabsTrigger>
                <TabsTrigger
                  value="generate-image"
                  className="data-[state=active]:bg-cyan data-[state=active]:text-black"
                >
                  Generate Image
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="add-car" className="w-full">
              <AddCarForm />
            </TabsContent>

            <TabsContent value="generate-image" className="w-full">
              <GenerateImage />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
