import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, User, Mail, Phone, MapPin, Calendar, FileText, GraduationCap } from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCandidateDetails();
  });

  const fetchCandidateDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/candidate/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch candidate details');
      }
      
      const data = await response.json();
      setCandidate(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/candidate/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminStatus: newStatus })
      });

      if (response.ok) {
        setCandidate(prev => ({ ...prev, adminStatus: newStatus }));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const downloadDocument = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/admin')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
            <div className="bg-gray-200 px-6 py-2 rounded-lg">
              <span className="text-xl font-semibold text-gray-700">Candidate Details</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
                  <p className="text-gray-600">JEE Roll No: {candidate.jeeRollNo}</p>
                  <p className="text-gray-600">JEE Rank: {candidate.jeeRank}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <StatusTag status={candidate.adminStatus || 'pending'} />
                <span className="text-sm text-gray-500">
                  Payment: {candidate.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="px-6 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoItem label="Father's Name" value={candidate.fathersName} />
              <InfoItem label="Gender" value={candidate.gender} />
              <InfoItem label="Category" value={candidate.category} />
              <InfoItem label="Date of Birth" value={new Date(candidate.dateOfBirth).toLocaleDateString()} />
              <InfoItem label="Phone" value={candidate.phone} />
              <InfoItem label="Father's Phone" value={candidate.fathersPhone} />
              <InfoItem label="Email" value={candidate.emailId} />
            </div>
          </div>

          {/* Address Details */}
          <div className="px-6 py-6 border-t">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Permanent Address</h3>
                <p className="text-gray-700">{candidate.permanentAddress}</p>
                <p className="text-gray-600">{candidate.permanentDistrict}, {candidate.permanentState} - {candidate.permanentPin}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Current Address</h3>
                <p className="text-gray-700">{candidate.currentAddress}</p>
                <p className="text-gray-600">{candidate.currentDistrict}, {candidate.currentState} - {candidate.currentPin}</p>
              </div>
            </div>
          </div>

          {/* Education Details */}
          <div className="px-6 py-6 border-t">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Class 10th</h3>
                <div className="space-y-2">
                  <InfoItem label="School" value={candidate.class10School} />
                  <InfoItem label="Board" value={candidate.class10Board} />
                  <InfoItem label="Percentage" value={`${candidate.class10Percentage}%`} />
                  <InfoItem label="Total Marks" value={candidate.class10TotalMarks} />
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Class 12th</h3>
                <div className="space-y-2">
                  <InfoItem label="School" value={candidate.class12School} />
                  <InfoItem label="Board" value={candidate.class12Board} />
                  <InfoItem label="Percentage" value={`${candidate.class12Percentage}%`} />
                  <InfoItem label="PCM Percentage" value={`${candidate.class12PCMPercentage}%`} />
                  <InfoItem label="Physics" value={candidate.class12PhysicsMarks} />
                  <InfoItem label="Chemistry" value={candidate.class12ChemistryMarks} />
                  <InfoItem label="Mathematics" value={candidate.class12MathMarks} />
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="px-6 py-6 border-t">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(candidate.documents).map(([docType, url]) => (
                url && (
                  <div key={docType} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">
                          {docType.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-gray-500">Document</p>
                      </div>
                      <button
                        onClick={() => downloadDocument(url, `${docType}.pdf`)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Status Update Section */}
          <div className="px-6 py-6 border-t bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
            <div className="flex space-x-3">
              <button
                onClick={() => updateStatus('under_review')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Mark Under Review
              </button>
              <button
                onClick={() => updateStatus('accepted')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => updateStatus('rejected')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatusTag = ({ status }) => {
  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    under_review: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Under Review' },
    accepted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Accepted' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-gray-900">{value}</p>
  </div>
);

export default UserDetails;
