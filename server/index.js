import { urlencoded } from 'body-parser';
import express from 'express';

const app = express();
app.use(urlencoded({
    limit: "16kb",
    extended: true
}))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is listening to port:", PORT);
})