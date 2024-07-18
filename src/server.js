const { PORT = 5001 } = process.env;

import app from "./app.js";
const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);