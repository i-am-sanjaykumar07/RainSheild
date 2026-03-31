import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

// ─── Hardcoded merchant email — only this user sees the admin page ────────────
const MERCHANT_EMAIL = 'sanjay@cu.edu.in'; // ← change to your actual admin email

const Admin = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchWithdrawals = useCallback(async () => {
    try {
      const response = await api.get('/wallet/withdrawals/pending');
      setWithdrawals(response.data);
    } catch {
      // Failed to fetch or none pending
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWithdrawals();
  }, [fetchWithdrawals]);

  const handleAction = async (id, action) => {
    const note = action === 'rejected' ? window.prompt('Reason for rejection:') : 'Processed via platform';
    if (action === 'rejected' && note === null) return;

    try {
      await api.post(`/wallet/withdrawals/${id}/action`, { action, note });
      setMessage({ type: 'success', text: `Withdrawal ${action} successfully.` });
      fetchWithdrawals();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Action failed.' });
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="page-title">Merchant Admin</h1>
            <p className="page-subtitle">Withdrawal and Payout Management</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn-ghost text-sm">
            ← Back to Dashboard
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`card mb-4 animate-fade-in ${
            message.type === 'success' ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
          }`}>
            <p className={`text-sm ${message.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
              {message.text}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="card">
            <h2 className="section-title mb-4">Pending Withdrawals</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="spinner mx-auto mb-4" />
                <p className="text-surface-400 text-sm">Fetching pending requests...</p>
              </div>
            ) : withdrawals.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-3xl mb-3">✅</p>
                <h3 className="text-lg font-semibold text-surface-800">All caught up!</h3>
                <p className="text-sm text-surface-400">No pending withdrawal requests found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-50 border-b border-surface-200">
                      <th className="text-left px-4 py-3 font-semibold text-surface-600">User & Method</th>
                      <th className="text-left px-4 py-3 font-semibold text-surface-600">Details</th>
                      <th className="text-right px-4 py-3 font-semibold text-surface-600">Amount</th>
                      <th className="text-center px-4 py-3 font-semibold text-surface-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((w) => (
                      <tr key={w._id} className="border-b border-surface-100 last:border-0 hover:bg-surface-50/50 transition-colors">
                        <td className="px-4 py-4">
                          <p className="font-medium text-surface-900">{w.user?.email}</p>
                          <p className="text-xs text-brand-600 font-semibold uppercase mt-0.5">{w.withdrawalDetails?.method}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-xs space-y-0.5 text-surface-600">
                            {w.withdrawalDetails?.upiId && <p><span className="font-medium text-surface-400">UPI:</span> {w.withdrawalDetails.upiId}</p>}
                            {w.withdrawalDetails?.accountNumber && (
                              <>
                                <p><span className="font-medium text-surface-400">Acc:</span> {w.withdrawalDetails.accountNumber}</p>
                                <p><span className="font-medium text-surface-400">IFSC:</span> {w.withdrawalDetails.ifscCode}</p>
                                <p><span className="font-medium text-surface-400">Name:</span> {w.withdrawalDetails.accountName}</p>
                              </>
                            )}
                            <p className="text-[10px] mt-1 text-surface-400">Requested {new Date(w.createdAt).toLocaleString('en-IN')}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <p className="font-mono text-base font-bold text-surface-900">₹{w.amount}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleAction(w._id, 'completed')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(w._id, 'rejected')}
                              className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
