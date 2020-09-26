require('dotenv/config');
const needle = require('needle');
const token = process.env.BEARER_TOKEN;
const endpointUrl = 'https://api.twitter.com/2/tweets/search/stream/rules'
const rules = [
  { 'value': 'dog has:images -is:retweet', 'tag': 'dog pictures' },
  { 'value': 'cat has:images -grumpy', 'tag': 'cat pictures' },
]

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
        "add": rules
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
    const rules = await this.index()
    if (!Array.isArray(rules.data)) {
      return null;
    }

    const ids = rules.data.map(rule => rule.id);

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