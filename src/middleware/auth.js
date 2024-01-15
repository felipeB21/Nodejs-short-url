module.exports = (req, res, next) => {
  const emailExists = req.session.email;
  if (!emailExists) {
    res.redirect("/signin");
  } else {
    next();
  }
};
