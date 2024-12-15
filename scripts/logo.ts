import fs from "fs-extra";
import sharp from "sharp";
import ico from "sharp-ico";

const outputDir = "./public/icons";

// Ensure output directory exists
async function ensureOutputDir(dir: string): Promise<void> {
    try {
        await fs.ensureDir(dir);
    } catch (error) {
        throw new Error(`Failed to ensure output directory: ${error}`);
    }
}

interface ImageGenerationInput {
    name: string; // Output file name (e.g., "output-image")
    size: number; // Desired width in pixels
    format: "png" | "jpeg" | "webp"; // Desired format
}

// Convert png to ico
async function convertToIco() {
    const inputPng = "./public/icons/favicon-32x32.png"; // Path to your PNG file
    const outputIco = "./public/icons/favicon.ico"; // Path for the output ICO file

    try {
        // Create a sharp instance from the input PNG
        const pngBuffer = await sharp(inputPng).toFormat("png").toBuffer();

        // Generate the ICO file
        const icoBuffer = ico.encode([pngBuffer]); // Encode a single PNG as an ICO

        // Write the ICO file to disk
        fs.writeFileSync(outputIco, icoBuffer);

        console.log("Converted PNG to ICO successfully!");
    } catch (error) {
        console.error("Error converting PNG to ICO:", error);
    }
}

async function generateImages(
    inputSvg: string,
    inputs: ImageGenerationInput[]
): Promise<void> {
    for (const input of inputs) {
        const { name, size, format } = input;
        const outputFileName = `${outputDir}/${name}.${format}`;

        try {
            // Read the SVG file
            const svgBuffer = await fs.readFile(inputSvg);

            // Generate image
            await sharp(svgBuffer)
                .resize(size, size, {
                    fit: "contain",
                    background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
                })
                .toFormat(format)
                .toFile(outputFileName);

            console.log(`Generated: ${outputFileName}`);
        } catch (error) {
            console.error(`Error generating image ${outputFileName}:`, error);
        }
    }
}
/**
 * Script to generate favicons and logos for the project.
 * This script uses the Sharp library to perform image manipulation and conversion.
 * It reads the input SVG file, resizes it to the desired size, and saves the output as a PNG, JPEG, or WebP file.
 * The script also generates an ICO file from the PNG file.
 */
async function main(): Promise<void> {
    try {
        await ensureOutputDir(outputDir);

        const inputSvg = "./public/icons/logo.svg";

        const inputs: ImageGenerationInput[] = [
            { name: "mstile-310x310", size: 310, format: "png" },
            { name: "mstile-310x150", size: 310, format: "png" },
            { name: "mstile-70x70", size: 70, format: "png" },
            { name: "mstile-150x150", size: 150, format: "png" },
            { name: "mstile-144x144", size: 144, format: "png" },
            { name: "mstile-70x70", size: 70, format: "png" },
            { name: "isotipo", size: 310, format: "png" },
            { name: "favicon-32x32", size: 32, format: "png" },
            { name: "favicon-16x16", size: 16, format: "png" },
            { name: "android-chrome-192x192", size: 192, format: "png" },
            { name: "android-chrome-512x512", size: 512, format: "png" },
            { name: "apple-touch-icon", size: 152, format: "png" },
        ];

        await generateImages(inputSvg, inputs);
        await convertToIco();

        console.log("Image generation completed! 🎉");
    } catch (error) {
        console.error("Error during processing:", error);
    }
}

main();
