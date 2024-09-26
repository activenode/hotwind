import { Hono } from "hono";
import { renderer } from "./renderer";
import { serveStatic } from "hono/cloudflare-pages";

const app = new Hono();

app.use("/assets/*", serveStatic());

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1 className="text-4xl font-bold text-blue-600">Hello!</h1>);
});

export default app;
