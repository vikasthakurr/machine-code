import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Calendar, Code, FileText, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

const statusStyles = {
  accepted: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  running: "bg-blue-500/20 text-blue-400",
  error: "bg-red-500/20 text-red-400",
  submitted: "bg-purple-500/20 text-purple-400",
  reviewed: "bg-indigo-500/20 text-indigo-400",
};

const statusIcons = {
  accepted: CheckCircle,
  rejected: XCircle,
  pending: Clock,
  running: Loader2,
  error: XCircle,
  submitted: FileText,
  reviewed: CheckCircle,
};

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m ago";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h ago";
  const days = Math.floor(hours / 24);
  if (days < 30) return days + "d ago";
  return new Date(dateString).toLocaleDateString();
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ total: 0, accepted: 0, rejected: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setLoading(true);
    try {
      const res = await api.get("/submissions/me", { params: { limit: 50 } });
      const subs = res.data.data.submissions;
      setSubmissions(subs);
      setStats({
        total: subs.length,
        accepted: subs.filter((s) => s.status === "accepted").length,
        rejected: subs.filter((s) => s.status === "rejected").length,
        pending: subs.filter((s) => ["pending", "running"].includes(s.status)).length,
      });
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </span>
                {user?.collegeName && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {user.collegeName}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(user?.createdAt).toLocaleDateString()}
                </span>
              </div>
              {user?.bio && <p className="mt-3 text-sm text-gray-300">{user.bio}</p>}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center">
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-sm text-gray-400">Total</p>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{stats.accepted}</p>
            <p className="text-sm text-gray-400">Accepted</p>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
            <p className="text-sm text-gray-400">Rejected</p>
          </div>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
            <p className="text-sm text-gray-400">Pending</p>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="rounded-xl border border-gray-800 bg-gray-900">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Recent Submissions</h2>
            <Link to="/submissions" className="text-sm text-indigo-400 hover:text-indigo-300">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <Code className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No submissions yet</p>
              <Link to="/problems" className="mt-2 inline-block text-sm text-indigo-400 hover:text-indigo-300">
                Start solving problems
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-800">
              {submissions.slice(0, 10).map((sub) => {
                const Icon = statusIcons[sub.status] || Clock;
                return (
                  <li key={sub._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon className={clsx("w-5 h-5", sub.status === "accepted" ? "text-green-400" : sub.status === "rejected" ? "text-red-400" : "text-gray-400")} />
                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {sub.language ? sub.language.charAt(0).toUpperCase() + sub.language.slice(1) : "Design"} submission
                        </p>
                        <p className="text-xs text-gray-500">{timeAgo(sub.createdAt)}</p>
                      </div>
                    </div>
                    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[sub.status] || "bg-gray-700 text-gray-300")}>
                      {sub.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
