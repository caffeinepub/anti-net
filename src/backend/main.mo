import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";

actor {
  type ReportID = Nat;

  type ReportStatus = {
    #underReview;
    #resolved;
    #rejected;
  };

  type CyberbullyingReport = {
    id : ReportID;
    reporter : Principal;
    description : Text;
    isAnonymous : Bool;
    timestamp : Int;
    status : ReportStatus;
  };

  module CyberbullyingReport {
    public func compare(report1 : CyberbullyingReport, report2 : CyberbullyingReport) : Order.Order {
      Nat.compare(report1.id, report2.id);
    };
  };

  var nextReportId = 0;
  let reports = Map.empty<ReportID, CyberbullyingReport>();

  public shared ({ caller }) func submitReport(description : Text, isAnonymous : Bool) : async ReportID {
    let report : CyberbullyingReport = {
      id = nextReportId;
      reporter = caller;
      description;
      isAnonymous;
      timestamp = 0; // Should be set by front-end
      status = #underReview;
    };
    reports.add(nextReportId, report);
    nextReportId += 1;
    report.id;
  };

  public shared ({ caller }) func updateReportStatus(id : ReportID, newStatus : ReportStatus) : async () {
    switch (reports.get(id)) {
      case (null) { Runtime.trap("Report not found") };
      case (?report) {
        let updatedReport = { report with status = newStatus };
        reports.add(id, updatedReport);
      };
    };
  };

  public query ({ caller }) func getReport(id : ReportID) : async CyberbullyingReport {
    switch (reports.get(id)) {
      case (null) { Runtime.trap("Report not found") };
      case (?report) { report };
    };
  };

  public query ({ caller }) func getAllReports() : async [CyberbullyingReport] {
    reports.values().toArray().sort();
  };

  public query ({ caller }) func getReportsByStatus(status : ReportStatus) : async [CyberbullyingReport] {
    reports.values().toArray().sort().filter(
      func(report) {
        report.status == status
      }
    );
  };
};
