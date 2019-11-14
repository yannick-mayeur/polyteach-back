const OpenVidu = require('openvidu-node-client').OpenVidu;
const Session = require('openvidu-node-client').Session;
const M = require('../models');
// Environment variable: URL where our OpenVidu server is listening
const OPENVIDU_URL = 'localhost:4443';
// Environment variable: secret shared with our OpenVidu server
var OPENVIDU_SECRET = 'MY_SECRET';

module.exports = (router) => {

  router.post('/api/live', async (req, res) => {
    console.log(req.body.nameCourse);
    let sessionName = req.body.nameCourse;
    let role = "PUBLISHER";
    
    const tokenOptions = {role:this.role};

    // Entrypoint to OpenVidu Node Client SDK
    console.log("OV.urlOpenViduServer" + OV.urlOpenViduServer)

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
}
