const M = require('../models')

module.exports = (router) => {
    router.post('/login', async (req, res) => {
        M.Login.login(req.body.email, req.body.password).then((data) => {
            console.log(data)
            res.status(200).send(data)
        }).catch(err => {
            console.log(err)
            res.statusMessage = err
            res.status(401).send()
        })
    });

    router.post('/signup', async (req, res) => {
        const data = req.body;
        const isEmailAlreadyUsed = await M.Login.isEmailAlreadyUsed(data.email)
        if (isEmailAlreadyUsed) {
            res.statusMessage = "This email is already used."
            res.status(401).send()
        }

        if (data.email.endsWith('etu.umontpellier.fr')) {
            M.Login.signupStudent(data.email, data.password, data.firstname, data.lastname, data.class).then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err)
                res.statusMessage = err
                res.status(500).send()
            })
        } else if (data.email.endsWith('umontpellier.fr')) {
            M.Login.signupTeacher(data.email, data.password, "", "").then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err)
                res.statusMessage = err
                res.status(500).send()
            })
        } else {
            res.statusMessage = "You are not allowed to create an account with this email."
            res.status(401).send()
        }
    });
}