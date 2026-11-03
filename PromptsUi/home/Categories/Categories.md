Redesign **only the Categories section on the Home page** based on the provided Figma design.

**References:**
- Global instructions: `PromptsUi/GlobalInstruction.md`
- Figma: C:\Users\DELL\Desktop\Work\KKToEnojy\PromptsUi\home\Categories\Categories.png
responsive:
C:\Users\DELL\Desktop\Work\KKToEnojy\PromptsUi\home\Categories\Categoriesres.png
- Assets: C:\Users\DELL\Desktop\Work\KKToEnojy\public\Categories

**Design Details:**
- Background: #343B55
- Heading: #FFFFFF Bold
- Subtitle: #FFFFFF (9pt Regular)
- Decorative underline: #198399 radius 20px
- Category cards:
  - color: #343B55
  - Background color: #FFFFFF
  - Border (if any): border: 1px solid #888888
  - Border radius: 10px
- Card rotations: 
card1 : 13 deg
card2 : -8 deg
card3 : 3 deg 
card4 : 14 deg
- Card Pushpin: -170 deg , 0 deg , 45.99 deg , -170 deg
in responsive:
- Card rotations: 
card1 : 7 deg
card2 : -4.31 deg
card3 : -4 deg
card4 : 6 deg
- Card Pushpin: 7 deg , -4.31 deg , -4 deg , 6 deg
- CTA background: #198399
- CTA text and color: #FFFFFF SemiBold
- CTA radius: 30px

**Requirements:**
- Match the Figma design exactly.
- Reuse existing components, assets, data, and functionality.
- Implement the category cards with their original tilted positions.
- On hover, smoothly translate each card to its straight position (`rotate: 0deg`), then return it to its original rotation on mouse leave.
- Use Framer Motion for animations.
- Preserve existing navigation and interactions.
- Ensure full responsiveness across desktop, tablet, and mobile.
- Do not use dummy data or invent missing assets or icons.
- Inspect the existing implementation before coding.
- Modify only the Categories section.
- Preserve all existing functionality and architecture.