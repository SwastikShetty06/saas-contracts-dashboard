import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchContractById } from '../api/contractsApi';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { FiFileText, FiAlertTriangle, FiCheckCircle, FiX } from 'react-icons/fi';

const RiskPill = ({ risk, text }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center';
  const styles = {
    Low: 'bg-green-200 text-green-800',
    Medium: 'bg-yellow-200 text-yellow-800',
    High: 'bg-red-200 text-red-800',
  };
  return <span className={`${baseClasses} ${styles[risk]}`}>{text}</span>;
};

const ContractDetailPage = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [status, setStatus] = useState('loading');
  const [evidencePanelOpen, setEvidencePanelOpen] = useState(false);

  useEffect(() => {
    fetchContractById(id)
      .then(data => {
        if (data) {
          setContract(data);
          setStatus('success');
        } else {
          setStatus('not-found');
        }
      })
      .catch(() => setStatus('error'));
  }, [id]);

  const renderContent = () => {
    if (status === 'loading') return <p>Loading contract details...</p>;
    if (status === 'error') return <p>Error loading contract.</p>;
    if (status === 'not-found') return <p>Contract not found.</p>;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metadata */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{contract.name}</h1>
            <p className="text-slate-500 mb-4">{contract.parties}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <p><strong>Status:</strong> <RiskPill risk={contract.risk} text={contract.status} /></p>
              <p><strong>Risk:</strong> <RiskPill risk={contract.risk} text={contract.risk} /></p>
              <p><strong>Start Date:</strong> {contract.start}</p>
              <p><strong>Expiry Date:</strong> {contract.expiry}</p>
            </div>
            <button 
              onClick={() => setEvidencePanelOpen(true)}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Show Evidence
            </button>
          </div>

          {/* Clauses */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Clauses</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {contract.clauses.map((clause, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <h3 className="font-semibold text-slate-800">{clause.title}</h3>
                  <p className="text-slate-600 text-sm my-1">{clause.summary}</p>
                  <p className="text-xs text-slate-500">Confidence: {clause.confidence * 100}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">AI Insights</h2>
            <ul className="space-y-3">
              {contract.insights.map((insight, index) => (
                <li key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                  <FiAlertTriangle className={`mr-3 mt-1 ${insight.risk === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
                  <div>
                    <p className="font-semibold text-slate-800">{insight.risk} Risk</p>
                    <p className="text-slate-600 text-sm">{insight.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-col flex-1 relative overflow-hidden">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
        
        {/* Evidence Panel */}
        <div className={`absolute top-0 right-0 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${evidencePanelOpen ? 'translate-x-0' : 'translate-x-full'} w-full md:w-1/3 z-20`}>
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-700">Evidence</h2>
                <button onClick={() => setEvidencePanelOpen(false)} className="p-2 rounded-full hover:bg-slate-100">
                    <FiX className="text-slate-600" />
                </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-65px)]">
                {contract?.evidence.map((item, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600 italic">"{item.snippet}"</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                            <span>Source: {item.source}</span>
                            <span>Relevance: {item.relevance * 100}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {evidencePanelOpen && <div onClick={() => setEvidencePanelOpen(false)} className="absolute inset-0 bg-black/30 z-10 transition-opacity"></div>}
      </div>
    </div>
  );
};

export default ContractDetailPage;
