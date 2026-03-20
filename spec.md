# Anti-Net

## Current State
Multi-page cyberbullying reporting app with React frontend. Has a report form page (ReportFormPage.tsx) that previously tried to submit to Firebase. No backend storage for reports or evidence files. No admin view.

## Requested Changes (Diff)

### Add
- Backend: Report data model (id, timestamp, reporterName, isAnonymous, incidentType, platform, description, incidentDate, evidenceFileIds[])
- Backend: submitReport() public function
- Backend: getReports() admin-only function
- Backend: getReportById() admin-only function
- Blob storage for evidence files (images, videos, documents)
- Admin dashboard page (/admin) -- login-protected, shows all reports in a table, click to expand and view details + evidence files
- Evidence file upload integrated into report form using blob storage

### Modify
- ReportFormPage.tsx: replace Firebase submission with Caffeine backend submitReport() + blob storage upload for files
- App.tsx: add /admin route
- Navbar: add subtle Admin link

### Remove
- Firebase SDK references and config from report page

## Implementation Plan
1. Select blob-storage + authorization components
2. Generate Motoko backend with Report type, submitReport, getReports, getReportById
3. Update ReportFormPage to upload files to blob storage and submit report to backend
4. Create AdminPage with login, report list table, report detail view with evidence previews
5. Wire routing and navbar
