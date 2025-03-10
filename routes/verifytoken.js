function verifytoken(req,res,next)
  {
    if(!req.headers.authorization)
    {
      return res.status(401).send('Unauthorized Subject')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token=='null')
    {
      return res.status(401).send('Unauthorized request')
    }
    try 
    {
      const payload = jwt.verify(token, process.env.TSECRETKEY);
      console.log(payload)
      if(!payload)
      {
        return res.status(401).send('Unauthorized Request')
      }
      req.user = payload;//id,role
      next();
    } 
    catch (err) 
    {
      res.status(400).json({ message: "Invalid Token" });
    }
  }
  module.exports = verifytoken;