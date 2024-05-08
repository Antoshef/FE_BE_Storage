import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, the proxy will handle it
    externalResolver: true, // Indicate that Next.js should not try to resolve API routes internally
  },
};

const proxy = createProxyMiddleware({
  target: "http://localhost:3001", // Adjust if your port is different
  changeOrigin: true,
  pathRewrite: {
    "^api": "/", // Rewrite URL: remove '/api' prefix if needed
  },
});

export default (req: any, res: any) => proxy(req, res);
