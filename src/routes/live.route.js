const OpenVidu = require('openvidu-node-client').OpenVidu;
const M = require('../models');
// Environment variable: URL where our OpenVidu server is listening
const OPENVIDU_URL = 'https://localhost:4443';
// Environment variable: secret shared with our OpenVidu server
var OPENVIDU_SECRET = 'MY_SECRET';

module.exports = (router) => {

  router.post('/api/live', async (req, res) => {
    console.log(req.body.nameCourse);
    let sessionName = req.body.nameCourse;
    let role = "PUBLISHER";
    
    const tokenOptions = {role:role};

    // Entrypoint to OpenVidu Node Client SDK
    const OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    OV.createSession().then(session => {
      session.generateToken(tokenOptions).then(token => {
        res.status(200).send({
          0: token
      });
    })
    .catch(error => {
        console.error(error);
      });
    })
    .catch(error => {
        console.error(error);
    });
    
  });

};