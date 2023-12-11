import { run, setup } from "./steps";

setup()
    .then(run)
    .then(() => {
        console.log("Work Complete!");
    })
    .catch((error: Error) => {
        console.error("Error");
        console.error(error);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
        return;
    });

export {};
