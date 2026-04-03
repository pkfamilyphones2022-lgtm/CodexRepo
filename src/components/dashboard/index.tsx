"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { fetchDashboardData, generateTestsFromRequirements, ingestPrd, runSuite } from "@/lib/dataSource";
import { DashboardData, RcaItem } from "@/types/domain";
import { FindingsTable } from "./findings-table";
import { GeneratedTestsTable } from "./generated-tests-table";
import { IntegrationsPricing } from "./integrations-pricing";
import { RcaPanel } from "./rca-panel";
import { RequirementUploadCard } from "./requirement-upload-card";
import { RequirementsTable } from "./requirements-table";
import { RunHistoryItem, RunHistoryList } from "./run-history-list";
import { RunSummaryPanel } from "./run-summary-panel";

const defaultData: DashboardData = {
  requirements: [],
  generatedTests: [],
  findings: [],
  runSummary: { stablePass: 0, stableFail: 0, flaky: 0, securityFindings: 0, perfRegressions: 0 },
  rcaItems: [],
  integrations: { github: false, jira: false, slack: false, cicd: false }
};

export function Dashboard() {
  const [data, setData] = useState<DashboardData>(defaultData);
  const [prdInput, setPrdInput] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [dataSourceMode, setDataSourceMode] = useState<"live" | "mock">("mock");
  const [busy, setBusy] = useState({ load: true, ingest: false, generate: false, run: false });
  const [selectedRcaId, setSelectedRcaId] = useState<string | undefined>(undefined);
  const [runHistory, setRunHistory] = useState<RunHistoryItem[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        setBusy((prev) => ({ ...prev, load: true }));
        const response = await fetchDashboardData();
        setData(response.data);
        setDataSourceMode(response.meta.mode);
        setStatusMessage(response.meta.mode === "mock" ? `Using mock data: ${response.meta.reason}` : "Connected to live API.");
        setSelectedRcaId(response.data.rcaItems[0]?.testId);
        setErrorMessage(undefined);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load dashboard data.";
        setErrorMessage(message);
      } finally {
        setBusy((prev) => ({ ...prev, load: false }));
      }
    })();
  }, []);

  const selectedRca: RcaItem | undefined = useMemo(
    () => data.rcaItems.find((item) => item.testId === selectedRcaId),
    [data.rcaItems, selectedRcaId]
  );

  async function handlePrdSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!prdInput.trim()) {
      setErrorMessage("PRD input cannot be empty.");
      return;
    }
    try {
      setBusy((prev) => ({ ...prev, ingest: true }));
      const response = await ingestPrd(prdInput);
      const requirement = response.data;

      setData((prev) => ({
        ...prev,
        requirements: [requirement, ...prev.requirements]
      }));
      setDataSourceMode(response.meta.mode);
      setPrdInput("");
      setStatusMessage(`Added ${requirement.id}. You can now generate tests.`);
      setErrorMessage(undefined);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to ingest PRD.";
      setErrorMessage(message);
    } finally {
      setBusy((prev) => ({ ...prev, ingest: false }));
    }
  }

  async function handleGenerateTests() {
    try {
      setBusy((prev) => ({ ...prev, generate: true }));
      const response = await generateTestsFromRequirements(data.requirements.length);
      const generated = response.data;

      setData((prev) => ({
        ...prev,
        generatedTests: [...generated, ...prev.generatedTests]
      }));
      setDataSourceMode(response.meta.mode);
      setStatusMessage(`Generated ${generated.length} new test(s).`);
      setErrorMessage(undefined);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to generate tests.";
      setErrorMessage(message);
    } finally {
      setBusy((prev) => ({ ...prev, generate: false }));
    }
  }

  async function handleRunSuite() {
    try {
      setBusy((prev) => ({ ...prev, run: true }));
      const response = await runSuite(data.runSummary);
      const nextSummary = response.data;
      setData((prev) => ({ ...prev, runSummary: nextSummary }));
      setDataSourceMode(response.meta.mode);
      setStatusMessage("Run completed. Reliability metrics refreshed.");
      setRunHistory((prev) => [
        {
          id: `RUN-${prev.length + 1}`,
          timestamp: new Date().toISOString(),
          source: response.meta.mode,
          summary: {
            stablePass: nextSummary.stablePass,
            stableFail: nextSummary.stableFail,
            flaky: nextSummary.flaky
          }
        },
        ...prev
      ]);
      setErrorMessage(undefined);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to run suite.";
      setErrorMessage(message);
    } finally {
      setBusy((prev) => ({ ...prev, run: false }));
    }
  }

  if (busy.load) {
    return (
      <main>
        <h1>Testing Agent MVP</h1>
        <p className="small">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main>
      <div className="header">
        <div>
          <h1>Testing Agent MVP</h1>
          <p className="small">Interactive MVP · modular components · live API with mock fallback</p>
        </div>
      </div>
      <div className="stack" style={{ marginBottom: 12 }}>
        <p className="small">Data source: <strong>{dataSourceMode.toUpperCase()}</strong></p>
        {statusMessage ? <p className="small">{statusMessage}</p> : null}
        {errorMessage ? <p className="small error-text">{errorMessage}</p> : null}
      </div>

      <section className="grid grid-2">
        <RequirementUploadCard
          prdInput={prdInput}
          onPrdChange={setPrdInput}
          onSubmit={handlePrdSubmit}
          busy={busy.ingest}
          message={statusMessage}
        />
        <RequirementsTable requirements={data.requirements} />
      </section>

      <section style={{ marginTop: 16 }}>
        <GeneratedTestsTable
          tests={data.generatedTests}
          busy={busy.generate}
          onGenerate={handleGenerateTests}
          onSelectRca={setSelectedRcaId}
        />
      </section>

      <section className="grid grid-2" style={{ marginTop: 16 }}>
        <RunSummaryPanel summary={data.runSummary} running={busy.run} onRun={handleRunSuite} />
        <RcaPanel item={selectedRca} />
      </section>

      <FindingsTable findings={data.findings} />
      <RunHistoryList runs={runHistory} />
      <IntegrationsPricing integrations={data.integrations} />
    </main>
  );
}
