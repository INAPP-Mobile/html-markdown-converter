/**
 * Scanner and exploit-path detection middleware logic.
 *
 * Matches request paths against known patterns used by vulnerability scanners,
 * botnets, and mass-exploit tools. The goal is to reject these before they
 * reach any route handler, reducing log noise and wasted compute.
 *
 * All patterns are lowercased before matching.
 */

const KNOWN_SCANNER_PATTERNS: RegExp[] = [
  // Path traversal and cgi-bin abuse
  /\/cgi-bin\//i,
  /\/\.\.\/\.\.\//i,
  /\/icons\//i,
  /\/assets\//i,
  /\/static\//i,
  /\/public\//i,
  /\/files\//i,
  /\/img\//i,
  /\/media\//i,
  /\/uploads\//i,

  // .env and configuration file theft
  /\/\.env/i,

  // WordPress exploitation — wp-config, debug.log, xmlrpc
  /\/wp-config/i,
  /\/wp-content\//i,
  /\/debug\.log/i,
  /\/readme\.html/i,
  /\/xmlrpc\.php/i,

  // Ignition (Laravel debug stack) — mass-exploited RCE
  /\/_ignition\//i,
  /\/_ignition\/execute-solution/i,

  // PHPUnit eval-stdin — RCE probe
  /\/phpunit\//i,
  /\/eval-stdin\.php/i,
  /\/vendor\//i,

  // Backup/config file leaks — common admin mistakes
  /\/backup[s]?\/?$/i,
  /\/\.(bak|old|save|swp|orig|local|backup|production|~)$/i,

  // Path traversal with repeated dot-slash segments
  /\/\.\/\.\/\.\//i,
  /\/\.\/\.\/\.\/\.\//i,
  /\/\.\/\.\//i,

  // Passwd file theft
  /\/etc\/passwd/i,

  // Common CI/CD and config leaks
  /\/\.git\//i,
  /\/\.github\//i,
  /\/composer\.json/i,
  /\/database\.yml/i,
  /\/settings\.py/i,
  /\/appsettings\.json/i,
  /\/config\.php/i,
  /\/web\.config/i,
];

/**
 * Returns true if the request path matches a known scanner/exploit pattern.
 * @param path - The request path (e.g. req.path from Express).
 */
export function isScannerRequest(path: string): boolean {
  return KNOWN_SCANNER_PATTERNS.some((pattern) => pattern.test(path));
}
