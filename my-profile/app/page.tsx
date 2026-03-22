export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFE26F] p-4 sm:p-8 md:p-12 lg:p-24 flex flex-col items-center justify-start font-sans text-black">
      
      {/* Header / Nav area */}
      <nav className="w-full max-w-7xl flex justify-between items-center mb-12 flex-wrap gap-4">
        <div className="text-2xl md:text-4xl font-black uppercase tracking-tighter bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2">
          YUNA.
        </div>
        <div className="flex gap-4">
          <a href="#" className="bg-[#FF90E8] border-4 border-black font-black uppercase px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all">
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col justify-center items-center text-center space-y-8 pt-8 lg:pt-16">
        
        {/* Center - Hero Text */}
        <div className="bg-white w-full border-4 border-black p-8 sm:p-12 md:p-16 lg:p-24 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[1.1] uppercase mb-8 tracking-tight">
            Hello,<br className="hidden sm:block" /> I'm Yuna Jo
          </h1>
          <div className="inline-block bg-[#90E8FF] px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1 mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase">
              Arts & Culture Management
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl lg:text-3xl font-bold border-b-8 border-black pb-8 leading-relaxed max-w-4xl mx-auto">
            상명대학교 문화예술경영전공 22학번.<br />
            예술과 문화를 사랑하고, 세상을 새롭게 디자인하는 기획자<br className="hidden sm:block" /> 조유나입니다. 
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          {['Management', 'Culture', 'Art', 'Planning'].map((skill, i) => (
            <span key={i} className="bg-[#FFC900] border-4 border-black px-8 py-3 text-2xl md:text-3xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:rotate-3 transition-transform cursor-default">
              {skill}
            </span>
          ))}
        </div>

      </div>

      {/* SocialLinks & Extra */}
      <div className="w-full max-w-7xl mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        <a href="#" className="block bg-[#90E8FF] border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center items-center group hover:bg-white hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all">
          <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 decoration-4 group-hover:underline underline-offset-8">Github</h3>
          <p className="font-bold text-xl md:text-2xl mt-2">@yunajo_github</p>
        </a>

        <a href="#" className="block bg-[#FF90E8] border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center items-center group hover:bg-white hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all">
          <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 decoration-4 group-hover:underline underline-offset-8">Instagram</h3>
          <p className="font-bold text-xl md:text-2xl mt-2">@yunajo_insta</p>
        </a>

      </div>

      <footer className="w-full max-w-7xl text-center mt-24 mb-6 border-t-8 border-black pt-12">
         <p className="text-xl md:text-3xl font-black uppercase">© 2026 Yuna Jo. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
