import { jsxRenderer } from "hono/jsx-renderer";
import "./test.css";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <title>My App</title>
        {/* The CSS will be injected here by the Vite plugin */}
      </head>
      <body class="bg-test">{children}</body>
    </html>
  );
});
