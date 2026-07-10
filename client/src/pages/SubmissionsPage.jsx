import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  const days = Math.floor(hours / 24);
  if (days < 30) return days + (days === 1 ? ' day ago' : ' days ago');
  const months = Math.floor(days / 30);
  if (months < 12) return months + (months === 1 ? ' month ago' : ' months ago');
  const years = Math.floor(months / 12);
  return years + (years === 1 ? ' year ago' : ' years ago');
}

const STATUS_OPTIONS = ['all', 'pending', 'running', 'accepted', 'rejected', 'error', 'submitted', 'reviewed'];

const statusStyles = {
  accepted: 'bg-green-500/20 text-green-400 border border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border border-red-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  running: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  error: 'bg-red-500/20 text-red-400 border border-red-500/30',
  submitted: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  reviewed: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
};

function getResultSummary(submission) {
  if (!submission.result) return '—';
  if (submission.type === 'code') {
    const { passed, totalTests, passedTests, duration } = submission.result;
    const testsPassed = passedTests ?? passed ?? 0;
    const total = totalTests ?? 0;
    return testsPassed + '/' + total + ' tests passed';
  }
  if (submission.type === 'design') {
    const { totalScore, maxScore, percentage } = submission.result;
    const pct = percentage ?? (maxScore ? Math.round((totalScore / maxScore) * 100) : 0);
    return 'Score: ' + (totalScore ?? 0) + '/' + (maxScore ?? 0) + ' (' + pct + '%)';
  }
  return '—';
}

export default function SubmissionsPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSubmissions();
  }, [page, statusFilter]);

  async function fetchSubmissions() {
    setLoading(true);
    try {
      const params = { page };
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await api.get('/submissions/me', { params });
      setSubmissions(res.data.data.submissions);
      setPagination(res.data.data.pagination);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">My Submissions</h1>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400 text-lg">No submissions yet. Go solve some problems!</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-900 text-gray-400 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Language</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Result</th>
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {submissions.map((sub, idx) => (
                    <tr key={sub._id} className="bg-gray-900 hover:bg-gray-800/70 transition-colors">
                      <td className="px-4 py-3 text-gray-400 font-mono">
                        {(page - 1) * (pagination?.limit || 10) + idx + 1}
                      </td>
                      <td className="px-4 py-3">
                        <span className={clsx(
                          'inline-block px-2 py-0.5 rounded text-xs font-medium',
                          sub.type === 'code'
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        )}>
                          {sub.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300 capitalize">{sub.language || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={clsx(
                          'inline-block px-2 py-0.5 rounded text-xs font-medium',
                          statusStyles[sub.status] || 'bg-gray-700 text-gray-300'
                        )}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{getResultSummary(sub)}</td>
                      <td className="px-4 py-3 text-gray-500">{timeAgo(sub.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  Page {pagination.page} of {pagination.pages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gray-900 border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                    disabled={page >= pagination.pages}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gray-900 border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
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
