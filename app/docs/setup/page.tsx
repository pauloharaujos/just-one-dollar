import Link from 'next/link';

export default function Setup() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Development Setup</h1>
        <p className="text-xl text-gray-600">
          Detailed guide for setting up your development environment for the Just One Dollar platform.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Prerequisites</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Software</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Node.js</h4>
                  <p className="text-sm text-gray-600 mb-2">Version 18 or higher</p>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400">node --version</code>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">npm</h4>
                  <p className="text-sm text-gray-600 mb-2">Comes with Node.js</p>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400">npm --version</code>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">PostgreSQL</h4>
                  <p className="text-sm text-gray-600 mb-2">Database server (local or remote)</p>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400">psql --version</code>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Git</h4>
                  <p className="text-sm text-gray-600 mb-2">Version control</p>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400">git --version</code>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Tools</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>VS Code</strong> - Recommended IDE with TypeScript support</li>
                <li>• <strong>PostgreSQL GUI</strong> - pgAdmin, DBeaver, or TablePlus</li>
                <li>• <strong>Git Client</strong> - GitHub Desktop, GitKraken, or command line</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Installation Steps</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Clone Repository</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">git clone &lt;repository-url&gt;</code><br />
                <code className="text-green-400">cd just-one-dollar</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Install Dependencies</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">npm install</code>
              </div>
              <p className="text-sm text-gray-600 mt-2">This will also run <code className="bg-gray-100 px-2 py-1 rounded">prisma migrate deploy</code> and <code className="bg-gray-100 px-2 py-1 rounded">prisma generate</code> automatically via the postinstall script.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Set Up Environment Variables</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Create .env.local file:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">cp .env.example .env.local</code>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Required Variables:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`POSTGRES_URL="postgresql://user:password@localhost:5432/justonedollar"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Database Setup</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Create Database:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">createdb justonedollar</code>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Generate Prisma Client:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npx prisma generate</code>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Run Migrations:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npx prisma migrate deploy</code>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">(Optional) Seed Database:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npx prisma db seed</code>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Start Development Server</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">npm run dev</code>
              </div>
              <p className="text-sm text-gray-600 mt-2">Visit <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code> to see the application.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚙️ Configuration</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Environment Variables</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">POSTGRES_URL</h4>
                  <p className="text-sm text-gray-600">PostgreSQL connection string</p>
                  <p className="text-xs text-gray-500 mt-1">Format: <code className="bg-gray-100 px-2 py-1 rounded">postgresql://user:password@host:port/database</code></p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">NEXTAUTH_SECRET</h4>
                  <p className="text-sm text-gray-600">Secret key for NextAuth.js session encryption</p>
                  <p className="text-xs text-gray-500 mt-1">Generate with: <code className="bg-gray-100 px-2 py-1 rounded">openssl rand -base64 32</code></p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">NEXTAUTH_URL</h4>
                  <p className="text-sm text-gray-600">Base URL of your application</p>
                  <p className="text-xs text-gray-500 mt-1">Development: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code></p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">TypeScript Configuration</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Path Aliases:</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-700">
{`// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600 mt-2">Allows imports like <code className="bg-gray-100 px-2 py-1 rounded">@/repository/productRepository</code></p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🛠️ Development Tools</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prisma Studio</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Visual Database Editor:</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-green-400">npx prisma studio</code>
                </div>
                <p className="text-sm text-gray-600 mt-2">Opens a web interface at <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:5555</code> to view and edit database records.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Migrations</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Create Migration:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npx prisma migrate dev --name migration_name</code>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Reset Database:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npx prisma migrate reset</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">⚠️ Warning: This will delete all data!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🐛 Troubleshooting</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Issues</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Database Connection Error</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Verify PostgreSQL is running</li>
                    <li>• Check POSTGRES_URL in .env.local</li>
                    <li>• Ensure database exists</li>
                    <li>• Check firewall/network settings</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Prisma Client Not Generated</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Run <code className="bg-gray-100 px-2 py-1 rounded">npx prisma generate</code></li>
                    <li>• Check schema.prisma for errors</li>
                    <li>• Verify Prisma is installed</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">TypeScript Errors</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code> to ensure dependencies are installed</li>
                    <li>• Check tsconfig.json configuration</li>
                    <li>• Restart TypeScript server in IDE</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Port Already in Use</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Kill process using port 3000: <code className="bg-gray-100 px-2 py-1 rounded">lsof -ti:3000 | xargs kill</code></li>
                    <li>• Or use a different port: <code className="bg-gray-100 px-2 py-1 rounded">PORT=3001 npm run dev</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Verification</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Check Installation</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>Application starts without errors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Homepage loads at <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:3000</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Documentation accessible at <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:3000/docs</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Database connection works (check Prisma Studio)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">5</span>
                    <span>No TypeScript errors in IDE</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/quick-start" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🚀 Quick Start</h3>
            <p className="text-gray-600 text-sm">Get up and running quickly with the platform.</p>
          </Link>

          <Link 
            href="/docs/practices" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">✨ Best Practices</h3>
            <p className="text-gray-600 text-sm">Learn development best practices and conventions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

