import app from "./app.js";
import { env } from "./config/env.js";
env

const PORT = env.PORT || 5000; 

app.listen(PORT, ()=> {
    console.log(`App is running on port: ${PORT}`)
})