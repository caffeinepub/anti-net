import {
  BookOpen,
  FileSearch,
  Globe,
  MessageSquareWarning,
  Shield,
  ShieldOff,
  UserX,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const FEATURES = [
  {
    icon: <ShieldOff size={40} />,
    title: "IP Blocking",
    desc: "Offenders are blocked at the source, preventing them from re-entering the platform.",
  },
  {
    icon: <Shield size={40} />,
    title: "Real-Time Abuse Detection",
    desc: "Our platform actively monitors and detects cyberbullying to ensure a safe environment for all users.",
  },
  {
    icon: <UserX size={40} />,
    title: "Account Recreation Prevention",
    desc: "Advanced technology stops banned users from creating new accounts.",
  },
  {
    icon: <BookOpen size={40} />,
    title: "Education & Support",
    desc: "Access resources and guidance to stand strong against online abuse.",
  },
  {
    icon: <MessageSquareWarning size={40} />,
    title: "Anonymous Reporting",
    desc: "Report incidents without revealing your identity, ensuring your safety while seeking help.",
  },
  {
    icon: <FileSearch size={40} />,
    title: "Evidence Upload",
    desc: "Upload screenshots, chat logs, or other evidence to support your reports.",
  },
  {
    icon: <Globe size={40} />,
    title: "Report Tracking",
    desc: "Track the status of submitted reports — from Under Review to Resolved.",
  },
  {
    icon: <Users size={40} />,
    title: "Community Support",
    desc: "Connect with others and access community-driven resources for online safety.",
  },
];

export default function FeaturesPage() {
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
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <div
              className="rounded-full"
              style={{ width: 60, height: 3, backgroundColor: "#8081d8" }}
            />
          </div>
          <h1 className="font-inter font-extrabold text-white text-[34px] mb-3">
            Features
          </h1>
          <p className="font-inter text-white/60 text-[17px] max-w-lg mx-auto">
            Powerful tools built to protect every user online.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 rounded-md p-6 border-l-2 transition-all duration-200 hover:border-[#8081d8]/40"
              style={{
                backgroundColor: "#151941",
                borderLeftColor: "rgba(128,129,216,0.6)",
              }}
              data-ocid={`features.item.${i + 1}`}
            >
              <div style={{ color: "#8081d8" }}>{f.icon}</div>
              <h2 className="font-inter font-extrabold text-white text-[22px] leading-tight">
                {f.title}
              </h2>
              <p className="font-inter text-white/80 text-[14px] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
