import { getCurrentSession } from "@/actions/auth";
import { getAllProduct } from "@/sanity/lib/client";
import SalesCampaingnBanner from "./components/layout/SalesCampaingnBanner";
import ProductGrid from "./components/product/ProductGrid";

export default async function Home() {
  const { user } = await getCurrentSession();
  const products = await getAllProduct();
  return (
    <div>
      <SalesCampaingnBanner />
      <section className="container mx-auto py-8">
        <ProductGrid products={products}/>
      </section>
    </div>
  );
}
