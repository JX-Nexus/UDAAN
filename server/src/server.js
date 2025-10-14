import dotenv from "dotenv"
import {app} from "./app.js" 
import {connectDB} from "./db/index.js";


dotenv.config({
    path: './.env'
})


app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>UDAAN Server</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', sans-serif;
          background: radial-gradient(circle at top, #101010, #050505);
          color: #f5f5f5;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #00e0ff, #0077ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          font-size: 1.1rem;
          color: #aaa;
          margin-top: 10px;
        }
        .footer {
          position: absolute;
          bottom: 15px;
          font-size: 0.85rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>🚀 UDAAN Server Active</h1>
      <p>API is running smooth and alive. Let’s build something crazy.</p>
      <div class="footer"> ${new Date().getFullYear()} </div>
    </body>
    </html>
  `);
});

connectDB()
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at : http://localhost:${process.env.PORT}`);
    })
