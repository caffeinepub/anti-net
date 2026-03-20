import { Lock, Shield, ShieldOff, Users } from "lucide-react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const STATS = [
  { icon: <Shield size={20} />, label: "500+ Reports Handled" },
  { icon: <Lock size={20} />, label: "100% Anonymous" },
  { icon: <ShieldOff size={20} />, label: "Zero Tolerance" },
];

const TRUST_POINTS = [
  {
    icon: <Lock size={18} />,
    title: "End-to-End Security",
    desc: "All data is encrypted in transit and at rest. We never share your information.",
  },
  {
    icon: <Shield size={18} />,
    title: "Complete Anonymity",
    desc: "You can report incidents without revealing your identity. Your privacy is guaranteed.",
  },
  {
    icon: <Users size={18} />,
    title: "Community-Driven",
    desc: "Our platform is built on community trust and a shared commitment to a kinder internet.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* Page heading */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-3">
            <div
              className="rounded-full"
              style={{ width: 60, height: 3, backgroundColor: "#8081d8" }}
            />
          </div>
          <h1
            className="font-outfit font-extrabold text-white"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            About Us
          </h1>
          <p className="mt-2 font-inter text-white/60 text-[16px] max-w-lg mx-auto">
            We're on a mission to make the internet safer, kinder, and more
            respectful for everyone.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-stretch mb-16">
          {/* Left — stats panel */}
          <div
            className="w-full md:w-[46%] rounded-xl min-h-[400px] flex flex-col justify-center gap-5 px-8 py-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,88,189,0.35) 0%, rgba(21,25,65,0.8) 60%, rgba(1,9,34,0.95) 100%)",
              border: "1px solid rgba(128,129,216,0.2)",
            }}
          >
            <p className="font-inter font-extrabold text-white/50 text-xs tracking-widest uppercase mb-2">
              Our Impact
            </p>
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-4 rounded-lg px-4 py-4"
                style={{
                  backgroundColor: "rgba(128,129,216,0.12)",
                  border: "1px solid rgba(128,129,216,0.2)",
                }}
              >
                <span style={{ color: "#8081d8" }}>{s.icon}</span>
                <span className="font-inter font-semibold text-white text-[17px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right — text content */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div
              className="font-roboto text-white/80 leading-relaxed space-y-5"
              style={{
                fontSize: "clamp(15px, 1.7vw, 20px)",
                lineHeight: "1.7",
              }}
            >
              <p>
                Welcome to <strong className="text-white">Anti-Net</strong>, a
                platform dedicated to creating a safer and more respectful
                digital world. Our mission is to create a safe and respectful
                online space, free from the harmful effects of cyberbullying,
                where everyone can express themselves without fear of harassment
                or abuse.
              </p>
              <p>
                We believe that everyone deserves a space to express themselves
                freely without fear of harassment or abuse. With
                state-of-the-art technology, including IP blocking and account
                recreation prevention, we ensure that offenders are stopped in
                their tracks and users can interact in a safe and supportive
                environment.
              </p>
              <p>
                At <strong className="text-white">Anti-Net</strong>, your
                security is our top priority. Beyond protection, we're committed
                to educating users about cyberbullying, offering resources to
                empower individuals, and fostering a community rooted in
                kindness and respect.
              </p>
              <p>
                Join us as we stand strong against hate and make the internet a
                better place for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Why Trust Us section */}
        <div
          className="rounded-xl p-8"
          style={{
            backgroundColor: "#151941",
            border: "1px solid rgba(128,129,216,0.2)",
          }}
        >
          <div className="flex justify-center mb-3">
            <div
              className="rounded-full"
              style={{ width: 40, height: 3, backgroundColor: "#8081d8" }}
            />
          </div>
          <h2 className="text-center font-inter font-extrabold text-white text-[26px] mb-8">
            Why Trust Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TRUST_POINTS.map((tp) => (
              <div key={tp.title} className="flex flex-col gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(128,129,216,0.2)" }}
                >
                  <span style={{ color: "#8081d8" }}>{tp.icon}</span>
                </div>
                <h3 className="font-inter font-bold text-white text-[17px]">
                  {tp.title}
                </h3>
                <p className="font-inter text-white/70 text-[14px] leading-relaxed">
                  {tp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
