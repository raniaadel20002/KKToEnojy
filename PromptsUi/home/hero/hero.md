Redesign the Home Hero section based on the provided Figma reference.

**References:**
- Global instructions: `PromptsUi/GlobalInstruction.md`
- Figma: `PromptsUi/home/hero/hero.png`
- Assets: `public/Hero`

**Requirements:**
- Match the reference layout, typography, colors, spacing, and proportions.
- Reuse the provided images and existing components.
- **Image Gallery:** Recreate the gallery exactly as shown, using the five images in the provided order. Implement a seamless, automatic, endless horizontal carousel with continuous movement, no visible resets or gaps. Preserve the curved top and bottom edges, image cropping, sizing, and spacing ,Move continuously from right to left (RTL direction), with a seamless infinite loop.**Edge Gradient Effect:**
linear-gradient(90deg, rgba(250, 247, 242, 0.6) 0%, rgba(255, 255, 255, 0) 18.27%, rgba(204, 204, 204, 0) 79.33%, rgba(250, 247, 242, 0.6) 100%);Apply the provided horizontal gradient as an overlay on both gallery edges. Images should gradually fade under the gradient as they approach the edges, returning to full visibility as they move toward the center. The effect must be smooth and continuous with the carousel movement, until images completely disappear beyond the edges.

- Match the navigation, centered content, CTA, and bottom feature highlights.
- Ensure full responsiveness.
- Do not invent or import missing assets or icons; ask me first.
- Inspect the existing implementation before coding.
- Preserve all existing functionality and avoid unrelated changes.