require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Connect MongoDB Atlas
connectDB();

const PORT = process.env.PORT || 5000;
console.log("Starting server...", process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
