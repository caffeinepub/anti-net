import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  LogIn,
  Shield,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { CyberbullyingReport, ReportStatus } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function formatTimestamp(ts: bigint): string {
  try {
    // ICP timestamps are in nanoseconds
    const ms = Number(ts / 1_000_000n);
    return new Date(ms).toLocaleString();
  } catch {
    return "Unknown";
  }
}

function truncate(str: string, n: number): string {
  return str.length > n ? `${str.slice(0, n)}…` : str;
}

function StatusBadge({ status }: { status: ReportStatus | string }) {
  const s = String(status);
  const map: Record<string, { label: string; color: string }> = {
    pending: { label: "Pending", color: "#6b7280" },
    underReview: { label: "Under Review", color: "#d97706" },
    resolved: { label: "Resolved", color: "#16a34a" },
    rejected: { label: "Rejected", color: "#dc2626" },
  };
  const entry = map[s] ?? { label: s, color: "#6b7280" };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-semibold font-inter"
      style={{
        backgroundColor: `${entry.color}22`,
        color: entry.color,
        border: `1px solid ${entry.color}55`,
      }}
    >
      {entry.label}
    </span>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl px-5 py-4"
      style={{ backgroundColor: "#151941", border: "1px solid #ffffff10" }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#8081d822" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-white font-bold text-2xl font-outfit">{value}</p>
        <p className="text-white/50 text-sm font-inter">{label}</p>
      </div>
    </div>
  );
}

function ReportRow({ report }: { report: CyberbullyingReport }) {
  const [expanded, setExpanded] = useState(false);
  const queryClient = useQueryClient();
  const { actor } = useActor();

  const updateMutation = useMutation({
    mutationFn: async (newStatus: ReportStatus) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateReportStatus(report.id, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
    },
  });

  const idx = Number(report.id);

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded((v) => !v)}
        data-ocid={`admin.item.${idx}`}
      >
        <TableCell className="font-mono text-white/60 text-sm">
          #{String(report.id)}
        </TableCell>
        <TableCell className="text-white/70 text-sm">
          {formatTimestamp(report.timestamp)}
        </TableCell>
        <TableCell>
          <StatusBadge status={report.status} />
        </TableCell>
        <TableCell className="text-white/80 text-sm">
          {truncate(report.description, 80)}
        </TableCell>
        <TableCell className="text-white/40">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </TableCell>
      </TableRow>

      {expanded && (
        <TableRow>
          <TableCell colSpan={5} className="p-0">
            <div
              className="px-6 py-5 rounded-b-lg"
              style={{
                backgroundColor: "#0d1335",
                borderTop: "1px solid #ffffff10",
              }}
              data-ocid="admin.panel"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-white/40 text-xs font-inter mb-1">
                    Full Description
                  </p>
                  <p className="text-white text-sm font-inter whitespace-pre-wrap">
                    {report.description}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-white/40 text-xs font-inter mb-1">
                      Reporter
                    </p>
                    <p className="text-white/70 text-sm font-mono">
                      {report.isAnonymous
                        ? "Anonymous"
                        : report.reporter.toString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-inter mb-2">
                      Update Status
                    </p>
                    <div className="flex items-center gap-3">
                      <Select
                        defaultValue={String(report.status)}
                        onValueChange={(val) =>
                          updateMutation.mutate(val as ReportStatus)
                        }
                        disabled={updateMutation.isPending}
                      >
                        <SelectTrigger
                          className="w-40 font-inter text-sm"
                          style={{
                            backgroundColor: "#151941",
                            border: "1px solid #ffffff20",
                            color: "#fff",
                          }}
                          data-ocid="admin.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            backgroundColor: "#151941",
                            border: "1px solid #ffffff20",
                          }}
                        >
                          <SelectItem
                            value="underReview"
                            className="text-white hover:bg-white/10"
                          >
                            Under Review
                          </SelectItem>
                          <SelectItem
                            value="resolved"
                            className="text-white hover:bg-white/10"
                          >
                            Resolved
                          </SelectItem>
                          <SelectItem
                            value="rejected"
                            className="text-white hover:bg-white/10"
                          >
                            Rejected
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {updateMutation.isPending && (
                        <Loader2
                          size={16}
                          className="animate-spin text-white/50"
                        />
                      )}
                      {updateMutation.isSuccess && (
                        <CheckCircle2 size={16} style={{ color: "#16a34a" }} />
                      )}
                    </div>
                    {updateMutation.isError && (
                      <p className="text-red-400 text-xs mt-1 font-inter">
                        {(updateMutation.error as Error)?.message ||
                          "Update failed"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function LoginScreen() {
  const { login, isLoggingIn } = useInternetIdentity();
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#010922" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center"
        style={{ backgroundColor: "#151941", border: "1px solid #8081d833" }}
        data-ocid="admin.modal"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "#8081d822" }}
        >
          <Shield size={32} style={{ color: "#8081d8" }} />
        </div>
        <h1 className="font-outfit font-extrabold text-white text-2xl mb-3">
          Admin Access
        </h1>
        <p className="font-inter text-white/60 text-sm mb-8 leading-relaxed">
          Log in to view and manage submitted reports. Only authorised
          administrators can access this area.
        </p>
        <Button
          onClick={() => login()}
          disabled={isLoggingIn}
          className="w-full font-inter font-semibold text-white rounded-lg py-3 transition-opacity hover:opacity-85 disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#8081d8" }}
          data-ocid="admin.primary_button"
        >
          {isLoggingIn ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <LogIn size={18} />
          )}
          {isLoggingIn ? "Signing in…" : "Login with Internet Identity"}
        </Button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const {
    data: reports,
    isLoading,
    isError,
    error,
  } = useQuery<CyberbullyingReport[]>({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReports();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: 1,
  });

  if (isInitializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#010922" }}
      >
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: "#8081d8" }}
        />
      </div>
    );
  }

  if (!identity) {
    return <LoginScreen />;
  }

  const totalReports = reports?.length ?? 0;
  const underReview =
    reports?.filter((r) => String(r.status) === "underReview").length ?? 0;
  const resolved =
    reports?.filter((r) => String(r.status) === "resolved").length ?? 0;
  const rejected =
    reports?.filter((r) => String(r.status) === "rejected").length ?? 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#010922" }}
    >
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Shield size={28} style={{ color: "#8081d8" }} />
          <h1 className="font-outfit font-extrabold text-white text-3xl">
            Admin Dashboard
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<Users size={18} style={{ color: "#8081d8" }} />}
            label="Total Reports"
            value={totalReports}
          />
          <StatCard
            icon={<Clock size={18} style={{ color: "#d97706" }} />}
            label="Under Review"
            value={underReview}
          />
          <StatCard
            icon={<CheckCircle2 size={18} style={{ color: "#16a34a" }} />}
            label="Resolved"
            value={resolved}
          />
          <StatCard
            icon={<XCircle size={18} style={{ color: "#dc2626" }} />}
            label="Rejected"
            value={rejected}
          />
        </div>

        {/* Reports Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: "#151941", border: "1px solid #ffffff10" }}
          data-ocid="admin.table"
        >
          <div
            className="px-6 py-4 border-b"
            style={{ borderColor: "#ffffff10" }}
          >
            <h2 className="font-inter font-semibold text-white text-lg">
              All Reports
            </h2>
          </div>

          {isLoading || actorFetching ? (
            <div className="p-6 space-y-3" data-ocid="admin.loading_state">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-12 w-full rounded"
                  style={{ backgroundColor: "#0d1335" }}
                />
              ))}
            </div>
          ) : isError ? (
            <div
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
              data-ocid="admin.error_state"
            >
              <AlertTriangle
                size={36}
                className="mb-3"
                style={{ color: "#dc2626" }}
              />
              <p className="font-inter font-semibold text-white mb-1">
                {(error as Error)?.message?.toLowerCase().includes("admin") ||
                (error as Error)?.message?.toLowerCase().includes("access")
                  ? "You don't have admin access"
                  : "Failed to load reports"}
              </p>
              <p className="font-inter text-white/50 text-sm">
                {(error as Error)?.message || "Please try again later."}
              </p>
            </div>
          ) : !reports || reports.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
              data-ocid="admin.empty_state"
            >
              <Shield
                size={36}
                className="mb-3 opacity-30"
                style={{ color: "#8081d8" }}
              />
              <p className="font-inter text-white/50">
                No reports have been submitted yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "#ffffff10" }}>
                  <TableHead className="text-white/40 font-inter text-xs">
                    Report ID
                  </TableHead>
                  <TableHead className="text-white/40 font-inter text-xs">
                    Date Submitted
                  </TableHead>
                  <TableHead className="text-white/40 font-inter text-xs">
                    Status
                  </TableHead>
                  <TableHead className="text-white/40 font-inter text-xs">
                    Description
                  </TableHead>
                  <TableHead className="w-8" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report, _i) => (
                  <ReportRow key={String(report.id)} report={report} />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
