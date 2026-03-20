import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ReportID = bigint;
export interface CyberbullyingReport {
    id: ReportID;
    status: ReportStatus;
    isAnonymous: boolean;
    description: string;
    timestamp: bigint;
    reporter: Principal;
}
export enum ReportStatus {
    resolved = "resolved",
    underReview = "underReview",
    rejected = "rejected"
}
export interface backendInterface {
    getAllReports(): Promise<Array<CyberbullyingReport>>;
    getReport(id: ReportID): Promise<CyberbullyingReport>;
    getReportsByStatus(status: ReportStatus): Promise<Array<CyberbullyingReport>>;
    submitReport(description: string, isAnonymous: boolean): Promise<ReportID>;
    updateReportStatus(id: ReportID, newStatus: ReportStatus): Promise<void>;
}
