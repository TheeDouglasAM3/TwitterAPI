require('dotenv/config');
const needle = require('needle');
const token = process.env.BEARER_TOKEN;
const endpointUrl = 'https://api.twitter.com/2/tweets/search/stream'

module.exports = {
  async index() {
    const sampledStream = this._streamConnect()
    let timeout = 0;
    sampledStream.on('timeout', () => {
      // Reconnect on error
      console.warn('A connection error occurred. Reconnecting…');
      setTimeout(() => {
        timeout++;
        streamConnect(token);
      }, 2 ** timeout);
      streamConnect(token);
    })
  },

  _streamConnect() {

    const options = {
      timeout: 20000
    }

    const stream = needle.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }, options);

    stream.on('data', data => {
      try {
        const json = JSON.parse(data);
        console.log(json);
      } catch (e) {
        // Keep alive signal received. Do nothing.
      }
    }).on('error', error => {
      if (error.code === 'ETIMEDOUT') {
        stream.emit('timeout');
      }
    });

    return stream;
  }
}