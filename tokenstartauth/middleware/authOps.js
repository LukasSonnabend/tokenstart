const jwt = require("jsonwebtoken");


const authOps = async (req, res, next) => {
    try {
    const token = req.header("auth-token");
    if (!token)
    return res.status(401).json({msg: "Kein Auth-Token. Anfrage abgewiesen"});
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified)
    return res.status(401).json({msg: "Token ungültig. Anfrage abgewiesen"});

    req.user = verified.id;
    next();

    } catch (err) {
        res.status(500).json({error: err.message});
    }

}

module.exports = authOps;