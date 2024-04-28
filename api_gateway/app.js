const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());


const service_authServiceProxy = createProxyMiddleware({
  target: "http://localhost:3005",
  changeOrigin: true,
});
const service_eventServiceProxy = createProxyMiddleware({
  target: "http://localhost:3006",
  changeOrigin: true,
});
const service_typeServiceProxy = createProxyMiddleware({
    target: "http://localhost:3010",
    changeOrigin: true,
  });

  const service_reservationServiceProxy = createProxyMiddleware({
    target: "http://localhost:3007",
    changeOrigin: true,
  });

  const service_contactServiceProxy = createProxyMiddleware({
    target: "http://localhost:3009",
    changeOrigin: true,
  });
  const service_paiementServiceProxy = createProxyMiddleware({
    target: "http://localhost:3011",
    changeOrigin: true,
  });
  app.use("/authService", service_authServiceProxy);
  app.use("/eventService", service_eventServiceProxy);
  app.use("/reservationService", service_reservationServiceProxy);
  app.use("/contactService", service_contactServiceProxy);
  app.use("/paiementService", service_paiementServiceProxy);
  app.use("/typeService", service_typeServiceProxy);
  

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});