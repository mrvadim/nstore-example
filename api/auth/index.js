const jwt = require("jsonwebtoken");

// function isAdmin(request, response, next) {
//   const secret = process.env.SECRET;
//   const token = request.headers['x-access-token'];
//   if (!token) return response.status(401).send({auth: false, error: 'empty token'});
//   jwt.verify(token, secret, function (error, decoded) {
//     if (error) return response.status(401).send({auth: false, error: 'wrong token'});
//     if (decoded.role_id === 1) next();
//     else return response.status(401).send({auth: false, error: 'not admin'});
//   });
// }

module.exports = {
  user: (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) {
      return response
        .status(401)
        .send({ error: "auth", message: "empty token" });
    }

    jwt.verify(authorization, process.env.SECRET || "1234567890", function(
      error,
      decoded
    ) {
      if (error) {
        return response
          .status(401)
          .send({ error: "auth", message: "wrong token" });
      }

      request.params.id = decoded.user_id;
      next();
    });
  }
};
