const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

const app = express();
const port = 1234;

app.get('/totalFunds/', cors(corsOptions), async (req, res) => {
  const urlResponse = await axios.get(req.query.url);
  const $ = cheerio.load(urlResponse.data);
  const funds = $('span.total_donations').text().trim();
  const campaignNumber = $('input#campaign_id').val();
  const fundersRes = await fetch(
    `https://fonzip.com/ahbap/kampanya/${campaignNumber}/bagiscilar?start_num=1`
  );
  const funders = await fundersRes.json();
  res.json({
    funds,
    funders,
    campaignNumber,
    url: req.query.url,
  });
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});
