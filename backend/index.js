import express from "express"
import db from "./db/Db.js"
import CreateProduct from "./routes/ProductsRoutes.js";
import { upload } from "./middleware/multer.js";
import dotenv from "dotenv"
import cors from "cors"
const app = express()

dotenv.config()
//middleware
app.use(express.json({ limit: "50mb", extended: true }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.static("./uploads"))
app.use(cors({methods:["GET","POST","PUT","DELETE"],
    origin:"*",
  }))
//routes
app.use("/v1/products",upload.single('image'),CreateProduct);

app.listen(3000, () => 
    {
       db();
       console.log("Server running on port 3000");
   }
)