import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Loader2, Clock } from "lucide-react";
import clsx from "clsx";
import api from "../lib/api";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Components", value: "component" },
  { label: "Features", value: "feature" },
  { label: "Mini Apps", value: "mini-app" },
  { label: "Layouts", value: "layout" },
];

const DIFFICULTIES = ["all", "easy", "medium", "hard"];

const difficultyColor = {
  easy: "bg-green-500/10 text-green-400 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

const categoryColor = {
  component: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  feature: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "mini-app": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  layout: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  interaction: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function ProblemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [problems, setProblems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "all");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => { fetchProblems(); }, [difficulty, category, page]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (difficulty && difficulty !== "all") params.difficulty = difficulty;
      if (category) params.category = category;
      if (search.trim()) params.search = search.trim();
      const { data } = await api.get("/problems", { params });
      setProblems(data.data.problems);
      setPagination(data.data.pagination);
    } catch (err) {
      console.error("Failed to fetch problems:", err);
      setProblems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchProblems(); };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-white">Machine Coding Challenges</h1>
        <p className="mb-8 text-gray-400">Practice building real UI components and features under time pressure</p>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-lg bg-gray-900 p-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => { setCategory(c.value); setPage(1); }}
                className={clsx(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  category === c.value ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <select
              value={difficulty}
              onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
              className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
              ))}
            </select>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48 rounded-lg border border-gray-700 bg-gray-900 py-2 pl-9 pr-3 text-sm text-gray-300 placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:w-56"
              />
            </form>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        ) : problems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg">No problems found</p>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((problem) => (
                <Link
                  key={problem._id}
                  to={"/problems/" + problem.slug}
                  className="group rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-indigo-500/50 hover:bg-gray-800/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {problem.title}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {problem.timeLimit}m
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={clsx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", difficultyColor[problem.difficulty])}>
                      {problem.difficulty}
                    </span>
                    <span className={clsx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", categoryColor[problem.category])}>
                      {problem.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {problem.tags?.slice(0, 4).map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-full border border-gray-700 bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {problem.requirements && (
                    <p className="mt-3 text-xs text-gray-500">{problem.requirements.length} requirements</p>
                  )}
                </Link>
              ))}
            </div>
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Page {pagination.page} of {pagination.totalPages} ({pagination.total} challenges)
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={!pagination.hasPrev}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed">
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </button>
                  <button onClick={() => setPage((p) => p + 1)} disabled={!pagination.hasNext}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed">
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
