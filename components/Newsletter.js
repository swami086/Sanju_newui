export default function Newsletter() {
  return (
    <section className="bg-white section-spacing">
      <div className="container-wide text-center">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-[52px] font-medium font-poppins text-[#020603] mb-8 leading-tight">Stay informed on workspace trends</h2>
          <p className="text-lg text-black/60 mb-12 font-inter">Get updates on new listings and insights delivered to your inbox.</p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-6">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-[#f2f2f2] border border-black/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-black/10 transition-all font-inter"
            />
            <button className="bg-[#020603] text-white px-8 py-4 rounded-2xl font-bold hover:bg-neutral-800 transition-all shadow-lg">Subscribe</button>
          </form>
          <p className="text-xs text-black/40 font-inter">By clicking Subscribe you're confirming that you agree with our Terms and Conditions.</p>
        </div>
        
        <div className="aspect-[21/9] bg-neutral-200 rounded-[32px] border border-black/5 overflow-hidden">
          <img src="/images/section-placeholder.png" className="w-full h-full object-cover grayscale opacity-90" alt="Workspace inspiration" />
        </div>
      </div>
    </section>
  );
}