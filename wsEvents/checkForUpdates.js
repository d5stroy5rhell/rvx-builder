const { getDownloadLink } = require('../utils/FileDownloader.js');

const currentVersion = 'v4.0.3.1';

/**
 * @param {import('ws').WebSocket} ws
 */
module.exports = async function checkForUpdates(ws) {
  const builderVersion = (
    await getDownloadLink({ owner: 'YT-Advanced', repo: 'rvx-builder' })
  ).version;

  if (builderVersion !== currentVersion)
    ws.send(
      JSON.stringify({
        event: 'notUpToDate',
        builderVersion,
        currentVersion
      })
    );
  else {
    ws.send(
      JSON.stringify({
        event: 'upToDate',
        currentVersion
      })
    );
  }
};

module.exports.currentVersion = currentVersion;
