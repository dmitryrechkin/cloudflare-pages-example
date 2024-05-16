import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
        <script type='module' src='/static/main.js'></script>
        <title>{title}</title>
      </head>
      <body id="root">{children}</body>
    </html>
  )
})
