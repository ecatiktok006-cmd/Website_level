export default function CoreFour() {
  const products = [
    {
      id: "sea-salt-dark-chocolate",
      title: "Sea Salt Dark Chocolate",
      description: "The original icon. 70% dark chocolate and a hint of Maldon sea salt.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHVAtPuUHmxRG4fsKtS0bOp034IztbMmmavUWozmA5LrkSKJfqFmrH_5gpFlBfHmFvx0n2OfhqMhQxxO6hKRZWSWZS_mNUsyBj8WaZV5G-qOEcl5goTUkbDnw6CyP-4PGPY79sVrZUzQGkhMDg32gj_ZuoHfJUVF-VuWx3ws-3u2HncI34WqetQcjFkRnTx4kLGjXqYh4iS4BUQVURzPaz0OFMXnEm0IWg-Ywa4zp0SfdwdINK6AFrhoEb68Dp9V0q0sgyRqOTy7k",
      imgAlt: "Studio food photography of a single 'Sea Salt Dark Chocolate' cookie."
    },
    {
      id: "brown-butter-bourbon",
      title: "Brown Butter Bourbon",
      description: "Rich brown butter, toasted pecans, and a hint of Kentucky bourbon.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPYgnjWBQJi-NElBHU3IJvxFSC9DkJk441Yzzl85gCtCxL732ON3CWlUXf3sx3w9CZXV64Er98Y49rEC0bvqU0YvaSD_aKe2-kuXCpjpcgSHrIc2aIy8TL54zJNf8SX1FAwPcojbCqAAZLdBcIOc_s0l4PSsmPllq5BeyDExKOxx3AgpzJC9RUz1Gp4dq6UqWIPFyCbCrOOEiYamPgV2EmnOXgg4WsWrwSj9xGqTJio0xxBC8E2I0YrZQ-6cbBpJEZEAXzFO8_Yhw",
      imgAlt: "Studio food photography of a 'Brown Butter Bourbon' cookie."
    },
    {
      id: "white-chocolate-macadamia",
      title: "White Chocolate Macadamia",
      description: "Creamy white chocolate chunks and buttery toasted macadamias.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdJp0fkI6LQMKJM57CO8Of-TUAynwsaTErFoXi5ObEJE5WWfwAkQlbeB9aXC-LpUSOUjEufuPsGvSH_SOVxvVUjelZb9YRWvCILw2XnqjTzZokIoGNlQhutm5qEj2fQCKJ6aN6AYhNUDne0ncjvtQGX9WS-3dBXGsZeKGfl7ps517coY2nIvI6VyqikQ2bTqojSzR66bLSx4ealO4ocJLWGsrvYrrTuyQLOD-QFs6Up3vZ5CD2zs25SNLLJydGH4t_E0jG6E67Nh8",
      imgAlt: "Studio food photography of a 'White Chocolate Macadamia' cookie."
    },
    {
      id: "double-cocoa-espresso",
      title: "Double Cocoa Espresso",
      description: "Valrhona cocoa base with a kick of single-origin espresso.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2T4SwG4HBp8eXbKRvmJtu-F9IYs6MylS52zZ_BXwi-E3AYexTn9E6KYQ4PS4pQ3C8M8vb5WUi3HArO8ZgRQTT0bEzoDhVx4KSGdEy4YXSD60xEZCEHv0FtisRoYloUdADKPDNIzzOvjliukk3NcwwF6MHeyZnz9JknxT57Y1ODS7BSEwbm1bA4e_9Wrr47oa-2OECmq1XijXo9xiKgKlUtIcJPSybgqu4vXAEXA09QXSK7UaHrJjqOW22FDhVWCO4X6HAzxe2EXM",
      imgAlt: "Studio food photography of a 'Double Cocoa Espresso' cookie."
    }
  ]

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="core-four">
      <div className="flex flex-col items-center text-center gap-stack-md mb-stack-lg">
        <h2 className="text-headline-lg-mobile md:text-headline-lg text-primary">The Core Four</h2>
        <p className="text-body-md text-on-surface-variant max-w-2xl">
          Our signature collection. Perfectly baked, irresistibly gooey, and dangerously decadent.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mt-16">
        {products.map((product) => (
          <article key={product.id} className="flex flex-col group cursor-pointer">
            <div className="relative w-full aspect-square bg-surface-container-low rounded-lg overflow-hidden mb-stack-md shadow-ambient shadow-ambient-hover transition-all duration-500">
              <img 
                alt={product.imgAlt} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                src={product.imgUrl}
              />
            </div>
            <div className="flex flex-col gap-2 px-2">
              <h3 className="text-2xl text-primary font-medium font-[family-name:theme('fontFamily.headline-md')]">{product.title}</h3>
              <p className="text-on-surface-variant text-sm font-[family-name:theme('fontFamily.body-md')] leading-relaxed">{product.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
