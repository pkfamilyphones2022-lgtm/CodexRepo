export type Requirement = {
  id: string;
  goal: string;
  coverage: string;
};

export type GeneratedTest = {
  id: string;
  name: string;
  rationale: string;
  type: "functional" | "security" | "performance";
};

export type Finding = {
  id: string;
  severity: "high" | "medium";
  title: string;
  fix: string;
};

export type RunSummary = {
  stablePass: number;
  stableFail: number;
  flaky: number;
  securityFindings: number;
  perfRegressions: number;
};

export type RcaItem = {
  testId: string;
  failure: string;
  rootCause: string;
  evidence: string;
  nextAction: string;
  confidence: number;
};

export type IntegrationStatus = {
  github: boolean;
  jira: boolean;
  slack: boolean;
  cicd: boolean;
};

export type DashboardData = {
  requirements: Requirement[];
  generatedTests: GeneratedTest[];
  findings: Finding[];
  runSummary: RunSummary;
  rcaItems: RcaItem[];
  integrations: IntegrationStatus;
};
