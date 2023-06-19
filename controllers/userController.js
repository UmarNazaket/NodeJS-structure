var connection = require('../connection');
var bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MonkeyLearn = require('monkeylearn');

async function loginUser(req, res){
connection.getConnection(async (err, con)=>{
    if(err){}
    else{
        const query = `Select * from user where username = '${req.body.user.username}'`;
        con.query(query, async (err, dbRes)=>{
            if(dbRes && dbRes[0]){
                const isCorrectPass = await bycrypt.compare(req.body.user.password, dbRes[0].password);
                if(isCorrectPass){
                    const secretKey = '1234umar'
                    const token = jwt.sign({username: dbRes[0].username , password: dbRes[0].password}, secretKey,{expiresIn: '1h'})
                    return res.json({user: dbRes[0], token: token});
                }else{
                    return res.json({message: "Incorrect Password"})
                }

            }else{
                return res.json({message: "User doesnot exist"})
            }
            
        });
    }
})
}

async function registerUser(req, res){
    connection.getConnection(async (err, con)=>{
        if(err){}
        else{
            const pass = bycrypt.hashSync(req.body.user.password, 10)
            const query = `INSERT INTO user (\`username\`, \`password\`) VALUES ('${req.body.user.username}', '${pass}')`;

        con.query(query, async (err, dbRes)=>{
            if(err){
                    return res.json({message: "Some errr", err: err});
            }else{
                return res.json(dbRes)
            }
            
        });
        }
    })   
}

function getEmail(req, response) {
const ml = new MonkeyLearn('eafb5091466111a0419db727f6f9c977fac66db9')
let model_id = 'ex_YWBmKCP9'
ml.extractors.extract(model_id, [req.body.text]).then(res => {
    response.json(res.body)
})
}

function getSentiments(req, response) {
const ml = new MonkeyLearn('eafb5091466111a0419db727f6f9c977fac66db9')
let model_id = 'cl_NDBChtr7'
ml.classifiers.classify(model_id, [req.body.text]).then(res => {
    response.json(res.body)
})
}

module.exports = {loginUser,registerUser,getEmail,getSentiments};