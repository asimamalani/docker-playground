const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient({
    host: 'redis-server'
});
client.set('visits', 0);

app.get('/', (_req, res) => {
    client.get('visits', (err, visits) => {
        if (err) {
            res.send('Something went wrong. Please try again later...');
            return;
        }
        res.send(`Number of visits: ${visits}`);
        client.set('visits', parseInt(visits) + 1);
    });
});

const port = 8080;
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})