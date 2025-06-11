import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

async function generateAppleTouchIcons() {
    const faviconPath = path.join(process.cwd(), 'static', 'favicon.png');
    const sizes = [180]; // Apple Touch Icon size

    try {
        const favicon = await fs.readFile(faviconPath);
        
        for (const size of sizes) {
            const outputPath = path.join(
                process.cwd(),
                'static',
                `apple-touch-icon${size === 180 ? '' : `-${size}`}.png`
            );
            
            await sharp(favicon)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .png()
                .toFile(outputPath);
            
            // Create precomposed version (identical for modern iOS)
            if (size === 180) {
                const precomposedPath = path.join(
                    process.cwd(),
                    'static',
                    'apple-touch-icon-precomposed.png'
                );
                await fs.copyFile(outputPath, precomposedPath);
            }
        }
        
        console.log('✅ Generated Apple Touch Icons successfully');
    } catch (error) {
        console.error('❌ Error generating Apple Touch Icons:', error);
        process.exit(1);
    }
}

generateAppleTouchIcons(); 