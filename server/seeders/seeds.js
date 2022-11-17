const db = require('../config/connection');
const { Trip } = require('../models');
const travelSeeds = require('./travelSeeds.json');

db.once('open', async () => {
  await Trip.deleteMany({});
  await Trip.create(travelSeeds);

  console.log('all done!');
  process.exit(0);
});
