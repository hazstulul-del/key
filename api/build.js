// api/build.js
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // 🔑 Validasi auth_key
    const VALID_AUTH_KEY = process.env.MY_AUTH_KEY;
    const requestAuthKey = req.headers['x-auth-key'] || req.body?.auth_key;
    
    if (requestAuthKey !== VALID_AUTH_KEY) {
        return res.status(403).json({
            success: false,
            error: 'LICENSE_INVALID',
            message: 'Auth key tidak valid!'
        });
    }
    
    const { zipUrl, userId, mode } = req.body;
    
    // Queue system sederhana (pake memory, bakal reset tiap deploy)
    // Lo bisa tambahin database nanti
    
    res.json({
        success: true,
        queueId: `${Date.now()}_${userId}`,
        message: 'Build ditambahkan ke antrian',
        status: 'queued'
    });
}
