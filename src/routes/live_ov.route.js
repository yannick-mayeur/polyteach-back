const OpenVidu = require('openvidu-node-client').OpenVidu;

const M = require('../models');
const OPENVIDU_URL = process.env.OPENVIDU_URL;
const OPENVIDU_SECRET = process.env.OPENVIDU_SECRET;

const OV= new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

module.exports = (router) => {

  router.post('/api/live', async (req, res) => {

    let sessionName = req.body.nameCourse;
    let role = 'PUBLISHER';
    // data for generate token
    const tokenOptions = {data: sessionName,role: role};

    OV.createSession().then(session => {
      session.generateToken(tokenOptions).then(token => {
        res.status(200).send(token);
      })
        .catch(error => {
          console.error(error);
        })
        .catch(error => {
          console.error(error);
        });});
    
  });

  router.get('/api/live/get-token/:sessionId', async (req, res) => {

    let sessionId = req.params.sessionId;
    
    OV.fetch().then(()=>{
      const mySession = OV.activeSessions.find(session => {
        return session.getSessionId() === sessionId;
      });
      const serverData = ''+Date.now;

      const tokenOptions = {
        data: serverData,
        role: 'SUBSCRIBER',
      };

      mySession.generateToken(tokenOptions)
        .then(token => {
          res.status(200).send(token);
        })
        .catch(error => {
          console.error(error);
        });
    }).catch(error => {
      res.status(400).send(error.message);
    }); 
    
  });

  router.post('/api/live/startRecording', async (req, res) => {

    let sessionId = req.body.sessionId;
    let videoName = req.body.sessionName;

    OV.startRecording(sessionId, videoName)
      .then(recording => res.status(200).send(recording.id))
      .catch(error => res.status(400).send(error.message));
  });

  router.get('/api/live/isActive/:sessionId', async (req, res) => {
    let sessionId = req.params.sessionId;

    OV.fetch().then(()=>{

      const active_session = OV.activeSessions;
      if (active_session.length>0){
        const id_session = active_session.map(session=> session.sessionId);
        const session = id_session.filter(id=>
          id === sessionId
        );
        if (session !== undefined) {
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }}
      else { res.status(200).send(false);}
    }).catch(error => res.status(400).send(error.message));
  });

  router.get('/api/live/activelives/', async (req, res) => {
    OV.fetch().then(() => {
      let sessionWithInfos = [];
      const active_session = OV.activeSessions;
      if (active_session.length > 0) {
        active_session.forEach((session, index) => {
          M.Live.getInfos(session.getSessionId())
            .then((infos) => {
              sessionWithInfos.push(infos);
              if(index === active_session.length - 1){
                res.status(200).send(sessionWithInfos);
              }
            }).catch(error => res.status(403).send(error.message));
        });
      } else {
        res.status(200).send([]);
      }}).catch(error => res.status(403).send(error.message));

  }
  );


  router.post('/api/live/stopRecording', async (req, res) => {
    let recordingId = req.body.recordId;
    
    OV.stopRecording(recordingId).then(() => {
      OV.getRecording(recordingId).then(recording => {
        res.status(200).send(recording.status);
      }).catch(error => res.status(400).send(error.message));
    }).catch(error => res.status(400).send(error.message));

  });
};
