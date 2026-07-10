import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader2, Play, Clock, RotateCcw, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import Editor from "@monaco-editor/react";
import clsx from "clsx";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

const TABS = ["html", "css", "js"];

const difficultyColor = {
  easy: "bg-green-500/10 text-green-400 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

export default function ProblemPage() {
  const { slug } = useParams();
  const { user } = useAuth();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("html");
  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [srcdoc, setSrcdoc] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [checklist, setChecklist] = useState([]);

  useEffect(() => { fetchProblem(); }, [slug]);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { setTimerRunning(false); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const fetchProblem = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/problems/" + slug);
      const p = data.data;
      setProblem(p);
      const starter = {
        html: p.starterCode?.html || "",
        css: p.starterCode?.css || "",
        js: p.starterCode?.js || "",
      };
      setCode(starter);
      setTimeLeft((p.timeLimit || 45) * 60);
      setChecklist((p.requirements || []).map((r) => ({ text: r, done: false })));
      // Initial preview
      setSrcdoc(buildSrcdoc(starter.html, starter.css, starter.js));
    } catch (err) {
      console.error("Failed to fetch problem:", err);
    } finally {
      setLoading(false);
    }
  };

  function buildSrcdoc(html, css, js) {
    return <!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; padding: 16px; background: #0f172a; color: #f1f5f9; }

</style>
</head>
<body>

<script>
try {

} catch(e) { console.error(e); }
</script>
</body>
</html>;
  }

  // Debounced preview update
  useEffect(() => {
    const t = setTimeout(() => {
      setSrcdoc(buildSrcdoc(code.html, code.css, code.js));
    }, 500);
    return () => clearTimeout(t);
  }, [code]);

  const toggleCheck = (idx) => {
    setChecklist((prev) => prev.map((item, i) => i === idx ? { ...item, done: !item.done } : item));
  };

  const startTimer = () => { setTimeLeft((problem?.timeLimit || 45) * 60); setTimerRunning(true); };
  const resetCode = () => {
    const starter = {
      html: problem?.starterCode?.html || "",
      css: problem?.starterCode?.css || "",
      js: problem?.starterCode?.js || "",
    };
    setCode(starter);
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-gray-950"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>;
  if (!problem) return <div className="flex min-h-screen items-center justify-center bg-gray-950"><p className="text-gray-400">Problem not found</p></div>;

  const completed = checklist.filter((c) => c.done).length;
  const timerWarning = timeLeft < 300 && timerRunning;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-950">
      {/* Left: Problem Description */}
      <div className="w-[380px] flex-shrink-0 overflow-y-auto border-r border-gray-800 p-5">
        <h1 className="text-xl font-bold text-white mb-2">{problem.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={clsx("rounded-full border px-2.5 py-0.5 text-xs font-medium", difficultyColor[problem.difficulty])}>{problem.difficulty}</span>
          <span className="rounded-full border border-gray-700 bg-gray-800 px-2.5 py-0.5 text-xs text-gray-400">{problem.category}</span>
          <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />{problem.timeLimit}min</span>
        </div>

        <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed mb-6">{problem.description}</pre>

        {/* Requirements Checklist */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-2">Requirements ({completed}/{checklist.length})</h3>
          <ul className="space-y-1.5">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <button onClick={() => toggleCheck(i)} className={clsx("mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors", item.done ? "bg-green-500 border-green-500" : "border-gray-600 hover:border-gray-400")}>
                  {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                </button>
                <span className={clsx("text-sm", item.done ? "text-gray-500 line-through" : "text-gray-300")}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hints */}
        {problem.hints?.length > 0 && (
          <div>
            <button onClick={() => setHintsOpen(!hintsOpen)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white">
              {hintsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              Hints ({problem.hints.length})
            </button>
            {hintsOpen && (
              <ul className="mt-2 space-y-2">
                {problem.hints.map((hint, i) => (
                  <li key={i} className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2.5 text-xs text-yellow-200">
                    {hint}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Center: Code Editor */}
      <div className="flex flex-1 flex-col">
        {/* Timer + Toolbar */}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={clsx("px-3 py-1.5 rounded-md text-sm font-medium uppercase transition-colors", activeTab === tab ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800")}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={resetCode} className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-800" title="Reset code">
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className={clsx("flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-mono", timerWarning ? "bg-red-500/20 text-red-400" : "bg-gray-800 text-gray-300")}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
            {!timerRunning ? (
              <button onClick={startTimer} className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                <Play className="w-3.5 h-3.5" /> Start
              </button>
            ) : (
              <button onClick={() => setTimerRunning(false)} className="rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-600">
                Pause
              </button>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={activeTab === "js" ? "javascript" : activeTab}
            value={code[activeTab]}
            onChange={(value) => setCode((prev) => ({ ...prev, [activeTab]: value || "" }))}
            theme="vs-dark"
            options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, padding: { top: 12 }, wordWrap: "on", automaticLayout: true }}
          />
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="w-[420px] flex-shrink-0 flex flex-col border-l border-gray-800">
        <div className="border-b border-gray-800 px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">Live Preview</span>
          <button onClick={() => setSrcdoc(buildSrcdoc(code.html, code.css, code.js))} className="text-xs text-indigo-400 hover:text-indigo-300">Refresh</button>
        </div>
        <div className="flex-1 bg-white">
          <iframe
            title="preview"
            srcDoc={srcdoc}
            className="w-full h-full border-0"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}
