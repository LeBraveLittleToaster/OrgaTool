const DBHandler = require("./../../server/nodejs/db/dbhandler.js");

handler = new DBHandler();

handler.createClient();
setup();
async function setup() {
    await sleep(5000);
    console.log("Clearing db...");
    handler.nukeDatabase();
    console.log("Creating users...");
    console.log("admin1...");
    insertAndCheckuser("myAdmin1", "admin1", "admin1", true);
    console.log("admin2...");
    insertAndCheckuser("myAdmin2", "admin2", "admin2", true);
    console.log("user1...");
    insertAndCheckuser("user1", "user1", "user1", false);
    console.log("user2...");
    insertAndCheckuser("user2", "user2", "user2", false);
}
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

async function insertAndCheckuser(displayname, loginname, pw, isAdmin) {
    handler.insertUser(displayname, loginname, pw, isAdmin, (user) => {
        console.log("Created user");
        console.log("Check if user is valid...");
        handler.isUserInDatabase(loginname, pw, function (err, success) {
            console.log(loginname + " is valid : " + success);
            if (!success) {
                console.log(err);
            }
        });
    });
}