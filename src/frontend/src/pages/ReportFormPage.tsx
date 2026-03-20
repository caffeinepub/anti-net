import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BULLYING_TYPES = [
  "Cyberstalking",
  "Harassment",
  "Doxxing",
  "Impersonation",
  "Trolling",
  "Hate Speech",
  "Outing (Revealing Private Info)",
];

const PLATFORMS = [
  "Facebook",
  "Instagram",
  "Twitter/X",
  "TikTok",
  "Reddit",
  "YouTube",
  "WhatsApp",
  "Snapchat",
  "Discord",
];

const inputStyle: React.CSSProperties = {
  backgroundColor: "#151941",
  border: "1px solid #000",
  color: "#fff",
  height: 50,
  borderRadius: 6,
  padding: "0 12px",
  width: "100%",
  fontSize: 16,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: 36,
  cursor: "pointer",
};

export default function ReportFormPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [bullyType, setBullyType] = useState("");
  const [platform, setPlatform] = useState("");
  const [datetime, setDatetime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validateAndSubmit = () => {
    if (!message.trim() || !bullyType || !platform || !datetime) {
      alert("Please fill in all required fields before submitting.");
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-12">
        <h1
          className="font-outfit font-extrabold text-white capitalize mb-10"
          style={{ fontSize: 35 }}
        >
          Report your incident
        </h1>

        {/* ── Section 1: Incident Details ── */}
        <section className="mb-10" aria-labelledby="section1-heading">
          <h2
            id="section1-heading"
            className="font-inter font-bold text-white text-[20px] mb-5"
          >
            1. Incident Details
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Textarea */}
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={6}
                className="w-full font-inter text-white text-[20px] rounded outline-none resize-none p-4"
                style={{
                  backgroundColor: "#151941",
                  border: "1px solid #000",
                  minHeight: 160,
                  color: "#fff",
                }}
                data-ocid="report.textarea"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label htmlFor="bully-type" className="sr-only">
                  Type of Bullying
                </label>
                <select
                  id="bully-type"
                  value={bullyType}
                  onChange={(e) => setBullyType(e.target.value)}
                  style={selectStyle}
                  data-ocid="report.select"
                >
                  <option value="" style={{ backgroundColor: "#151941" }}>
                    Select Type of Bullying
                  </option>
                  {BULLYING_TYPES.map((t) => (
                    <option
                      key={t}
                      value={t}
                      style={{ backgroundColor: "#151941" }}
                    >
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="platform-select" className="sr-only">
                  Platform
                </label>
                <select
                  id="platform-select"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  style={selectStyle}
                  data-ocid="report.select"
                >
                  <option value="" style={{ backgroundColor: "#151941" }}>
                    Select Platform
                  </option>
                  {PLATFORMS.map((p) => (
                    <option
                      key={p}
                      value={p}
                      style={{ backgroundColor: "#151941" }}
                    >
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="incident-datetime" className="sr-only">
                  Date and Time
                </label>
                <input
                  id="incident-datetime"
                  type="datetime-local"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  style={{
                    ...inputStyle,
                    colorScheme: "dark",
                  }}
                  data-ocid="report.input"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Upload Evidence ── */}
        <section className="mb-10" aria-labelledby="section2-heading">
          <h2
            id="section2-heading"
            className="font-inter font-bold text-white text-[20px] mb-5"
          >
            2. Upload Evidence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Screenshots */}
            <div
              className="flex flex-col gap-2 rounded p-4"
              style={{ backgroundColor: "#151941", border: "1px solid #000" }}
            >
              <span className="font-inter text-white text-[15px] font-semibold">
                Screenshots/Images
              </span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="font-inter text-white/70 text-[13px] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-white file:text-[13px] file:cursor-pointer"
                style={{ height: 50 }}
                aria-label="Upload Screenshots or Images"
                data-ocid="report.upload_button"
              />
              <span className="font-inter text-white/50 text-[12px]">
                .Jpg, .Png
              </span>
            </div>

            {/* Documents */}
            <div
              className="flex flex-col gap-2 rounded p-4"
              style={{ backgroundColor: "#151941", border: "1px solid #000" }}
            >
              <span className="font-inter text-white text-[15px] font-semibold">
                Documents
              </span>
              <input
                type="file"
                accept=".pdf"
                className="font-inter text-white/70 text-[13px] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-white file:text-[13px] file:cursor-pointer"
                style={{ height: 50 }}
                aria-label="Upload Documents"
                data-ocid="report.upload_button"
              />
              <span className="font-inter text-white/50 text-[12px]">.Pdf</span>
            </div>

            {/* Videos */}
            <div
              className="flex flex-col gap-2 rounded p-4"
              style={{ backgroundColor: "#151941", border: "1px solid #000" }}
            >
              <span className="font-inter text-white text-[15px] font-semibold">
                Videos
              </span>
              <input
                type="file"
                accept=".mp4"
                className="font-inter text-white/70 text-[13px] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-white file:text-[13px] file:cursor-pointer"
                style={{ height: 50 }}
                aria-label="Upload Videos"
                data-ocid="report.upload_button"
              />
              <span className="font-inter text-white/50 text-[12px]">Mp4</span>
            </div>
          </div>
        </section>

        {/* ── Section 3: Report Submission ── */}
        <section aria-labelledby="section3-heading">
          <h2
            id="section3-heading"
            className="font-inter font-bold text-white text-[20px] mb-5"
          >
            3. Report Submission
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={validateAndSubmit}
              className="font-inter font-bold italic text-white rounded px-6 py-3 transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#8081d8", cursor: "pointer" }}
              data-ocid="report.primary_button"
            >
              Submit report anonymously
            </button>
            <button
              type="button"
              onClick={validateAndSubmit}
              className="font-inter font-bold italic text-white rounded px-6 py-3 transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#8081d8", cursor: "pointer" }}
              data-ocid="report.secondary_button"
            >
              Submit report
            </button>
          </div>
        </section>
      </main>

      {/* Success popup */}
      {showSuccess && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          data-ocid="report.success_state"
        >
          <div
            className="font-inter font-semibold text-white text-center rounded-lg px-6 py-4 shadow-lg"
            style={{ backgroundColor: "#4CAF50" }}
          >
            Your report has been successfully submitted.
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
