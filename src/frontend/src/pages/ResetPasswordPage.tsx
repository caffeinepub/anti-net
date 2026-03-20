import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match! Please try again.");
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="w-full max-w-[400px] rounded-lg p-5 relative"
          style={{ backgroundColor: "#151941" }}
        >
          <h1 className="font-outfit font-bold text-white text-[26px] mb-5">
            Reset Your Password
          </h1>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* New password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="new-password"
                className="font-inter text-white text-left"
              >
                New Password:
              </label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full rounded font-inter text-white text-[16px] px-3 py-[10px] outline-none"
                style={{
                  backgroundColor: "rgba(99, 88, 189, 0.2)",
                  border: "1px solid #000",
                }}
                placeholder="New password"
                data-ocid="reset.input"
              />
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm-password"
                className="font-inter text-white text-left"
              >
                Re-enter Your New Password:
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded font-inter text-white text-[16px] px-3 py-[10px] outline-none"
                style={{
                  backgroundColor: "rgba(99, 88, 189, 0.2)",
                  border: "1px solid #000",
                }}
                placeholder="Re-enter password"
                data-ocid="reset.input"
              />
            </div>

            <button
              type="submit"
              className="w-full font-inter font-bold text-white rounded transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "#8081d8",
                height: 40,
                cursor: "pointer",
              }}
              data-ocid="reset.submit_button"
            >
              Submit
            </button>
          </form>

          {/* Success popup */}
          {showSuccess && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              data-ocid="reset.success_state"
            >
              <div
                className="font-inter font-semibold text-white text-center rounded-lg px-6 py-4 shadow-lg"
                style={{ backgroundColor: "#4CAF50" }}
              >
                Successfully changed your password!
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
