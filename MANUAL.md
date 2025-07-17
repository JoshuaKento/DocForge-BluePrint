# DocForge-BluePrint Usage Manual

This guide explains how to generate documentation packages with **DocForge-BluePrint**. It assumes the application is already running.

## 1. Open the Home Page

Navigate to the application's root URL in your browser. You should see a form with several fields describing your project.

The page also features a sidebar with a stepper and a live preview panel that updates as you type.

## 2. Fill in Project Details

Provide the following information:

- **Project Name** – name of the project to include in all documents.
- **Problem** – short summary of the problem the project solves.
- **Persona** – who the project is for.
- **KPI** – key performance indicator you want to track.
- **Author Name** – name shown in the generated files.
- **Author Email** – optional email displayed in docs.
- **License** – select MIT, Apache‑2.0, or GPL‑3.0.
- **GitHub Token** – optional token for future GitHub integration.
- **Language** – choose Japanese or English for output.
- **Generate PDF** – optional check box (PDF generation is not implemented yet).

Click **Next** to review your inputs.

## 3. Generate the Package

On the next step, press **Generate**. Your browser will download `docs.zip` containing the following files:

- `product-brief.md`
- `adr/0001-architecture-baseline.md`
- `README.md`
- `.github/workflows/ci.yml`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `threatmodel.json`
- `openapi.yaml`
- `LICENSE`

Extract `docs.zip` to view or edit these documents.

## 4. Programmatic Usage

The form submits data to the `POST /api/gen` endpoint. You can call this endpoint yourself with the same JSON fields if you want to automate package creation.
