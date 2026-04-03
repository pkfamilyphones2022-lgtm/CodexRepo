import { DashboardData, GeneratedTest, Requirement, RunSummary } from "@/types/domain";
import {
  fetchDashboardData as fetchDashboardDataMock,
  generateTestsFromRequirements as generateTestsFromRequirementsMock,
  ingestPrd as ingestPrdMock,
  runSuite as runSuiteMock
} from "@/lib/mockApi";
import {
  fetchDashboardDataApi,
  generateTestsFromRequirementsApi,
  ingestPrdApi,
  runSuiteApi
} from "@/lib/api";

export type DataSourceMeta = {
  mode: "live" | "mock";
  reason?: string;
};

async function withFallback<T>(primary: () => Promise<T>, fallback: () => Promise<T>): Promise<{ data: T; meta: DataSourceMeta }> {
  try {
    return { data: await primary(), meta: { mode: "live" } };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown API error";
    return { data: await fallback(), meta: { mode: "mock", reason } };
  }
}

export function fetchDashboardData(): Promise<{ data: DashboardData; meta: DataSourceMeta }> {
  return withFallback(fetchDashboardDataApi, fetchDashboardDataMock);
}

export function ingestPrd(prdText: string): Promise<{ data: Requirement; meta: DataSourceMeta }> {
  return withFallback(() => ingestPrdApi(prdText), () => ingestPrdMock(prdText));
}

export function generateTestsFromRequirements(requirementCount: number): Promise<{ data: GeneratedTest[]; meta: DataSourceMeta }> {
  return withFallback(
    () => generateTestsFromRequirementsApi(requirementCount),
    () => generateTestsFromRequirementsMock(requirementCount)
  );
}

export function runSuite(current: RunSummary): Promise<{ data: RunSummary; meta: DataSourceMeta }> {
  return withFallback(() => runSuiteApi(current), () => runSuiteMock(current));
}
