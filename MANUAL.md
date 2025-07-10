# DocForge-BluePrint Manual

This document explains how to set up and use the **DocForge-BluePrint** application.

## Prerequisites

- **Node.js 20** and **pnpm** (version 9 or later) should be installed.
- Optionally configure the environment variables listed in the `README.md`.

## Installation

1. Install project dependencies:
   ```bash
   pnpm i
   ```
2. (Optional) Install Playwright browsers if you intend to run the tests:
   ```bash
   pnpm exec playwright install
   ```

## Running in Development

Start the development server on `http://localhost:3000`:
```bash
pnpm dev
```
The homepage provides a form for generating documentation. Complete the fields and click **Next**. On the second step press **Generate** to download `docs.zip` containing the generated files.

## Building for Production

To create a production build run:
```bash
pnpm build
```
Serve the built app with:
```bash
pnpm start
```

## API Endpoints

- `POST /api/gen` – accepts the form data as JSON and returns a zip archive with generated documents.
- `POST /api/pdf` – placeholder endpoint for PDF generation.

## Testing

Automated tests are written with [Playwright](https://playwright.dev/). Run them with:
```bash
pnpm test
```
The tests expect Playwright browsers to be installed.

