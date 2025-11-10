/**
 * API configuration and helper functions
 */

// Get API URL from environment variable or default to localhost
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  register: `${API_URL}/api/v1/auth/register`,
  login: `${API_URL}/api/v1/auth/login`,
  passwordResetRequest: `${API_URL}/api/v1/auth/password-reset-request`,
  passwordReset: `${API_URL}/api/v1/auth/password-reset`,
  
  // Puzzles
  puzzles: `${API_URL}/api/v1/puzzles`,
  puzzle: (id: number | string) => `${API_URL}/api/v1/puzzles/${id}`,
  puzzleByToken: (token: string) => `${API_URL}/api/v1/puzzles/share/${token}`,
  userPuzzles: (userId: number) => `${API_URL}/api/v1/users/${userId}/puzzles`,
  validatePuzzle: (id: number) => `${API_URL}/api/v1/puzzles/${id}/validate`,
  deletePuzzle: (id: number, userId: number) => `${API_URL}/api/v1/puzzles/${id}?user_id=${userId}`,
  togglePuzzlePrivacy: (id: number, userId: number, isPublic: boolean) =>
    `${API_URL}/api/v1/puzzles/${id}/privacy?user_id=${userId}&is_public=${isPublic}`,
  publicPuzzles: (search?: string) =>
    `${API_URL}/api/v1/puzzles/public/all${search ? `?search=${encodeURIComponent(search)}` : ''}`,
  
  // Health
  health: `${API_URL}/health`,
};

/**
 * Helper function to get API URL for display purposes
 */
export function getApiUrl(): string {
  return API_URL;
}