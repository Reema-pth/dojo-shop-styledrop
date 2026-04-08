import CategoryItem from "./CategoryItem";

const CategoriesSection = () => {
  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-24">
      <h2 className="text-black text-5xl font-normal tracking-[1.56px] max-sm:text-4xl mb-12">
        Nos Collections
      </h2>
      <div className="flex justify-between flex-wrap gap-y-10">
        <CategoryItem
          categoryTitle="Vêtements"
          image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=700&fit=crop&q=80"
          link="clothing"
        />
        <CategoryItem
          categoryTitle="Accessoires"
          image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=700&fit=crop&q=80"
          link="accessories"
        />
        <CategoryItem
          categoryTitle="Papeterie"
          image="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&h=700&fit=crop&q=80"
          link="stationery"
        />
        <CategoryItem
          categoryTitle="Limited Edition"
          image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=700&fit=crop&q=80"
          link="limited-edition"
        />
      </div>
    </div>
  );
};
export default CategoriesSection;
