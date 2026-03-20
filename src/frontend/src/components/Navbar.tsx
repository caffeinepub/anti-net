import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type NavLink = {
  label: string;
  to: string;
  scrollId?: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about", scrollId: "about" },
  { label: "Features", to: "/#features", scrollId: "features" },
  { label: "Report", to: "/#report", scrollId: "report" },
  { label: "Register", to: "/register" },
];

function setColor(el: EventTarget, color: string) {
  (el as HTMLElement).style.color = color;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollLink = (
    e: React.MouseEvent,
    link: NavLink,
    closeMenu?: () => void,
  ) => {
    if (!link.scrollId) return;
    e.preventDefault();
    closeMenu?.();

    const scrollToSection = () => {
      const el = document.getElementById(link.scrollId!);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname === "/") {
      scrollToSection();
    } else {
      navigate("/");
      setTimeout(scrollToSection, 100);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#151941" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="animate-slide-right flex items-center gap-2"
          data-ocid="nav.link"
        >
          <img
            src="/Anti-Net_Logo.jpg"
            alt="Anti-Net Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-[26px] font-bold text-white font-inter">
            Anti-Net
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-0"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link, i) => {
            const active = link.scrollId
              ? false
              : location.pathname === link.to;
            return link.scrollId ? (
              <a
                key={link.to}
                href={link.to}
                data-ocid="nav.link"
                className="animate-slide-top px-4 py-2 text-[22px] font-medium font-inter transition-colors duration-200"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  ["--delay" as string]: `${(i + 1) * 0.2}s`,
                }}
                onClick={(e) => handleScrollLink(e, link)}
                onMouseEnter={(e) => setColor(e.currentTarget, "#8081d8")}
                onMouseLeave={(e) => setColor(e.currentTarget, "#fff")}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className="animate-slide-top px-4 py-2 text-[22px] font-medium font-inter transition-colors duration-200"
                style={{
                  color: active ? "#8081d8" : "#fff",
                  ["--delay" as string]: `${(i + 1) * 0.2}s`,
                }}
                onMouseEnter={(e) => setColor(e.currentTarget, "#8081d8")}
                onMouseLeave={(e) =>
                  setColor(e.currentTarget, active ? "#8081d8" : "#fff")
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/login"
            data-ocid="nav.primary_button"
            className="animate-slide-top ml-3 px-4 py-2 text-[20px] font-semibold font-inter text-white rounded-lg transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "#8081d8",
              ["--delay" as string]: `${(NAV_LINKS.length + 1) * 0.2}s`,
            }}
          >
            Login
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          data-ocid="nav.toggle"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden absolute top-16 right-4 rounded-xl shadow-lg py-3 px-4 flex flex-col gap-1 z-50 w-44"
          style={{ backgroundColor: "#051129" }}
        >
          {NAV_LINKS.map((link) =>
            link.scrollId ? (
              <a
                key={link.to}
                href={link.to}
                data-ocid="nav.link"
                className="py-2 text-[20px] font-inter text-center text-white transition-colors duration-200"
                style={{ textDecoration: "none" }}
                onClick={(e) => handleScrollLink(e, link, () => setOpen(false))}
                onMouseEnter={(e) => setColor(e.currentTarget, "#8081d8")}
                onMouseLeave={(e) => setColor(e.currentTarget, "#fff")}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                data-ocid="nav.link"
                className="py-2 text-[20px] font-inter text-center text-white transition-colors duration-200"
                onMouseEnter={(e) => setColor(e.currentTarget, "#8081d8")}
                onMouseLeave={(e) => setColor(e.currentTarget, "#fff")}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            data-ocid="nav.primary_button"
            className="mt-1 py-2 text-[20px] font-semibold font-inter text-center text-white rounded-lg transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#8081d8" }}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
