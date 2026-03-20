import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth handled externally; placeholder submit
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="w-full max-w-[420px] rounded-xl p-10"
          style={{ backgroundColor: "#151941" }}
        >
          <h1
            className="font-outfit font-bold text-center mb-8"
            style={{
              fontSize: 48,
              background: "linear-gradient(90deg,#fff 0%,#8081d8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Login
          </h1>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6"
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="login-email"
                className="font-inter font-bold text-white text-[20px]"
              >
                Email
              </label>
              <div
                className="flex items-center"
                style={{ borderBottom: "1px solid #fff" }}
              >
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-white font-inter text-[16px] py-2 outline-none placeholder:text-white/40"
                  placeholder="your@email.com"
                  data-ocid="login.input"
                />
                <Mail size={20} className="text-white/60 shrink-0" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="login-password"
                className="font-inter font-bold text-white text-[20px]"
              >
                Password
              </label>
              <div
                className="flex items-center"
                style={{ borderBottom: "1px solid #fff" }}
              >
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-white font-inter text-[16px] py-2 outline-none placeholder:text-white/40"
                  placeholder="••••••••"
                  data-ocid="login.input"
                />
                <Lock size={20} className="text-white/60 shrink-0" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full font-inter font-bold text-[20px] text-white rounded-lg transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "#8081d8",
                height: 40,
                cursor: "pointer",
              }}
              data-ocid="login.submit_button"
            >
              Login
            </button>

            {/* Links */}
            <div className="flex justify-between font-inter text-[15px]">
              <Link
                to="/register"
                className="text-white/70 hover:text-white transition-colors"
                data-ocid="login.link"
              >
                Create an account
              </Link>
              <Link
                to="/reset-password"
                className="text-white/70 hover:text-white transition-colors"
                data-ocid="login.link"
              >
                Forget password?
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
