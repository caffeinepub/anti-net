import { HttpAgent } from "@icp-sdk/core/agent";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { loadConfig } from "../config";
import { useActor } from "../hooks/useActor";
import { StorageClient } from "../utils/StorageClient";

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

async function uploadFileToStorage(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const config = await loadConfig();
  const agent = new HttpAgent({ host: config.backend_host });
  if (config.backend_host?.includes("localhost")) {
    await agent.fetchRootKey().catch(() => {});
  }
  const storageClient = new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent,
  );
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { hash } = await storageClient.putFile(bytes, onProgress);
  return storageClient.getDirectURL(hash);
}

export default function ReportFormPage() {
  const navigate = useNavigate();
  const { actor } = useActor();

  const [message, setMessage] = useState("");
  const [bullyType, setBullyType] = useState("");
  const [platform, setPlatform] = useState("");
  const [datetime, setDatetime] = useState("");

  const screenshotsRef = useRef<HTMLInputElement>(null);
  const documentsRef = useRef<HTMLInputElement>(null);
  const videosRef = useRef<HTMLInputElement>(null);

  const [screenshotProgress, setScreenshotProgress] = useState<number | null>(
    null,
  );
  const [documentProgress, setDocumentProgress] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const doSubmit = async (isAnonymous: boolean) => {
    if (!message.trim() || !bullyType || !platform || !datetime) {
      alert("Please fill in all required fields before submitting.");
      return;
    }
    if (!actor) {
      alert("Connecting to the backend… please wait a moment and try again.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // Upload all selected files in parallel
      const uploadTasks: Promise<string>[] = [];

      const screenshotFiles = screenshotsRef.current?.files;
      const documentFiles = documentsRef.current?.files;
      const videoFiles = videosRef.current?.files;

      if (screenshotFiles && screenshotFiles.length > 0) {
        for (const f of Array.from(screenshotFiles)) {
          uploadTasks.push(
            uploadFileToStorage(f, (pct) => setScreenshotProgress(pct)),
          );
        }
      }
      if (documentFiles && documentFiles.length > 0) {
        for (const f of Array.from(documentFiles)) {
          uploadTasks.push(
            uploadFileToStorage(f, (pct) => setDocumentProgress(pct)),
          );
        }
      }
      if (videoFiles && videoFiles.length > 0) {
        for (const f of Array.from(videoFiles)) {
          uploadTasks.push(
            uploadFileToStorage(f, (pct) => setVideoProgress(pct)),
          );
        }
      }

      const uploadedUrls = await Promise.all(uploadTasks);

      // Build full description including file URLs
      let fullDescription = `Type: ${bullyType}\nPlatform: ${platform}\nDate/Time: ${datetime}\n\n${message.trim()}`;
      if (uploadedUrls.length > 0) {
        fullDescription += `\n\nEvidence Files:\n${uploadedUrls.map((u, i) => `${i + 1}. ${u}`).join("\n")}`;
      }

      const id = await actor.submitReport(fullDescription, isAnonymous);
      setReportId(id.toString());
      setShowSuccess(true);
      setTimeout(() => navigate("/"), 5000);
    } catch (err: any) {
      setErrorMsg(err?.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setScreenshotProgress(null);
      setDocumentProgress(null);
      setVideoProgress(null);
    }
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
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the incident in detail..."
                rows={6}
                className="w-full font-inter text-white text-[16px] rounded outline-none resize-none p-4"
                style={{
                  backgroundColor: "#151941",
                  border: "1px solid #000",
                  minHeight: 160,
                  color: "#fff",
                }}
                data-ocid="report.textarea"
              />
            </div>

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
                  style={{ ...inputStyle, colorScheme: "dark" }}
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
              <span className="font-inter text-white text-[15px] font-semibold flex items-center gap-2">
                <Upload size={15} /> Screenshots/Images
              </span>
              <input
                ref={screenshotsRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                className="font-inter text-white/70 text-[13px] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-white file:text-[13px] file:cursor-pointer"
                style={{ height: 50 }}
                aria-label="Upload Screenshots or Images"
                data-ocid="report.upload_button"
              />
              <span className="font-inter text-white/50 text-[12px]">
                .Jpg, .Png
              </span>
              {screenshotProgress !== null && (
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${screenshotProgress}%`,
                      backgroundColor: "#8081d8",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Documents */}
            <div
              className="flex flex-col gap-2 rounded p-4"
              style={{ backgroundColor: "#151941", border: "1px solid #000" }}
            >
              <span className="font-inter text-white text-[15px] font-semibold flex items-center gap-2">
                <Upload size={15} /> Documents
              </span>
              <input
                ref={documentsRef}
                type="file"
                accept=".pdf"
                multiple
                className="font-inter text-white/70 text-[13px] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-white file:text-[13px] file:cursor-pointer"
                style={{ height: 50 }}
                aria-label="Upload Documents"
                data-ocid="report.upload_button"
              />
              <span className="font-inter text-white/50 text-[12px]">.Pdf</span>
              {documentProgress !== null && (
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${documentProgress}%`,
                      backgroundColor: "#8081d8",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Videos */}
            <div
              className="flex flex-col gap-2 rounded p-4"
              style={{ backgroundColor: "#151941", border: "1px solid #000" }}
            >
              <span className="font-inter text-white text-[15px] font-semibold flex items-center gap-2">
                <Upload size={15} /> Videos
              </span>
              <input
                ref={videosRef}
                type="file"
                accept=".mp4"
                multiple
                className="font-inter text-white/70 text-[13px] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-white file:text-[13px] file:cursor-pointer"
                style={{ height: 50 }}
                aria-label="Upload Videos"
                data-ocid="report.upload_button"
              />
              <span className="font-inter text-white/50 text-[12px]">Mp4</span>
              {videoProgress !== null && (
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${videoProgress}%`,
                      backgroundColor: "#8081d8",
                    }}
                  />
                </div>
              )}
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
              onClick={() => doSubmit(true)}
              disabled={isSubmitting}
              className="font-inter font-bold italic text-white rounded px-6 py-3 transition-opacity hover:opacity-85 disabled:opacity-50 flex items-center gap-2"
              style={{
                backgroundColor: "#8081d8",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
              data-ocid="report.primary_button"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              Submit report anonymously
            </button>
            <button
              type="button"
              onClick={() => doSubmit(false)}
              disabled={isSubmitting}
              className="font-inter font-bold italic text-white rounded px-6 py-3 transition-opacity hover:opacity-85 disabled:opacity-50 flex items-center gap-2"
              style={{
                backgroundColor: "#8081d8",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
              data-ocid="report.secondary_button"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              Submit report
            </button>
          </div>

          {isSubmitting && (
            <p
              className="mt-4 font-inter text-white/60 text-sm"
              data-ocid="report.loading_state"
            >
              Uploading evidence and submitting report — please wait…
            </p>
          )}

          {errorMsg && (
            <p
              className="mt-4 font-inter text-red-400 text-sm"
              data-ocid="report.error_state"
            >
              {errorMsg}
            </p>
          )}
        </section>
      </main>

      {/* Success popup */}
      {showSuccess && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
          data-ocid="report.success_state"
        >
          <div
            className="font-inter text-white text-center rounded-xl px-8 py-6 shadow-2xl max-w-sm w-full mx-4"
            style={{ backgroundColor: "#151941", border: "1px solid #8081d8" }}
          >
            <CheckCircle2
              size={40}
              className="mx-auto mb-3"
              style={{ color: "#4CAF50" }}
            />
            <p className="font-semibold text-lg mb-2">Report Submitted!</p>
            <p className="text-white/70 text-sm mb-3">
              Your report has been securely recorded.
            </p>
            {reportId && (
              <div
                className="rounded-lg px-4 py-2 mb-3"
                style={{ backgroundColor: "#010922" }}
              >
                <p className="text-white/50 text-xs mb-1">Your Report ID:</p>
                <p className="font-bold text-[#8081d8] font-mono text-sm break-all">
                  {reportId}
                </p>
              </div>
            )}
            <p className="text-white/40 text-xs">
              Redirecting to home in 5 seconds…
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
