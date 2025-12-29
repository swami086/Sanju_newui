export default function OfficeSpaceSolutions() {
  const benefits = [
    "100% Verified Properties",
    "24hr Response Guarantee",
    "0% Hidden Fees"
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-8 md:px-16">
      <div className="flex flex-col gap-6 mb-16">
        <h2 className="text-3xl font-bold text-theme-primary leading-tight font-manrope">
          Office Space Solutions by Gentle Space
        </h2>
        <p className="text-base text-theme-secondary font-normal leading-relaxed font-manrope max-w-3xl">
          We offer a range of office space solutions tailored to meet the diverse needs of businesses in Bengaluru. Our services are designed to provide flexibility, convenience, and value, ensuring you find the perfect space to thrive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-8 rounded-lg bg-theme-card border border-theme transition-colors duration-300"
          >
            <h3 className="text-base font-medium text-theme-primary font-manrope text-center">
              {benefit}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}