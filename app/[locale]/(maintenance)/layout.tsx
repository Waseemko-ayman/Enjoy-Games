export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#f4e3cd] min-h-screen flex items-center justify-center">
      {children}
    </main>
  );
}
