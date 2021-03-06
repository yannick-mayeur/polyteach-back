const M = require('../models');
module.exports = (router) => {

  router.get('/api/live/data/:sessionId', async (req, res) => {

    let sessionId = req.params.sessionId;
    M.Live.getInfos(sessionId)
      .then((row) => {
        res.status(200).send(row);
      })
      .catch((err) => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.get('/api/live/lives', async (req, res) => {
    M.Live.getAllSessions()
      .then((rows) => {
        res.status(200).send(rows);
      })
      .catch((err) => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.post('/api/live/save', async (req, res) => {

    M.Live.create(req.body)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  });

  router.post('/api/live/ended', async (req, res) => {
    M.Live.updateLiveStatus(req.body.sessionId)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  });

};    
