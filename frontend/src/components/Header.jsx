export default function Header() {
  return (
    <header className="bg-black text-blue-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">Aartech Solonics Ltd</h1>
        <nav className="hidden md:flex gap-6 text-lg">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </nav>
      </div>
    </header>
  );
}
