// lib/admin-auth.ts
// Helper utilities for admin password authentication

export const ADMIN_COOKIE_NAME = 'wize_admin_token';
export const DEFAULT_ADMIN_PASSWORD = 'WIZE@tv.tv';

/**
 * Derives a SHA-256 hex string from text using standard Web Crypto API
 * Supported in both Edge Runtime (middleware) and Node.js
 */
export async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Returns expected session token generated from current admin password
 */
export async function getExpectedAdminToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  return hashString(`wizetv_admin_salt_${password}`);
}

/**
 * Checks if a provided token matches the expected admin session
 */
export async function verifyAdminToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const expected = await getExpectedAdminToken();
  return token === expected;
}

/**
 * Validates raw password input
 */
export function validateAdminPassword(password: string): boolean {
  const currentPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  return password === currentPassword;
}
