module.exports = {
  docuseal: {
    // User's actual DocuSeal instance
    apiUrl: 'https://docuseal.makertoo.win',
    // MCP server URL (can be configured separately)
    mcpUrl: process.env.MCP_SERVER_URL || 'http://localhost:3001' 
  },
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100
    },
    tls: {
      minVersion: 'TLSv1.3',
      rejectUnauthorized: true
    }
  }
};