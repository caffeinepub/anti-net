import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          {/* Left — decorative illustration */}
          <div
            className="w-full md:w-[46%] rounded-lg min-h-[400px] flex items-center justify-center"
            style={{ backgroundColor: "#151941" }}
          >
            {/* Stylised businesswoman silhouette built with CSS */}
            <div
              className="flex flex-col items-center gap-4 select-none"
              aria-hidden="true"
            >
              {/* Head */}
              <div
                className="rounded-full"
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: "rgba(128,129,216,0.35)",
                  border: "2px solid rgba(128,129,216,0.6)",
                }}
              />
              {/* Body */}
              <div
                className="rounded-t-3xl"
                style={{
                  width: 120,
                  height: 160,
                  background:
                    "linear-gradient(180deg, rgba(128,129,216,0.4) 0%, rgba(99,88,189,0.2) 100%)",
                  border: "2px solid rgba(128,129,216,0.4)",
                }}
              >
                {/* Arms */}
                <div className="relative h-full">
                  <div
                    className="absolute top-6 -left-8 rounded-full"
                    style={{
                      width: 32,
                      height: 10,
                      backgroundColor: "rgba(128,129,216,0.35)",
                      transform: "rotate(20deg)",
                    }}
                  />
                  <div
                    className="absolute top-6 -right-8 rounded-full"
                    style={{
                      width: 32,
                      height: 10,
                      backgroundColor: "rgba(128,129,216,0.35)",
                      transform: "rotate(-20deg)",
                    }}
                  />
                </div>
              </div>
              {/* Legs */}
              <div className="flex gap-3">
                <div
                  className="rounded-b-xl"
                  style={{
                    width: 44,
                    height: 80,
                    backgroundColor: "rgba(99,88,189,0.3)",
                    border: "1px solid rgba(128,129,216,0.3)",
                  }}
                />
                <div
                  className="rounded-b-xl"
                  style={{
                    width: 44,
                    height: 80,
                    backgroundColor: "rgba(99,88,189,0.3)",
                    border: "1px solid rgba(128,129,216,0.3)",
                  }}
                />
              </div>
              <p className="text-white/40 font-inter text-xs mt-2 text-center px-6">
                Empowering digital safety
              </p>
            </div>
          </div>

          {/* Right — text content */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            <h1
              className="font-outfit font-bold text-white"
              style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
            >
              About Us
            </h1>
            <div
              className="font-roboto text-white leading-[1.72] space-y-5"
              style={{
                fontSize: "clamp(16px, 2vw, 24px)",
                lineHeight: "27.5px",
              }}
            >
              <p>
                Welcome to <strong>Anti-Net</strong>, a platform dedicated to
                creating a safer and more respectful digital world. Our mission
                is to create a safe and respectful online space, free from the
                harmful effects of cyberbullying, where everyone can express
                themselves without fear of harassment or abuse.
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
                At <strong>Anti-Net</strong>, your security is our top priority.
                Beyond protection, we're committed to educating users about
                cyberbullying, offering resources to empower individuals, and
                fostering a community rooted in kindness and respect.
              </p>
              <p>
                Join us as we stand strong against hate and make the internet a
                better place for everyone.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
