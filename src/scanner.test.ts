import { isScannerRequest } from "./scanner";

describe("isScannerRequest", () => {
  // ---- Legitimate paths should pass through ----
  it("allows /", () => {
    expect(isScannerRequest("/")).toBe(false);
  });

  it("allows /health", () => {
    expect(isScannerRequest("/health")).toBe(false);
  });

  it("allows POST /convert", () => {
    expect(isScannerRequest("/convert")).toBe(false);
  });

  it("allows POST /convert-md", () => {
    expect(isScannerRequest("/convert-md")).toBe(false);
  });

  it("allows /robots.txt", () => {
    expect(isScannerRequest("/robots.txt")).toBe(false);
  });

  // ---- Scanner patterns should be blocked ----
  it("blocks /.env", () => {
    expect(isScannerRequest("/.env")).toBe(true);
  });

  it("blocks /.env.local", () => {
    expect(isScannerRequest("/.env.local")).toBe(true);
  });

  it("blocks /.env.production", () => {
    expect(isScannerRequest("/.env.production")).toBe(true);
  });

  it("blocks /cgi-bin/ path traversal", () => {
    expect(isScannerRequest("/cgi-bin/././././././var/www/html/.env.local")).toBe(true);
  });

  it("blocks /icons/ path traversal", () => {
    expect(isScannerRequest("/icons/././././././var/www/html/.env")).toBe(true);
  });

  it("blocks /wp-config.php.bak", () => {
    expect(isScannerRequest("/wp-config.php.bak")).toBe(true);
  });

  it("blocks /wp-content/debug.log", () => {
    expect(isScannerRequest("/wp-content/debug.log")).toBe(true);
  });

  it("blocks /xmlrpc.php", () => {
    expect(isScannerRequest("/xmlrpc.php")).toBe(true);
  });

  it("blocks /_ignition/execute-solution", () => {
    expect(isScannerRequest("/_ignition/execute-solution")).toBe(true);
  });

  it("blocks /vendor/phpunit/.../eval-stdin.php", () => {
    expect(isScannerRequest("/vendor/phpunit/src/Util/PHP/eval-stdin.php")).toBe(true);
  });

  it("blocks /backups/", () => {
    expect(isScannerRequest("/backups/")).toBe(true);
  });

  it("blocks /backup/", () => {
    expect(isScannerRequest("/backup/")).toBe(true);
  });

  it("blocks /.env.bak", () => {
    expect(isScannerRequest("/.env.bak")).toBe(true);
  });

  it("blocks /etc/passwd variants", () => {
    expect(isScannerRequest("/icons/./././././././etc/passwd")).toBe(true);
  });

  it("blocks /assets/./.env", () => {
    expect(isScannerRequest("/assets./.env")).toBe(true);
  });

  it("blocks /static./.env", () => {
    expect(isScannerRequest("/static./.env")).toBe(true);
  });

  it("blocks /uploads./.env", () => {
    expect(isScannerRequest("/uploads./.env")).toBe(true);
  });

  it("blocks /.git/ paths", () => {
    expect(isScannerRequest("/.git/config")).toBe(true);
  });

  it("blocks /.github/workflows/deploy.yml", () => {
    expect(isScannerRequest("/.github/workflows/deploy.yml")).toBe(true);
  });
});
