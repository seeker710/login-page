const mongoose = require('mongoose');

const URI = process.env.URI;

mongoose.set("strictQuery", false);
mongoose.connect(URI).then(
    () => console.log(`connected to database`)
).catch(
    () => console.log(`failed to connect`)
)