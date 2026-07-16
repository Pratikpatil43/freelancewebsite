let appPromise;

module.exports = async (req, res) => {
  appPromise ||= import('../server/server.js').then(({ default: app }) => app);
  const app = await appPromise;
  return app(req, res);
};
