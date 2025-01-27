export const up = async (db, client) => {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection("User").updateMany({}, { $set: { isDeleted: false } });
};

export const down = async (db, client) => {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db
        .collection("User")
        .updateMany({}, { $unset: { isDeleted: false } });
};
