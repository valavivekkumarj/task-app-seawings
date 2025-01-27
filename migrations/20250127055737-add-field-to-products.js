export const up = async (db, client) => {
    // Create User Schema and add a user document with initial data
    await db.createCollection("users");
    await db.collection("users").insertOne({
        username: "admin",
        email: "admin@example.com",
        fullName: "Admin User",
        password: "hashedpassword", // Remember to hash passwords in real-world scenarios
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // Create Product Schema and add a product document with initial data
    await db.createCollection("products");
    await db.collection("products").insertOne({
        name: "Sample Product",
        description: "This is a sample product description.",
        price: 100,
        category: "electronics",
        createdBy: null, // As the user reference isn't created yet, you can leave it empty or set a reference later.
        createdAt: new Date(),
        updatedAt: new Date(),
    });
};

export const down = async (db, client) => {
    // Drop User and Product collections
    await db.collection("users").drop();
    await db.collection("products").drop();
};
