import mongoose from "mongoose";
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const ConnectDb = async () => {
    try {
        const connectionInstence = await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
        });
        console.info(`Connection established: ${connectionInstence.connection.host}`);
    } catch (error) {
        console.error("Database connection Error:", error.message);
        process.exit(1);
    }
}

export default ConnectDb;