import { BookOpen, Shield, ShieldOff, UserX } from "lucide-react";
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
    icon: <Shield size={40} />,
    title: "Anonymous Reporting",
    desc: "Report incidents without revealing your identity, ensuring your safety while seeking help.",
  },
  {
    icon: <Shield size={40} />,
    title: "Evidence Upload",
    desc: "Upload screenshots, chat logs, or other evidence to support your reports.",
  },
  {
    icon: <Shield size={40} />,
    title: "Report Tracking",
    desc: "Track the status of submitted reports — from Under Review to Resolved.",
  },
  {
    icon: <Shield size={40} />,
    title: "Community Support",
    desc: "Connect with others and access community-driven resources for online safety.",
  },
];

export default function FeaturesPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
        <h1 className="text-center font-inter font-extrabold text-white text-[34px] mb-12">
          Features
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 rounded-md p-6"
              style={{ backgroundColor: "#151941" }}
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
