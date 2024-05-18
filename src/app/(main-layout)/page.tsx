import { Categories } from "@/components/Home/categories/Categories";
import { Slider } from "@/components/Home/slider/Slider";
import { CategoriesSection } from "@/components/Home/categories-section/CategoriesSection";
export default async function Home() {

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
