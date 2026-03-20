import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#151941" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row justify-between gap-10">
        {/* Left */}
        <div className="flex flex-col gap-2">
          <span className="text-[24px] font-bold font-inter">Anti-Net</span>
          <span className="text-[15px] font-semibold font-inter">
            How We Safeguard Your Digital World
          </span>
          <span className="text-[20px] font-bold font-inter">
            Your online activity &amp; privacy covered
          </span>
          {/* Social icons */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:opacity-75 transition-opacity"
              data-ocid="footer.link"
            >
              <Facebook size={28} className="text-[#1877F2]" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:opacity-75 transition-opacity"
              data-ocid="footer.link"
            >
              <Instagram size={28} className="text-[#E1306C]" />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="hover:opacity-75 transition-opacity"
              data-ocid="footer.link"
            >
              <Twitter size={28} className="text-white" />
            </a>
          </div>
        </div>

        {/* Right — Contact */}
        <div className="flex flex-col gap-3">
          <span className="text-[24px] font-bold font-inter">Contact</span>
          <div className="flex items-center gap-3">
            <Phone size={22} />
            <span className="text-sm font-inter">0123456789</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={22} />
            <span className="text-sm font-inter">rinkysit086@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="text-center py-5 text-[14px] font-inter text-white"
        style={{ backgroundColor: "rgb(59, 14, 143)" }}
      >
        Built with purpose by Rinky Kumari — for a kinder digital world © 2024
        All rights reserved.
      </div>
    </footer>
  );
}
