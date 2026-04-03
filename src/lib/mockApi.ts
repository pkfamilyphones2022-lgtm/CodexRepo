import { DashboardData, GeneratedTest, Requirement, RunSummary } from "@/types/domain";

const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

const seedRequirements: Requirement[] = [
  { id: "REQ-101", goal: "Password reset must be secure and fast", coverage: "4 tests" },
  { id: "REQ-102", goal: "Only admins can export billing", coverage: "3 tests" },
  { id: "REQ-103", goal: "Checkout under p95 < 800ms", coverage: "2 tests" }
];

const seedTests: GeneratedTest[] = [
  { id: "T-1", name: "Reset link expires after 15 min", rationale: "Prevents token replay risk", type: "functional" },
  { id: "T-2", name: "Reflected XSS on search query", rationale: "Covers OWASP A03 injection risk", type: "security" },
  { id: "T-3", name: "Checkout p95 under load", rationale: "Ensures conversion-critical latency target", type: "performance" }
];

const seedRunSummary: RunSummary = {
  stablePass: 28,
  stableFail: 3,
  flaky: 2,
  securityFindings: 2,
  perfRegressions: 1
};

export async function fetchDashboardData(): Promise<DashboardData> {
  await delay();

  return {
    requirements: seedRequirements,
    generatedTests: seedTests,
    findings: [
      { id: "F-1", severity: "high", title: "Auth bypass with stale role cache", fix: "Invalidate role cache on permission change" },
      { id: "F-2", severity: "medium", title: "Flaky test on OTP submit", fix: "Await debounce completion before assert" },
      { id: "F-3", severity: "high", title: "p95 checkout latency regression +24%", fix: "Optimize pricing query and add index" }
    ],
    runSummary: seedRunSummary,
    rcaItems: [
      {
        testId: "T-1",
        failure: "Admin export denied for valid admin user.",
        rootCause: "Authorization cache retained outdated role.",
        evidence: "JWT has admin claim; permission lookup returned viewer.",
        nextAction: "Flush role cache on role update and re-run auth suite.",
        confidence: 0.86
      },
      {
        testId: "T-2",
        failure: "Unescaped HTML rendered in search result.",
        rootCause: "Server response includes user input without encoding.",
        evidence: "Payload `<img onerror>` reflected directly in HTML response.",
        nextAction: "Apply output encoding and sanitize server-side templates.",
        confidence: 0.79
      }
    ],
    integrations: { github: true, jira: true, slack: true, cicd: true }
  };
}

export async function ingestPrd(prdText: string): Promise<Requirement> {
  await delay(550);

  return {
    id: `REQ-${Math.floor(Math.random() * 900 + 100)}`,
    goal: prdText.trim() || "User story goal parsed from PRD",
    coverage: "0 tests"
  };
}

export async function generateTestsFromRequirements(requirementCount: number): Promise<GeneratedTest[]> {
  await delay(700);

  return [
    {
      id: `T-${Math.floor(Math.random() * 900 + 100)}`,
      name: `Generated login boundary test (${requirementCount} reqs)`,
      rationale: "Validates requirement-derived negative path.",
      type: "functional"
    }
  ];
}

export async function runSuite(current: RunSummary): Promise<RunSummary> {
  await delay(900);

  return {
    stablePass: current.stablePass + 1,
    stableFail: current.stableFail,
    flaky: Math.max(0, current.flaky - 1),
    securityFindings: current.securityFindings,
    perfRegressions: current.perfRegressions
  };
}
