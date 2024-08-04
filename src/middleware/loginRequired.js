const { checkAuth } = require('../auth/supabase');

const loginRequired = async (req, res, next) => {
    try {
        const id = await checkAuth(req);
        if (!id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: error.message});
    }
}

module.exports = loginRequired;