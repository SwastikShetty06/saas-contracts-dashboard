import React from 'react';
import { useNavigate } from 'react-router-dom';

const RiskPill = ({ risk }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full';
  const styles = {
    Low: 'bg-green-200 text-green-800',
    Medium: 'bg-yellow-200 text-yellow-800',
    High: 'bg-red-200 text-red-800',
  };
  return <span className={`${baseClasses} ${styles[risk]}`}>{risk}</span>;
};

const StatusPill = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full';
  const styles = {
    Active: 'bg-blue-200 text-blue-800',
    Expired: 'bg-slate-200 text-slate-800',
    'Renewal Due': 'bg-orange-200 text-orange-800',
  };
  return <span className={`${baseClasses} ${styles[status]}`}>{status}</span>;
};

const ContractsTable = ({ contracts }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/contract/${id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full text-left text-slate-700">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 font-semibold">Contract Name</th>
            <th className="p-4 font-semibold">Parties</th>
            <th className="p-4 font-semibold">Expiry Date</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold">Risk Score</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(contract => (
            <tr 
              key={contract.id} 
              onClick={() => handleRowClick(contract.id)}
              className="border-t border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <td className="p-4">{contract.name}</td>
              <td className="p-4">{contract.parties}</td>
              <td className="p-4">{contract.expiry}</td>
              <td className="p-4"><StatusPill status={contract.status} /></td>
              <td className="p-4"><RiskPill risk={contract.risk} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractsTable;
