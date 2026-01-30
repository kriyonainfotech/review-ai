const { generateReview } = require('./utils/aiService');

async function test() {
    console.log("Starting AI Review Generation Test (Running 3 samples to check variety)...");
    const businessName = "Kriyona Infotech";
    const businessDescription = "Top-notch IT solutions provider.";
    const businessServices = "App Development, Web Design, SEO";

    try {
        for (let i = 1; i <= 3; i++) {
            const review = await generateReview(businessName, businessDescription, businessServices, "Surat, Gujarat, India", businessServices);
            console.log(`\n--- Generated Review #${i} ---`);
            console.log(review);
            console.log("------------------------");
        }
    } catch (error) {
        console.error("Test Failed:", error);
    }
}

test();
