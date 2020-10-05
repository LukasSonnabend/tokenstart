const jwt = require("jsonwebtoken");


const auth = async  (req, res, next) => {
    try {
    const token = req.header("refresh-token");
    if (!token)
    return res.status(401).json({msg: "Kein Refresh-Token. Anfrage abgewiesen"});
    
    const verified = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    if(!verified)
    return res.status(401).json({msg: "Token ungültig. Anfrage abgewiesen"});

    req.user = verified.id;
    next();

    } catch (err) {
        res.status(500).json({error: err.message});
    }

}

module.exports = auth;