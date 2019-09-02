const router = require('express').Router()
let User = require('../modules/users')
const multer = require('multer')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')



function auth(req,res,next){
    const token=req.header('X-Auth-Token')
    console.log(token)
    if(!token) res.status(401).json('unauthorization')
    try{
        const decode=jwt.verify(token,'user_myJwtSecret')
        req.user=decode
        next()
    }catch(e){
        res.status(400).json('token invalid')
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err))
})

router.route('/add').post((req, res) => {
    const login = req.body.login
    const password = req.body.password
    
    const newUser = new User({
        login,
        password
    })
              //create salt and hash
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then((user) =>{ 
                        jwt.sign(
                            {id:user.id,
                            login:user.login,
                            username:user.username,
                            image:user.image
                            },
                            "user_myJwtSecret",
                            {expiresIn:3600},
                            (err,token)=>{
                                if(err) {throw err}
                                user.set('token',token)
                                res.json(user)})
                            }
                        )
                        .catch(err => res.status(400).json('Error' + err))
                        
                       
                })
            })
})
router.route('/addimage/:id').put(upload.single('images'),auth, (req, res) => {
    User.findByIdAndUpdate(req.params.id).then(user => {
        user.image = req.file.path
        user.save()
            .then(() => res.json(user.image))
            .catch((err) => { res.status(400).json('Error: ' + err) })
    })
        .catch((err) => { res.status(400).json('Error: ' + err) })

})

router.route('/addlogin/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id).then(user => {
        user.login = req.body.login
        user.save()
            .then(() => res.json('user updated'))
            .catch((err) => { res.status(400).json('Error: ' + err) })
    })
        .catch((err) => { res.status(400).json('Error: ' + err) })

})
router.route('/password/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id).then(user => {
        user.password = req.body.password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err
                user.password = hash
                user.save()
                    .then(res.json('password modified'))
                    .catch(err => res.status(400).json('Error' + err))
            })
            
    })
})
})

router.route('/login').post((req, res) => {
    const password=req.body.password 
    const login= req.body.login
    User.findOne({login})
        .then(user => {
            if(!user) return res.status(400).json('Err:')
            bcrypt.compare(password,user.password)
            .then(match=>{
                if(!match) return res.status(400).json('err')
                jwt.sign(
                    {id:user.id,
                     login:user.login,
                     image:user.image,
                     username:user.username,
                    },
                    "user_myJwtSecret",
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) {throw err}
                        user.set('token',token)
                        res.json(user)
                    })
            })
        })
        .catch((err) => { res.status(400).json('Error: ' + err) })

})
router.route('/getimage/:id').get((req, res) => {
    User.findById(req.params.id).then(user => {
        res.json(user)
    })
})

router.route('/addpassword/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id).then(user => {
        user.password = req.body.password
        user.save()
            .then(() => res.json('user updated'))
            .catch((err) => { res.status(400).json('Error: ' + err) })
    })
        .catch((err) => { res.status(400).json('Error: ' + err) })

})
router.route('/addusername/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id).then(user => {
        user.username = req.body.username
        user.save()
            .then(() => res.json('user updated'))
            .catch((err) => { res.status(400).json('Error: ' + err) })
    })
        .catch((err) => { res.status(400).json('Error: ' + err) })

})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch((err) => { res.status(400).json('Error: ' + err) })
})
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('user deleted.'))
        .catch((err) => { res.status(400).json('Error: ' + err) })
})

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.login = req.body.login
            user.password = req.body.password
            user.username = req.body.username
            user.image = req.body.image
            user.save()
                .then(() => res.json('user updated'))
                .catch((err) => { res.status(400).json('Error: ' + err) })
        })
        .catch((err) => { res.status(400).json('Error: ' + err) })
})
router.route('/token').post((req,res)=>{
    const login=req.body.login
    User.findOne({login})
    .then(user=>{
        jwt.sign(
            {id:user.id,
             login:user.login,
             image:user.image,
             username:user.username,
            },
            "user_myJwtSecret",
            {expiresIn:3600},
            (err,token)=>{
                if(err) {throw err}
                res.json(token)
            })
    })
})




module.exports = router