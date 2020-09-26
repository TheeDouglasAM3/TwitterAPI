require('dotenv/config');
const needle = require('needle');
const token = process.env.BEARER_TOKEN;
const endpointUrl = 'https://api.twitter.com/2/tweets/search/stream/rules'

module.exports = {

  async index() {
    try {
      const res = await needle('get', endpointUrl, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })

      if (res.body) {
        return res.body
      } else {
        throw new Error('Unsuccessful request')
      }

    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
  },

  async store() {
    try {
      const params = {
        "add": [
          { "value": "cat has:media", "tag": "cats with media" },
          { "value": "cat has:media -grumpy", "tag": "happy cats with media" },
          { "value": "meme", "tag": "funny things" },
          { "value": "meme has:images" }
        ]
      }

      const res = await needle('post', endpointUrl, params, {
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-type": "application/json"
        }
      })

      if (res.body) {
        return res.body;
      } else {
        throw new Error('Unsuccessful request')
      }

    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
  },

  async delete() {

    const ids = [
      "1307774743534333965", 
      "1307774743534333964", 
      "1307774743534333966",
      "1307774743534333963",
      "1308505097438101516"
    ];

    const data = {
      "delete": {
        "ids": ids
      }
    }

    const response = await needle('post', endpointUrl, data, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })

    if (response.statusCode !== 200) {
      throw new Error(response.body);
    }

    return (response.body);
  },

}