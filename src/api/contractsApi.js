/**
 * @file API functions for fetching contract data.
 */

/**
 * Fetches all contracts from the mock API.
 * @returns {Promise<Array>}
 */
export const fetchContracts = async () => {
  const response = await fetch('/api/contracts.json');
  if (!response.ok) {
    throw new Error('Failed to fetch contracts');
  }
  const data = await response.json();
  return data;
};

/**
 * Fetches a single contract by its ID.
 * @param {string} id - The ID of the contract to fetch.
 * @returns {Promise<Object|null>}
 */
export const fetchContractById = async (id) => {
  const contracts = await fetchContracts();
  const contract = contracts.find(c => c.id === id);
  return contract || null;
};
