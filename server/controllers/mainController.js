let bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        let { username, password } = req.body
        const db = req.app.get('db')
        console.log("hit")
        const personArray = await db.find_person_by_username([username]).catch(error => console.log(error))
        if(personArray[0]) {
            return res.status(200).send({message: 'Email is already in use sorry'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let newPersonArray = await db.create_person([username, hash])
        req.session.user = {username: newPersonArray[0].username, password: newPersonArray[0].password}
        return res.status(200).send({
            message: 'You are logged in',
            userData: req.session.user,
            loggedIn: true
        })
    },

    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        const personArr = await db.find_person_by_username([username]).catch(error => console.log(error))
        if(personArr.length === 0) {
            return res.status(201).send({message: 'Account not found'})
        }
        const result = bcrypt.compareSync(password, personArr[0].password)
        if(!result) {
            return res.status(200).send({ message: "incorrect password" })
        }
        req.session.user = { id: personArr[0].id, userName: personArr[0].username}
        res.status(200).send({
            message: 'Log in successful',
            loggedIn: true
        })
    },

    userData: (req, res) => {
        if(req.session.user) {
            return res.status(200).send(req.session.user)
        } else {
            return res.status(401).send('Please Log In')
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send("User is logged out")
    },
    
    getPosts: (req, res) => {
        let db = req.app.get('db')
        db.get_posts()
        .then(posts => res.status(200).send(posts))
        .catch((error) => res.status(500).send(error))
    },

    getPostById: (req, res) => {
        const { id } = req.params 
        let db = req.app.get('db')
        db.get_post_by_id([id])
        .then(post => res.status(200).send(post))
        .catch(error => res.status(500).send(error))
    }
}