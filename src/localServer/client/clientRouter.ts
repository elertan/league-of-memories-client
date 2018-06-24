import * as express from 'express';
import Champion from '../../models/Champion';

const router = express.Router();

router.get('/champions', (req, res) => {
  const data = require('../../../assets/data/champions.json');
  // const data = JSON.parse(json);
  const championsObject = data.data;
  const champions = Object.keys(championsObject).map((key: string, i: number) => {
    const champData = championsObject[key];
    const champion = new Champion();
    champion.key = key;
    champion.title = champData.title;
    champion.name = champData.name;
    champion.image = champData.image;
    champion.skins = champData.skins;
    return champion;
  }).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }

    return 0;
  });
  res.send(champions);
});

export default router;
