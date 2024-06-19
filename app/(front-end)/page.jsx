import CategoryList from "@/components/frontend/CategoryList";
import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";
import { getData } from "@/lib/getData";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const categories = await getData("categories");
  const trainings = await getData("trainings");

  const filteredCategories = categories.filter(
    (category) => category.products && category.products.length > 0
  );
  const filteredCommunityTrainings = trainings.length > 0;

  // const session = await getServerSession(authOptions);
  // console.log(session?.user);

  return (
    <div className="min-h-screen">
      <Hero />
      <MarketList />

      {filteredCategories.map((category, i) => (
        <div key={i} className="py-4">
          <CategoryList category={category} />
        </div>
      ))}

      {filteredCommunityTrainings && (
        <div className="py-4">
          <CommunityTrainings />
        </div>
      )}

      <h2 className=" text-4xl">Welcome to snooker ecommerce</h2>
      <Link href="/register-farmer" className="my-4 underline">
        Become a farmer/Vendor/Supplier
      </Link>
    </div>
  );
}
