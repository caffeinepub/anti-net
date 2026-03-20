import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ReportPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-6">
        <h1 className="font-outfit font-extrabold text-white text-[48px] mb-4 text-center">
          Report Incidence
        </h1>
        <p className="font-inter text-white/60 text-xl text-center">
          Coming soon — report submission form under construction.
        </p>
      </main>
      <Footer />
    </div>
  );
}
