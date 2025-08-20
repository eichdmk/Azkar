function Footer() {
  return (
    <footer className="bg-brown text-beige text-center py-5 text-sm">
      <div className="container mx-auto">
        <p>📿 Поминание Аллаха — лучшее дело верующих</p>
        <p className="mt-1 opacity-80">© {new Date().getFullYear()} Азкары</p>
      </div>
    </footer>
  );
}

export default Footer;