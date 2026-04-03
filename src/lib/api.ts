import { DashboardData, GeneratedTest, Requirement, RunSummary } from "@/types/domain";

type HttpMethod = "GET" | "POST";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request<T>(path: string, method: HttpMethod, body?: unknown): Promise<T> {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchDashboardDataApi(): Promise<DashboardData> {
  return request<DashboardData>("/v1/dashboard", "GET");
}

export async function ingestPrdApi(prdText: string): Promise<Requirement> {
  return request<Requirement>("/v1/requirements:ingest", "POST", { content: prdText, sourceType: "prd_text" });
}

export async function generateTestsFromRequirementsApi(requirementCount: number): Promise<GeneratedTest[]> {
  return request<GeneratedTest[]>("/v1/tests:generate", "POST", { requirementCount });
}

export async function runSuiteApi(current: RunSummary): Promise<RunSummary> {
  return request<RunSummary>("/v1/runs", "POST", { current });
}
