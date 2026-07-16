// Keep this import opaque so Vercel's CommonJS bundler cannot rewrite it to require().
const dynamicImport = new Function('modulePath', 'return import(modulePath)');
let appPromise;

module.exports = async (req, res) => {
  appPromise ||= dynamicImport('../server/server.js').then(({ default: app }) => app);
  const app = await appPromise;
  return app(req, res);
};
