const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const app = express();

// Security middleware
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(rateLimit(config.security.rateLimit));

const { apiUrl, mcpUrl } = config.docuseal;

app.post('/api/templates', async (req, res) => {
  try {
    const response = await axios.post(`${apiUrl}/templates`, req.body, {
      headers: {
        'X-Auth-Token': process.env.DOCUSEAL_API_KEY,
        'Content-Type': 'application/json'
      },
      httpsAgent: new (require('https').Agent)(config.security.tls)
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Template creation failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`MCP Server running at ${mcpUrl}`);
  console.log(`Connecting to DocuSeal API at ${apiUrl}`);
});