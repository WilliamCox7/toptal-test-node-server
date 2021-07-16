const modules = require("~/modules");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy({ usernameField: "email" }, (email, password, done) => {

  try {

    const user = await modules.findUser(email);
    if (!user) return done(null, false, { message: "Incorrect Username" });
  
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return done(null, false, { message: "Incorrect Password" });
  
    return done(null, user);

  } catch(err) {

    return done(err);

  }

});