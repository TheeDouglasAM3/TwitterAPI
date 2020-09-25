require('dotenv/config');
const needle = require('needle');
const token = process.env.BEARER_TOKEN; 
const endpointUrl = 'https://api.twitter.com/2/tweets/search/stream/rules'

module.exports = {

    async getFilteredStreamRules()  {
        try {
            // Make request
            const response = await this.getRequest();
            return response
            
        } catch(e) {
            console.log(e);
            process.exit(-1);
        }
    },

    async getRequest() {

        const params = {

        } 

        const res = await needle('get', endpointUrl, params, { headers: {
            "authorization": `Bearer ${token}`
        }})

        if(res.body) {
            return res.body
        } else {
            throw new Error ('Unsuccessful request')
        }       
    },
}