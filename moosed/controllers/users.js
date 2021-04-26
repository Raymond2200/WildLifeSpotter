const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

module.exports = {
  create,
  login
};

async function create(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    const user = await User.create({username: req.body.username, email:req.body.email, password:hashedPassword,});

    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    res.json("200 OK" + token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();

    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    res.json(token)
  } catch {
    res.status(400).json('Bad Credentials');
  }
}