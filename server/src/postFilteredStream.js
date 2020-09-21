require('dotenv/config');
const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal: 
// export BEARER_TOKEN='YOUR-TOKEN' 
const token = process.env.BEARER_TOKEN; 

const endpointUrl = 'https://api.twitter.com/2/tweets/search/stream/rules'

async function getRequest() {

    // Edit query parameters below
    const params = {
      "add": [
        {"value": "cat has:media", "tag": "cats with media"},
        {"value": "cat has:media -grumpy", "tag": "happy cats with media"},
        {"value": "meme", "tag": "funny things"},
        {"value": "meme has:images"}
      ]
    } 

    const res = await needle('post', endpointUrl, params, { headers: {
        "authorization": `Bearer ${token}`,
        "Content-type": "application/json"
    }})

    if(res.body) {
        return res.body;
    } else {
        throw new Error ('Unsuccessful request')
    }
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.log(response)

    } catch(e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
  })();