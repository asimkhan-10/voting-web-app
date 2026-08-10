import api from './axiosInstance';

export const getCandidates = async () => {
  const response = await api.get('/candidate');
  return response.data;
};

export const castVote = async (candidateId) => {
  const response = await api.post(`/candidate/vote/${candidateId}`);
  return response.data;
};

export const getVoteCounts = async () => {
  const response = await api.get('/candidate/vote/count');
  return response.data;
};

// Admin operations
export const addCandidate = async (candidateData) => {
  const response = await api.post('/candidate', candidateData);
  return response.data;
};

export const updateCandidate = async (candidateId, candidateData) => {
  const response = await api.put(`/candidate/${candidateId}`, candidateData);
  return response.data;
};

export const deleteCandidate = async (candidateId) => {
  const response = await api.delete(`/candidate/${candidateId}`);
  return response.data;
};