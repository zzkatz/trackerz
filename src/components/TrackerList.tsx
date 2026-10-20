import type { Tracker } from '../types'

interface TrackerListProps {
  tracker: Tracker[]
}

export function TrackerList({ tracker }: TrackerListProps) {
  if (tracker.length === 0) {
    return <p className="italic text-gray-500">No trackers found. Add some!</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tracker Collection</h2>

      {tracker.map((track) => (
        <div
          key={track.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-md"
        >
          <p className="mb-2 text-lg font-bold">{track.id}</p>

          <p className="text-gray-700">{track.title}</p>

          <p className="mb-2 text-sm text-gray-500">
            {new Date(track.date).toLocaleString()}
          </p>

          <p className="text-gray-700">{track.content}</p>
        </div>
      ))}
    </div>
  )
}

/* 

Error: Failed to load url ../serverActions/trackerAction (resolved id: ../serverActions/trackerAction) in E:/trackerz/src/routes/index.tsx. Does the file exist?
    at loadAndTransform (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:20173:31) {
  code: 'ERR_LOAD_URL',
  runnerError: Error: RunnerError
      at reviveInvokeError (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:557:64)
      at Object.invoke (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:630:11)
      at async ModuleRunner.getModuleInformation (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:1228:7)
      at async request (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:1245:83)
      at E:/trackerz/src/routes/index.tsx:4:1
      at async ESModulesEvaluator.runInlinedModule (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:825:3)
      at async ModuleRunner.directRequest (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:1288:59)
      at async ModuleRunner.cachedRequest (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:1195:73)
      at E:/trackerz/src/routeTree.gen.ts:12:1
      at async ESModulesEvaluator.runInlinedModule (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:825:3)
}




Error: Failed to load url ../serverActions/trackerAction (resolved id: ../serverActions/trackerAction) in E:/trackerz/src/routes/index.tsx. Does the file exist?
    at loadAndTransform (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:20173:31) {
  code: 'ERR_LOAD_URL',
  runnerError: Error: RunnerError
      at reviveInvokeError (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:557:64)
      at Object.invoke (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:630:11)
      at async ModuleRunner.getModuleInformation (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:1228:7)
      at async request (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:1245:83)
      at E:/trackerz/src/routes/index.tsx:4:1
      at async ESModulesEvaluator.runInlinedModule (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:825:3)
      at async ModuleRunner.directRequest (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:1288:59)
      at async ModuleRunner.cachedRequest (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:1195:73)
      at E:/trackerz/src/routeTree.gen.ts:12:1
      at async ESModulesEvaluator.runInlinedModule (file:///E:/trackerz/node_modules/.pnpm/vite@8.3.4_@types+node@22.20.5_jiti@2.7.0/node_modules/vite/dist/node/module-runner.js:825:3)
}


*/
