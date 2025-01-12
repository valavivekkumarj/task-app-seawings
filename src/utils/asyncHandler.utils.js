export const asyncHandler = (fn) => {
    if (typeof fn !== "function") {
        throw new TypeError("Expected a function");
    }
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
