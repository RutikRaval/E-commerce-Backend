exports.isAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role === "admin") {
        next()
    }
    else {
        return res.status(404).json({ error: "You are not Authorised" })
    }
}