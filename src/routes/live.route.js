const OpenVidu = require('openvidu-node-client').OpenVidu;
const M = require('../models');
module.exports = (router) => {

  router.post('/api/live', async (req, res) => {
    console.log(req.body.nameCourse);
    let sessionName = req.body.nameCourse;
    let role = "PUBLISHER";
    
    const tokenOptions = {role:role};

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