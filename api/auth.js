// api/auth.js
export default async function handler(req, res) {
    // CORS biar bisa dipanggil dari mana aja
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Key');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // 🔑 Ambil auth_key dari environment variable Vercel
    const VALID_AUTH_KEY = process.env.MY_AUTH_KEY;
    
    // Cek auth_key dari request header
    const requestAuthKey = req.headers['x-auth-key'] || req.body?.auth_key;
    
    if (requestAuthKey !== VALID_AUTH_KEY) {
        return res.status(403).json({
            success: false,
            error: 'LICENSE_INVALID',
            message: 'Auth key salah!'
        });
    }
    
    // Kalo bener, kasih response
    res.status(200).json({
        success: true,
        message: 'Auth key valid!',
        data: {
            status: 'active',
            expires: 'permanent'
        }
    });
  }
