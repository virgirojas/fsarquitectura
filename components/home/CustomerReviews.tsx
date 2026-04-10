import connectMongo from "@/lib/mongodb";
import Review from "@/models/Review";

export default async function CustomerReviews() {
  await connectMongo();
  const reviews = await Review.find({ isActive: true }).sort({ createdAt: -1 });

  if (reviews.length === 0) return null;

  return (
    <section className="bg-slate-950 py-20 sm:py-32 border-t border-brand-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="inline-block border-l-4 border-brand-primary pl-4 py-1 text-sm font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 bg-white/5 pr-4 backdrop-blur-sm">
            Testimonios Reales
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review._id.toString()}
              className="flex flex-col bg-white/5 p-8 border-t-4 border-brand-primary shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="mb-6 flex space-x-1 text-brand-primary text-xl">
                {"★".repeat(review.rating)}
                <span className="text-white/20">{"★".repeat(5 - review.rating)}</span>
              </div>
              <p className="flex-grow text-base italic leading-relaxed text-slate-300 mb-8">
                &quot;{review.reviewText}&quot;
              </p>
              <div className="mt-auto border-l-2 border-brand-primary pl-4">
                <p className="font-bold uppercase tracking-wider text-white">
                  {review.clientName}
                </p>
                <p className="text-xs font-bold text-brand-secondary uppercase tracking-widest mt-1">
                  Experiencia Triunfo
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
