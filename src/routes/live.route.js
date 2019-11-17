const OpenVidu = require('openvidu-node-client').OpenVidu;
const Session = require('openvidu-node-client').Session;
const M = require('../models');
// Environment variable: URL where our OpenVidu server is listening
const OPENVIDU_URL = 'localhost:4443';
// Environment variable: secret shared with our OpenVidu server
const OPENVIDU_SECRET = 'MY_SECRET';
const OV= new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

module.exports = (router) => {

  router.post('/api/live', async (req, res) => {

    let sessionName = req.body.nameCourse;
    let role = "PUBLISHER";
    const tokenOptions = {role:this.role};

    // Entrypoint to OpenVidu Node Client SDK
     OV.createSession().then(session => {
        console.log("session returned  ::"+ session);
        session.generateToken(tokenOptions).then(token => {
          console.log("token returned  ::"+ token);
          res.status(200).send(token);
    })
      .catch(error => {
          console.error(error);
      })
  .catch(error => {
       console.error(error);
    });})
    
  });

  router.post('/api/live/startRecording', async (req, res) => {
  
    let sessionId = req.body.sessionId;
    let videoName = req.body.sessionName;

    console.log("Starting recording | {sessionId}=" + sessionId);
    
    OV.startRecording(sessionId, videoName)
        .then(recording => res.status(200).send(recording.id))
        .catch(error => res.status(400).send(error.message));
  });

  router.post('/api/live/stopRecording', async (req, res) => {

    let recordingId = req.body.recordId;
   
    console.log("Stopping recording | {recordingId}=" + recordingId);

    OV.stopRecording(recordingId)
        .then(recording => res.status(200).send(recording.status))
        .catch(error => res.status(400).send(error.message));
     
     });
}
