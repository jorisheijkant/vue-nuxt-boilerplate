const STORYBLOK_TOKEN = 'vIxSxIvAUpbqD8V7NrciPAtt';
const axios = require('axios');
const fs = require('fs');
const path = require('path');

axios.get(`https://api.storyblok.com/v1/cdn/stories/home?version=published&token=${STORYBLOK_TOKEN}&cv=1554125184`)
    .then(res => {
        fs.writeFileSync('static/data/data.json', JSON.stringify(res.data));
    })
    .catch(e => console.log(e));