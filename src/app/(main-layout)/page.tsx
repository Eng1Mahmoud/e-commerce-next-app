import { Categories } from "@/components/Home/categories/Categories";
import { Slider } from "@/components/Home/slider/Slider";
import { CategoriesSection } from "@/components/Home/categories-section/CategoriesSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export default async function Home() {
  const session = await getServerSession(authOptions)
/*   console.log(session) */
  return (
    <div>
     <Slider/>
     <Categories/>
     <CategoriesSection categorie="خضروات"/>
      <CategoriesSection categorie="فواكه"/>
      <CategoriesSection categorie="ورقيات"/>
      <CategoriesSection categorie="تمور"/>
    
    </div>
  );
}
