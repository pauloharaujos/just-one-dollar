import Link from 'next/link';

export default function Deployment() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Deployment</h1>
        <p className="text-xl text-gray-600">
          Complete guide for deploying the Just One Dollar platform to production environments.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Pre-Deployment Checklist</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Before Deploying</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>All tests pass locally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Build succeeds without errors: <code className="bg-gray-200 px-2 py-1 rounded">npm run build</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Environment variables configured</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Database migrations applied</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">5</span>
                    <span>Production database backed up</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">6</span>
                    <span>Security review completed</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🏗️ Build Process</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Production Build</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Build Command:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npm run build</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">This creates an optimized production build in the <code className="bg-gray-100 px-2 py-1 rounded">.next</code> directory.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Build Output:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Optimized JavaScript bundles</li>
                    <li>• Static HTML pages (where applicable)</li>
                    <li>• Optimized images and assets</li>
                    <li>• TypeScript compilation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🌐 Deployment Platforms</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Vercel (Recommended)</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Why Vercel:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Built by Next.js creators</li>
                    <li>• Zero-configuration deployment</li>
                    <li>• Automatic optimizations</li>
                    <li>• Built-in CI/CD</li>
                    <li>• Edge network for fast global delivery</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Deployment Steps:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Install Vercel CLI: <code className="bg-gray-100 px-2 py-1 rounded">npm i -g vercel</code></li>
                    <li>2. Login: <code className="bg-gray-100 px-2 py-1 rounded">vercel login</code></li>
                    <li>3. Deploy: <code className="bg-gray-100 px-2 py-1 rounded">vercel</code></li>
                    <li>4. Configure environment variables in Vercel dashboard</li>
                    <li>5. Connect to GitHub for automatic deployments</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Other Platforms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Docker</h4>
                  <p className="text-sm text-gray-600">Containerize the application for deployment to any platform</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">AWS</h4>
                  <p className="text-sm text-gray-600">Deploy to AWS using Amplify, ECS, or EC2</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Railway</h4>
                  <p className="text-sm text-gray-600">Simple deployment with database included</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">DigitalOcean</h4>
                  <p className="text-sm text-gray-600">Deploy to App Platform or Droplets</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗄️ Database Deployment</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Production Database</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Options:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Managed PostgreSQL (AWS RDS, DigitalOcean, Supabase)</li>
                    <li>• Self-hosted PostgreSQL</li>
                    <li>• Cloud database services</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Migration Steps:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Set <code className="bg-gray-100 px-2 py-1 rounded">POSTGRES_URL</code> to production database</li>
                    <li>2. Run migrations: <code className="bg-gray-100 px-2 py-1 rounded">npx prisma migrate deploy</code></li>
                    <li>3. Generate Prisma client: <code className="bg-gray-100 px-2 py-1 rounded">npx prisma generate</code></li>
                    <li>4. Verify connection and schema</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Backups</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Set up automated daily backups</li>
                  <li>• Test backup restoration regularly</li>
                  <li>• Store backups in separate location</li>
                  <li>• Keep multiple backup versions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔐 Environment Variables</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Production Configuration</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Required Variables:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`POSTGRES_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://yourdomain.com"`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Security:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Never commit production secrets to version control</li>
                    <li>• Use platform-specific secret management</li>
                    <li>• Rotate secrets regularly</li>
                    <li>• Use different secrets for each environment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Monitoring & Logging</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Monitoring Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Error Tracking</h4>
                  <p className="text-sm text-gray-600">Sentry, LogRocket, or similar services</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
                  <p className="text-sm text-gray-600">Vercel Analytics, Google Analytics, or custom solutions</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Uptime</h4>
                  <p className="text-sm text-gray-600">UptimeRobot, Pingdom, or similar</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Logs</h4>
                  <p className="text-sm text-gray-600">Platform logs, CloudWatch, or dedicated logging services</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 CI/CD</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Continuous Deployment</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Automated Workflow:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Push code to main branch</li>
                    <li>2. Run tests automatically</li>
                    <li>3. Build application</li>
                    <li>4. Run database migrations</li>
                    <li>5. Deploy to production</li>
                  </ol>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Vercel: Automatic deployments on git push</li>
                    <li>• GitHub Actions: Custom CI/CD workflows</li>
                    <li>• GitLab CI: Built-in CI/CD pipelines</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Post-Deployment</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification Steps</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>Homepage loads correctly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Database connections work</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Authentication flows work</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Images load correctly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">5</span>
                    <span>No console errors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">6</span>
                    <span>Performance metrics acceptable</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/setup" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">👨‍💻 Development Setup</h3>
            <p className="text-gray-600 text-sm">Learn how to set up your development environment.</p>
          </Link>

          <Link 
            href="/docs/practices" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">✨ Best Practices</h3>
            <p className="text-gray-600 text-sm">Explore development best practices and conventions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

