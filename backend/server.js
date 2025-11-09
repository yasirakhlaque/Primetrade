import { DBConnection } from './db.js';
import dotenv from "dotenv";
import app from './app.js';

dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("Missing required environment variables");
    process.exit(1);
}
DBConnection();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});