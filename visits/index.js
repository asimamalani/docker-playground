const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient();
client.set('visits', '0');

app.get('/', (req, res) => {
    client.get('visits', (err, visists) => {
        if (err) {
            res.send('Something went wrong. Please try again later...');
            return;
        }
        res.send(`Number of visits: ${visists}`);
    });
});

const port = 8080;
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})