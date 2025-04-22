const express = require('express');
const app = express();
const PORT = 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.post('/benchmark', (req, res) => {
  console.log('Received benchmark request:', req.body);
  
  // Fix property names to match the curl request format
  const {
    model,
    maxCompletedRequests,
    requestIntervalGeneratorType, // Note this different name
    requestLengthGeneratorType,   // Note this different name
    maxTokens
  } = req.body;
  
  // Mock successful response with fake results
  setTimeout(() => {
    res.json({
      success: true,
      results: {
        modelName: model,
        metrics: {
          latency: Math.random() * 100,
          throughput: Math.random() * 50,
          totalRequests: maxCompletedRequests,
          totalTokens: Math.floor(Math.random() * maxTokens)
        },
        timestamp: new Date().toISOString()
      }
    });
  }, 2000); // Simulate processing time
});

// Get benchmark results
app.get('/results', (req, res) => {
  res.json({
    success: true,
    results: {
      // Your stored results here
      latestBenchmarks: []
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 