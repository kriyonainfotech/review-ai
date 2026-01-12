const { generateReview } = require('./utils/aiService');

async function test() {
    console.log("Starting AI Review Generation Test...");
    const businessName = "The Coffee House";
    const businessDescription = "A cozy place for specialty coffee and pastries.";
    const businessServices = "Coffee, Pastries, Free Wi-Fi";

    try {
        const review = await generateReview(businessName, businessDescription, businessServices);
        console.log("\n--- Generated Review ---");
        console.log(review);
        console.log("------------------------\n");
    } catch (error) {
        console.error("Test Failed:", error);
    }
}

test();
