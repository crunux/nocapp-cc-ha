import { envs } from "./config/plugins";
import { MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation";


(async () => {
    main();
})();


async function main() {
    await MongoDatabase.connect({
        mongoURL: envs.MONGO_URI,
        dbName: envs.MONGO_DB_NAME,
    })

    ServerApp.start();
}
