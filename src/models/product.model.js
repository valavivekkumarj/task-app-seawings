import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,

            validate: {
                validator: (value) => value > 0,
                message: "Price cannot negative.",
            },
        },
        category: {
            type: String,
            required: true,
            enum: ["electronics", "fashion", "books", "beauty"],
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Product = mongoose.model("product", productSchema);
export default Product;
