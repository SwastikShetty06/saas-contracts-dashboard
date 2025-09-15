import React, { useState, useEffect, useMemo } from 'react';
import { fetchContracts } from '../api/contractsApi';
import ContractsTable from './ui/ContractsTable';
import Pagination from './ui/Pagination';
import { FiSearch, FiPlus } from 'react-icons/fi';
import UploadModal from './ui/UploadModal';

const useContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    fetchContracts()
      .then(data => {
        setContracts(data);
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  return { contracts, status };
};

const ContractsView = () => {
  const { contracts, status } = useContracts();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const itemsPerPage = 10;

  const filteredContracts = useMemo(() => {
    return contracts
      .filter(c => 
        (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         c.parties.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter(c => statusFilter === 'All' || c.status === statusFilter)
      .filter(c => riskFilter === 'All' || c.risk === riskFilter);
  }, [contracts, searchTerm, statusFilter, riskFilter]);

  const paginatedContracts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContracts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContracts, currentPage, itemsPerPage]);

  if (status === 'loading') return <div className="text-center text-slate-500">Loading contracts...</div>;
  if (status === 'error') return <div className="text-center text-red-500">Failed to load contracts.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Contracts</h1>
        <button 
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center px-4 py-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500 transition-colors"
        >
          <FiPlus className="mr-2" />
          Upload
        </button>
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setUploadModalOpen(false)} />

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by name or party..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-blue-400"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-blue-400 bg-white"
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Renewal Due</option>
        </select>
        <select 
          value={riskFilter}
          onChange={e => setRiskFilter(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-blue-400 bg-white"
        >
          <option>All Risks</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Contracts Table */}
      {paginatedContracts.length > 0 ? (
        <>
          <ContractsTable contracts={paginatedContracts} />
          <Pagination 
            currentPage={currentPage}
            totalItems={filteredContracts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-slate-700">No contracts found</h2>
          <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ContractsView;
