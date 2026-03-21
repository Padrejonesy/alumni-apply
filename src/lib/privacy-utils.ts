/**
 * Get display initials for a user.
 * Always returns only the first initial (first letter of first name).
 */
export function getDisplayInitial(firstName?: string | null): string {
  return firstName?.[0]?.toUpperCase() || 'U';
}
