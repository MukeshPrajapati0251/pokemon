import "@/app/globals.css"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="p-4 font-sans">
        <main className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Pokémon Search App</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
