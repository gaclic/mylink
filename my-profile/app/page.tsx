export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-[#0a0a0a] text-[#171717] dark:text-[#ededed] font-sans">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Profile Header */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">조유나</h1>
            <div className="h-1 w-12 bg-black dark:bg-white mx-auto mt-4"></div>
          </div>
          
          <div className="space-y-1 text-lg text-gray-600 dark:text-gray-400 font-medium">
            <p>상명대학교</p>
            <p>문화예술경영전공 22학번</p>
          </div>
        </section>

        {/* Simple Divider */}
        <div className="py-4">
          <p className="text-sm text-gray-400 italic">Arts & Culture Management</p>
        </div>

        {/* Footer */}
        <footer className="pt-12 text-xs text-gray-400 tracking-widest uppercase">
          <p>© 2026 Yuna Jo. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}
