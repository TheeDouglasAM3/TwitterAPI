require('dotenv/config');
const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal: 
// export BEARER_TOKEN='YOUR-TOKEN' 
const token = process.env.BEARER_TOKEN; 

const endpointUrl = 'https://api.twitter.com/oauth2/token?grant_type=client_credentials '

async function getRequest() {

    // Edit query parameters below
    const params = {

    } 

    const res = await needle('post', endpointUrl, params, { headers: {
        'authorization': `Basic ${process.env.BASIC_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }})
    
    if(res.body) {
      return res.body
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