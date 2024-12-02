import express from "express"
import env from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/index.router.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
env.config();
const port = process.env.PORT || 3006;
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/api', router);

app.listen(port, (err) => {
    if (!err) {
        console.log(`your app is listen in http:/localhost:${port}/api`);
    }
})

