import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const screenshotDir = path.join(root, "public", "screenshots");
mkdirSync(screenshotDir, { recursive: true });

const servers = [];
const reports = [];

function startServer(name, command, args, cwd, url, timeoutMs = 60000) {
  return isUrlReady(url, 1800).then((ready) => {
    if (ready) {
      reports.push({ name, status: "already-ready", url });
      return true;
    }
    const child = spawn(command, args, {
      cwd,
      shell: false,
      stdio: "ignore",
      windowsHide: true,
      env: { ...process.env, BROWSER: "none", NEXT_TELEMETRY_DISABLED: "1" }
    });
    servers.push({ name, child });
    return waitForUrl(name, url, timeoutMs);
  });
}

async function isUrlReady(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal });
    return response.ok || response.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { redirect: "follow", signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function waitForUrl(name, url, timeoutMs) {
  const start = Date.now();
  let lastError = "";
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetchWithTimeout(url, 2500);
      if (response.ok || response.status < 500) {
        reports.push({ name, status: "ready", url });
        return true;
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error.message;
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
  reports.push({ name, status: "not-ready", url, detail: lastError });
  return false;
}

async function capture(page, item) {
  try {
    await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: item.timeout ?? 30000 });
    if (item.afterGoto) await item.afterGoto(page);
    await page.waitForTimeout(item.settle ?? 1500);
    await page.screenshot({
      path: path.join(screenshotDir, item.file),
      fullPage: false
    });
    reports.push({ name: item.name, status: "captured", file: item.file, url: item.url });
  } catch (error) {
    reports.push({ name: item.name, status: "capture-failed", file: item.file, url: item.url, detail: error.message });
  }
}

async function main() {
  const cmd = process.platform === "win32" ? "cmd.exe" : "npm";
  const npmArgs = (script, extra = []) => process.platform === "win32"
    ? ["/c", "npm", "run", script, "--", ...extra]
    : ["run", script, "--", ...extra];

  await Promise.allSettled([
    startServer("Qwen3-Coder Studio", "cmd.exe", ["/c", "npm", "start"], path.resolve(root, "..", "New project"), "http://127.0.0.1:3001"),
    startServer("Workflow Builder", cmd, npmArgs("dev", ["--host", "127.0.0.1", "--port", "5174"]), path.resolve(root, "..", "project 2", "frontend"), "http://127.0.0.1:5174"),
    startServer("Diagram Generator", cmd, npmArgs("dev", ["--host", "127.0.0.1", "--port", "5175"]), path.resolve(root, "..", "project 3"), "http://127.0.0.1:5175"),
    startServer("SupportAI", cmd, npmArgs("dev", ["-H", "127.0.0.1", "-p", "3003"]), path.resolve(root, "..", "project 4", "frontend"), "http://127.0.0.1:3003"),
    startServer("DocAssistant", cmd, npmArgs("dev", ["-H", "127.0.0.1", "-p", "3004"]), path.resolve(root, "..", "Project 1", "DocAssistant", "frontend"), "http://127.0.0.1:3004"),
    existsSync(path.resolve(root, "..", "FitnessApp", "nutriai", "build", "web"))
      ? startServer("NutriAI web build", "python", ["-m", "http.server", "4180", "--bind", "127.0.0.1"], path.resolve(root, "..", "FitnessApp", "nutriai", "build", "web"), "http://127.0.0.1:4180")
      : Promise.resolve(false)
  ]);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 980 }, deviceScaleFactor: 1 });

  const captures = [
    { name: "NationStage", url: "https://nationstage.net", file: "nationstage.png" },
    { name: "Qwen3-Coder Studio", url: "http://127.0.0.1:3001", file: "qwen-studio.png" },
    { name: "Workflow Builder", url: "http://127.0.0.1:5174", file: "workflow-builder.png" },
    { name: "Diagram Generator", url: "http://127.0.0.1:5175", file: "diagram-generator.png" },
    { name: "SupportAI", url: "http://127.0.0.1:3003", file: "supportai.png" },
    { name: "DocAssistant", url: "http://127.0.0.1:3004", file: "docassistant.png" },
    { name: "NutriAI", url: "http://127.0.0.1:4180", file: "nutriai.png", timeout: 30000 }
  ];

  for (const item of captures) {
    await capture(page, item);
  }

  await browser.close();
  for (const { child } of servers) child.kill();

  writeFileSync(path.join(root, "public", "screenshots", "capture-report.json"), JSON.stringify(reports, null, 2));
  const failed = reports.filter((item) => item.status.includes("failed"));
  if (failed.length) {
    console.error(JSON.stringify(failed, null, 2));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  for (const { child } of servers) child.kill();
  console.error(error);
  process.exit(1);
});
