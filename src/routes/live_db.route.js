const M = require('../models');
module.exports = (router) => {

    /***********  LIVE INFORMATION  **********/
    router.get('/api/live/infos/:sessionId', async (req, res) => {

        let sessionId = req.params.sessionId;
        M.Live.getInfos(sessionId)
          .then((live) => res.status(200).send(live))
          .catch((err) => {
            res.statusMessage = err;
            res.status(500).send();
          });
      });
  
    /***********  RETRIEVE ACTIVE SESSIONS  **********/
    router.get('/api/live/lives', async (req, res) => {
        M.Live.getAllSessions()
          .then((rows) => {
            res.status(200).send(rows)
          })
          .catch((err) => {
            res.statusMessage = err;
            res.status(500).send();
          });
    });
     /***********  SAVING LIVE   **********/
     router.post('/api/live/save', async (req, res) => {
       console.log("herrreee --------");
       const nameTeacher="";
      //  const nameTeacher = req.user.firstname + " " + req.user.lastname;
        M.Live.create(req.body, nameTeacher)
          .then(() => res.sendStatus(200))
          .catch((err) => {
            res.statusMessage = err;
            res.sendStatus(500);
          });
      });

     /***********  ADD TIMESTAMP FOR A LIVE'S END   **********/
     router.post('/api/live/ended', async (req, res) => {
       console.log("body.sessionId  "+ req.body.sessionId)
      M.Live.updateLiveStatus(req.body.sessionId)
        .then(() => res.sendStatus(200))
        .catch((err) => {
          res.statusMessage = err;
          res.sendStatus(500);
        });
    });

    }    