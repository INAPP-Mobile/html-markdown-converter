# Debugging Guide — Railway Template Development

## General Approach

Before diving into code changes, eliminate Railway platform issues first.

## Checklist

### 1. Check Deploy Logs
First stop for any deploy failure:
- Use `deployment_list` to find the failed deployment
- Use `logs-build` to check build output
- Use `logs-deployment` to check runtime logs
- Common error: build command not found → check `railway.json` buildCommand
- Common error: port mismatch → check EXPOSE in Dockerfile matches targetPort

### 2. Environment Variables
- Use `variable_list` to verify variables are set in the correct environment
- Check that DATABASE_URL / REDIS_URL are correctly referenced
- Railway auto-injects `DATABASE_URL` for PostgreSQL plugins — do not set manually
- For multi-service templates, verify inter-service references use Railway's service discovery

### 3. Build Failures
- Nixpacks builds: check for missing `package.json`, `requirements.txt`, or `Gemfile`
- Docker builds: check `Dockerfile` syntax, base image availability, build context
- Common: Nixpacks does not support `.dockerignore` — use Docker builder if needed
- Check `railway.json` `builder` field: `"NIXPACKS"` or `"DOCKERFILE"`

### 4. Service Health
- Service crashes immediately → check `startCommand` in railway.json
- Service starts but unhealthy → check `healthcheckPath` in service config
- Port not exposed → add `domain_create` or `tcp_proxy_create`
- Use `service_update` to configure healthcheckPath, numReplicas, sleepApplication

### 5. Database Issues
- Use `database_deploy_from_template` for standard databases
- Check plugin status via `plugin-get`
- Railway auto-injects connection URL as env var — verify name matches what app expects
- Reset credentials via `plugin-reset-credentials` if needed

### 6. Domain / Networking
- Railway generates a `*.railway.app` domain by default
- Use `domain_list` to check generated domains
- For custom domains: CNAME to Railway target, verify with `custom-domain-status`
- TCP proxies: `tcp_proxy_list` to check connection details

### 7. Template Marketplace Publishing
- Use `template-generate` to create a template from a working project
- Set proper name, description, and tags for discoverability
- Test with `template-deploy` before publishing

## Automated Verification
Use Railway API tools:
- `deployment_status` — wait for healthy
- `logs-deployment` — check runtime errors
- `variable_list` — verify env vars
- `curl <deployment-url>` — test HTTP endpoints
