const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = {
  garage: [
    {
      "name": "Tesla",
      "color": "#e6e6fa",
      "id": 1,
    },
    {
      "name": "BMW",
      "color": "#fede00",
      "id": 2,
    },
    {
      "name": "Mersedes",
      "color": "#6c779f",
      "id": 3,
    },
    {
      "name": "Ford",
      "color": "#ef3c40",
      "id": 4,
    },
  ],
  winners: [
    {
      id: 1,
      wins: 1,
      time: 10,
    }
  ]
};

const state = { velocity: {}, blocked: {} };

app.patch('/.netlify/functions/myServer/engine', (req, res) => {
  const { id, status } = req.query;

  if (!id || !status || !/^(started)|(stopped)|(drive)$/.test(status)) {
    return res.status(400).json({ error: 'Wrong parameters' });
  }

  if (!db.garage.find(car => car.id === +id)) {
    return res.status(404).json({ error: 'Car not found' });
  }

  const distance = 500000;
  if (status === 'drive') {
    const velocity = state.velocity[id];

    if (!velocity) return res.status(404).json({ error: 'Engine parameters not found' });
    if (state.blocked[id]) return res.status(429).json({ error: 'Drive already in progress' });

    state.blocked[id] = true;

    const x = Math.round(distance / velocity);

    if (new Date().getMilliseconds() % 3 === 0) {
      setTimeout(() => {
        delete state.velocity[id];
        delete state.blocked[id];
        res.status(500).json({ error: 'Car stopped suddenly' });
      }, Math.random() * x ^ 0);
    } else {
      setTimeout(() => {
        delete state.velocity[id];
        delete state.blocked[id];
        res.status(200).json({ success: true });
      }, x);
    }
  } else {
    const x = req.query.speed ? +req.query.speed : Math.random() * 2000 ^ 0;

    const velocity = status === 'started' ? Math.max(50, Math.random() * 200 ^ 0) : 0;

    if (velocity) {
      state.velocity[id] = velocity;
    } else {
      delete state.velocity[id];
      delete state.blocked[id];
    }

    res.status(200).json({ velocity, distance });
  }
});

module.exports = app;