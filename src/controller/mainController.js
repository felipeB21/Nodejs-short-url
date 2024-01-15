const { where } = require("sequelize");
const db = require("../database/models/index");
const shortid = require("shortid");

module.exports = {
  index: async (req, res) => {
    const userId = req.session.userId;
    const urls = await db.Url.findAll({
      where: { user_id: userId },
    });
    const emailExists = req.session.email;
    res.render("index", {
      emailExists: emailExists ? emailExists : null,
      urls: urls ? urls : null,
    });
  },
  login: (req, res) => {
    const emailExists = req.session.email;
    res.render("login", {
      emailExists: emailExists ? emailExists : null,
    });
  },
  register: (req, res) => {
    const emailExists = req.session.email;
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    req.session.errors = null;
    req.session.oldData = null;
    res.render("register", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      emailExists: emailExists ? emailExists : null,
    });
  },
  processRegister: async (req, res) => {
    try {
      const newUser = await db.User.create({
        email: req.body.email,
        password: req.body.password,
      });

      if (newUser) {
        req.session.userId = newUser.id;
        req.session.email = newUser.email;
      }
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).send("The email is already registered.");
      }
      res.status(500).send("Error durante el registro");
    }
    res.redirect("/");
  },
  proccesLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const getUser = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (getUser && getUser.password === password) {
        req.session.userId = getUser.id;
        req.session.email = getUser.email;

        res.redirect("/");
      } else {
        res.status(401).send("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al procesar el inicio de sesión:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
  postUrl: async (req, res) => {
    const fullUrl = req.body.url;
    const shortUrl = shortid.generate();
    const userId = req.session.userId;

    if (!userId) {
      return res.redirect("/signin");
    }

    const createUrl = await db.Url.create({
      full_url: fullUrl,
      short_url: shortUrl,
      user_id: userId,
    });

    if (createUrl) {
      res.redirect("/");
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
