import React, { useState, useEffect } from 'react';
import { Search, User, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    acceptedCandidates: 0,
    rejectedCandidates: 0,
    candidatesForReview: 0
  });
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchCandidates();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/candidates');
      const data = await response.json();
      setCandidates(data.candidates);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/candidates?search=${searchTerm}`);
      const data = await response.json();
      setCandidates(data.candidates);
    } catch (error) {
      console.error('Error searching candidates:', error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const delayedSearch = setTimeout(handleSearch, 500);
      return () => clearTimeout(delayedSearch);
    } else {
      fetchCandidates();
    }
  });

  const handleViewDetails = (candidateId) => {
    window.location.href = `/admin/candidate/${candidateId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gray-200 px-6 py-2 rounded-lg">
                <span className="text-xl font-semibold text-gray-700">Admin Panel</span>
              </div>
            </div>
            
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About us
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Plan
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-1 rounded">
                Dashboard
              </a>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors">
                Log out
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard title="Total submissions" value={stats.totalSubmissions} />
          <StatsCard title="Accepted candidates" value={stats.acceptedCandidates} />
          <StatsCard title="Rejected Candidates" value={stats.rejectedCandidates} />
          <StatsCard title="Candidates for review" value={stats.candidatesForReview} />
        </div>

        {/* Candidates Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold text-center text-gray-900">
              Candidates
            </h2>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, JEE roll no, or rank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Candidates List */}
          <div className="px-6 pb-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading candidates...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {candidates.map((candidate, index) => (
                  <CandidateRow
                    key={candidate._id}
                    index={index + 1}
                    candidate={candidate}
                    onViewDetails={() => handleViewDetails(candidate._id)}
                  />
                ))}
                {candidates.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No candidates found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatsCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
    <div className="text-3xl font-bold text-gray-900 mb-2">
      {value.toLocaleString()}
    </div>
    <div className="text-gray-600 text-sm">{title}</div>
  </div>
);

const StatusTag = ({ status }) => {
  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    under_review: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Under Review' },
    accepted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Accepted' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

const CandidateRow = ({ index, candidate, onViewDetails }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-4">
      <span className="text-gray-600 font-medium w-8">{index}.</span>
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
        <User className="w-5 h-5 text-purple-600" />
      </div>
      <div className="space-y-1">
        <div className="text-gray-900">
          <span className="text-gray-600">JEE Roll No.</span>{' '}
          <span className="font-medium">{candidate.jeeRollNo}</span>
        </div>
        <div className="flex items-center space-x-2">
          <StatusTag status={candidate.adminStatus || 'pending'} />
          <span className="text-xs text-gray-500">
            Payment: {candidate.paymentStatus}
          </span>
        </div>
      </div>
    </div>
    
    <div className="flex items-center space-x-8">
      <div className="text-gray-900">
        <span className="text-gray-600">JEE Rank</span>{' '}
        <span className="font-medium">{candidate.jeeRank}</span>
      </div>
      <button
        onClick={onViewDetails}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
      >
        View Details
      </button>
    </div>
  </div>
);

export default AdminDashboard;