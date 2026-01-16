import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Sam Fabrics',
  description: 'Learn about the story behind Sam Fabrics. A legacy of providing timeless elegance and premium quality unstitched suits to women in Pakistan.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 text-brand-black">Our Story</h1>
        <div className="w-20 md:w-24 h-1 bg-gold-500 mx-auto mb-6 md:mb-8"></div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light px-4">
          Saim Ethnic was born from a desire to bring timeless elegance to the modern Pakistani woman. 
          We believe that every fabric tells a story, and our collections are curated to help you write yours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20">
        <div className="order-2 md:order-1 relative px-4 md:px-0">
          <div className="absolute inset-0 border-2 border-gold-500 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"></div>
          <img 
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070" 
            alt="Fabric texture" 
            className="relative z-10 w-full shadow-xl"
            loading="lazy"
          />
        </div>
        <div className="order-1 md:order-2 px-4 md:px-0">
          <h2 className="font-serif text-2xl md:text-3xl mb-3 md:mb-4">Craftsmanship & Quality</h2>
          <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
            We source only the finest materials—pure silks, premium chiffons, and intricate jacquards. 
            Our unstitched collections are designed to provide versatility, allowing you to tailor each piece to your unique style.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            From the bustling markets of Faisalabad to your doorstep, we ensure every thread meets our high standards of luxury.
          </p>
        </div>
      </div>

      <div className="bg-brand-black text-white p-8 md:p-12 text-center rounded-sm mx-4 md:mx-0">
        <h2 className="font-serif text-2xl md:text-3xl mb-3 md:mb-4 text-gold-500">The Saim Ethnic Promise</h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base">
          To provide exceptional quality, unparalleled customer service, and designs that make you feel confident and beautiful.
        </p>
      </div>
    </div>
  );
}
