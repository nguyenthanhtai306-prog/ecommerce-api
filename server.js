require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(Server is running on port $ { PORT });
});

server.on("error", (error) => {
    console.error("Server error:", error);
});

server.on("close", () => {
    console.log("Server closed");
});