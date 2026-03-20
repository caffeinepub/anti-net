import { BookOpen, Shield, ShieldOff, UserX } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PLATFORMS = [
  { name: "Facebook", color: "#1877F2", href: "https://www.facebook.com/" },
  { name: "Instagram", color: "#E1306C", href: "https://www.instagram.com/" },
  { name: "YouTube", color: "#FF0000", href: "https://m.youtube.com/" },
  { name: "X", color: "#ffffff", href: "https://x.com/" },
  { name: "TikTok", color: "#69C9D0", href: "https://www.tiktok.com/" },
  { name: "WhatsApp", color: "#25D366", href: "tel:8340471746" },
];

const FEATURES = [
  {
    icon: <ShieldOff size={36} />,
    title: "IP Blocking",
    desc: "Offenders are blocked at the source, preventing them from re-entering the platform.",
  },
  {
    icon: <Shield size={36} />,
    title: "Real-Time Abuse Detection",
    desc: "Our platform actively monitors and detects cyberbullying to ensure a safe environment for all users.",
  },
  {
    icon: <UserX size={36} />,
    title: "Account Recreation Prevention",
    desc: "Advanced technology stops banned users from creating new accounts.",
  },
  {
    icon: <BookOpen size={36} />,
    title: "Education & Support",
    desc: "Access resources and guidance to stand strong against online abuse.",
  },
];

const NODES = [
  { id: "n1", top: "15%", left: "20%", size: 52 },
  { id: "n2", top: "10%", left: "55%", size: 40 },
  { id: "n3", top: "45%", left: "70%", size: 48 },
  { id: "n4", top: "65%", left: "30%", size: 44 },
  { id: "n5", top: "35%", left: "40%", size: 56 },
  { id: "n6", top: "75%", left: "65%", size: 36 },
];

export default function HomePage() {
  const logosRef = useRef<HTMLDivElement>(null);

  const scrollToLogos = () => {
    logosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="home"
        className="w-full min-h-[550px] flex items-center"
        style={{ backgroundColor: "#010922" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 w-full flex flex-col md:flex-row items-center gap-10">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-6">
            <h1
              className="font-outfit font-extrabold text-white leading-none capitalize"
              style={{ fontSize: "clamp(36px, 6vw, 87px)" }}
            >
              Creating a Safer Digital Space.
            </h1>
            <p
              className="font-roboto font-medium text-white"
              style={{ fontSize: "clamp(16px, 2vw, 24px)" }}
            >
              Empowering voices, silencing hate – your digital shield against
              cyberbullying
            </p>
            <button
              type="button"
              onClick={scrollToLogos}
              className="w-fit px-6 py-3 rounded-lg font-roboto font-bold text-[20px] text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#8081d8" }}
              data-ocid="hero.primary_button"
            >
              View Connections
            </button>
          </div>

          {/* Right — decorative illustration */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-full max-w-[480px] h-64 md:h-80 lg:h-96 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 40%, rgba(128,129,216,0.25) 0%, rgba(99,88,189,0.12) 50%, transparent 80%)",
                border: "1px solid rgba(128,129,216,0.2)",
                position: "relative",
              }}
            >
              {NODES.map((node) => (
                <div
                  key={node.id}
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    top: node.top,
                    left: node.left,
                    width: node.size,
                    height: node.size,
                    backgroundColor: "rgba(99,88,189,0.3)",
                    border: "1px solid rgba(128,129,216,0.4)",
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: node.size * 0.4,
                      height: node.size * 0.4,
                      backgroundColor: "rgba(128,129,216,0.7)",
                    }}
                  />
                </div>
              ))}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Network decoration</title>
                <line
                  x1="25%"
                  y1="20%"
                  x2="57%"
                  y2="14%"
                  stroke="rgba(128,129,216,0.3)"
                  strokeWidth="1"
                />
                <line
                  x1="57%"
                  y1="14%"
                  x2="72%"
                  y2="47%"
                  stroke="rgba(128,129,216,0.3)"
                  strokeWidth="1"
                />
                <line
                  x1="72%"
                  y1="47%"
                  x2="42%"
                  y2="38%"
                  stroke="rgba(128,129,216,0.3)"
                  strokeWidth="1"
                />
                <line
                  x1="42%"
                  y1="38%"
                  x2="33%"
                  y2="67%"
                  stroke="rgba(128,129,216,0.3)"
                  strokeWidth="1"
                />
                <line
                  x1="33%"
                  y1="67%"
                  x2="67%"
                  y2="77%"
                  stroke="rgba(128,129,216,0.3)"
                  strokeWidth="1"
                />
                <line
                  x1="25%"
                  y1="20%"
                  x2="42%"
                  y2="38%"
                  stroke="rgba(128,129,216,0.2)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── WE'RE WORKING WITH ── */}
      <section
        id="logos"
        ref={logosRef}
        className="w-full py-14"
        style={{ backgroundColor: "#010922" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-center text-white font-inter font-extrabold text-[34px] mb-10">
            We're Working With
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("tel") ? undefined : "_blank"}
                rel="noreferrer"
                data-ocid="logos.link"
                className="flex items-center justify-center rounded-lg transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "rgba(99,88,189,0.2)",
                  height: "121px",
                  minWidth: "0",
                }}
              >
                <span
                  className="font-inter font-bold text-lg"
                  style={{ color: p.color }}
                >
                  {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="w-full py-14"
        style={{ backgroundColor: "#010922" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-center text-white font-inter font-extrabold text-[34px] mb-10">
            About
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            {/* Left */}
            <div
              className="flex-1 rounded-xl min-h-[320px] flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,88,189,0.35) 0%, rgba(21,25,65,0.8) 60%, rgba(1,9,34,0.9) 100%)",
                border: "1px solid rgba(128,129,216,0.2)",
              }}
            >
              <div className="text-center px-8">
                <div
                  className="mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(128,129,216,0.25)" }}
                >
                  <Shield size={40} style={{ color: "#8081d8" }} />
                </div>
                <p className="text-white/60 font-inter text-sm">
                  Social Media Platforms &amp; Network of Users
                </p>
              </div>
            </div>
            {/* Right */}
            <div className="flex-1 flex flex-col justify-center gap-5">
              <div>
                <p className="font-inter font-extrabold text-white text-sm tracking-widest uppercase mb-2">
                  OUR VISION
                </p>
                <h3
                  className="font-outfit font-extrabold text-white capitalize leading-tight"
                  style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
                >
                  Your safety is our priority; your voice deserves protection.
                </h3>
              </div>
              <div>
                <p className="font-inter font-extrabold text-white text-sm tracking-widest uppercase mb-2">
                  OUR MISSION
                </p>
                <p
                  className="font-roboto font-medium text-white"
                  style={{
                    fontSize: "clamp(16px, 2vw, 24px)",
                    lineHeight: "1.5",
                  }}
                >
                  Creating a safer internet for everyone — because respect and
                  security should never be compromised.
                </p>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-[10px] font-roboto font-bold text-[20px] text-white hover:opacity-85 transition-opacity"
                  style={{ backgroundColor: "#8081d8" }}
                  data-ocid="about.primary_button"
                >
                  More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        className="w-full py-14"
        style={{ backgroundColor: "#010922" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-center text-white font-inter font-extrabold text-[34px] mb-10">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="flex flex-col gap-4 rounded-md p-6"
                style={{ backgroundColor: "#151941" }}
                data-ocid={`features.item.${i + 1}`}
              >
                <div style={{ color: "#8081d8" }}>{f.icon}</div>
                <h3 className="font-inter font-extrabold text-white text-[24px] leading-tight">
                  {f.title}
                </h3>
                <p className="font-inter text-white/80 text-[14px] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Link
              to="/features"
              className="px-6 py-3 rounded-[10px] font-roboto font-bold text-[20px] text-white hover:opacity-85 transition-opacity"
              style={{ backgroundColor: "#8081d8" }}
              data-ocid="features.primary_button"
            >
              More Features
            </Link>
          </div>
        </div>
      </section>

      {/* ── REPORT INCIDENCE ── */}
      <section
        id="report"
        className="w-full py-14"
        style={{ backgroundColor: "#010922" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-center text-white font-inter font-extrabold text-[34px] mb-10">
            Report Incidence
          </h2>
          <div
            className="rounded-md p-8 shadow-card"
            style={{ backgroundColor: "#151941" }}
          >
            <h3 className="font-inter font-bold text-white text-[22px] mb-4">
              Let's Work Together
            </h3>
            <p className="font-inter text-white/80 text-[16px] leading-relaxed text-justify mb-8">
              the collaborative effort between users and the platform to address
              and prevent cyberbullying. By reporting incidents, users become
              active participants in creating a safer online community, while
              the platform ensures these reports are handled with care and
              efficiency. It reflects the idea that solving this problem
              requires teamwork, trust, and shared responsibility to make the
              digital world a better place for everyone.
            </p>
            <div className="flex justify-end">
              <Link
                to="/report"
                className="px-6 py-3 rounded-[10px] font-roboto font-bold text-[20px] text-white hover:opacity-85 transition-opacity"
                style={{ backgroundColor: "#8081d8" }}
                data-ocid="report.primary_button"
              >
                Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll to top */}
      <a
        href="#home"
        className="fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-lg text-white text-xl transition-opacity hover:opacity-80"
        style={{ backgroundColor: "rgba(99,88,189,0.2)" }}
        aria-label="Back to top"
        data-ocid="scrolltop.button"
      >
        ↑
      </a>
    </div>
  );
}
