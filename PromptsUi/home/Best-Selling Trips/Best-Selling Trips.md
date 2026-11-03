Redesign **only the Best-Selling Trips section on the Home page** based on the provided Figma design.

**References:**
- Global instructions: `PromptsUi/GlobalInstruction.md`
- Figma: `C:\Users\DELL\Desktop\Work\KKToEnojy\PromptsUi\home\Best-Selling Trips`

**Design Details:**

- **Section:**
  - Background: #FAF7F2

- **Heading:**
  - Color: #343B55 Bold

- **Subtitle:**
  - Color: #5B6B73 (9pt Regular)

- **Decorative underline:**
  - Color: #765438
  - Border radius: 20px

- **Category Filters:**
  - Active background / text: #765438 #FFFFFF  SemiBold
  - Inactive background / text: #FFFFFF  #343B55 Medium 
  - Border: 1px solid #888888
  - Border radius: 30px

- **View More Button:**
  - Background / Text: transparent
  - border: 1.5px solid #343B55
  - Border radius: 30px

- **Trip Cards:**
  - Background / Text: #FFFFFF
  - border: 1px solid #EDE7DC
  - Border radius: 20px
  - Box shadow: box-shadow: 0px 12px 32px 0px #0E4A681A;

- **Trip Category Label:**
  - Color: #198399; Medium

- **Trip Title:**
  - Color: #343B55 SemiBold

- **Location:**
  - Color / Font size: #5B6B73 (9pt Regular)
  - Location icon: #198399 

- **Rating & Reviews:**
  - Star color: #765438
  - Rating / Reviews colors and sizes: #343B55 SemiBold
  - Divider: #5B6B73 (9pt Regular)

- **Price:**
  - Color: #198399 Bold

- **Book Now Button:**
  - Background / Text: #343B55
  - Font size / Weight: #FFFFFF SemiBold
  - Border radius: 30px
  
- **Add to Cart Button:**
  - Text: #343B55 SemiBold
  - border: 1.5px solid #343B55
  - Border radius: 30px
  - Cart icon: border: 1.33px solid #343B55

- **Success Toast:**
  - Position: Center of screen.

**Responsive Design Details:**
- Category filters:
  - Single horizontal row.
  - `overflow-x: auto`.
  - `flex-wrap: nowrap`.
  - Hide scrollbar while keeping scrolling functional.
  - Smooth horizontal scrolling.
  - Maintain spacing between filters.

**Requirements:**

- Match the Figma design exactly on desktop and responsive screens.
- Reuse existing components, assets, data, and functionality.
- Preserve existing filters, navigation, and Book Now flow.
- Make responsive filters horizontally scrollable without wrapping.
- Add a fully functional Add to Cart button to every trip card.
- Adding a trip must update the existing cart and Header cart count immediately, without navigating to the booking page.
- Show a success toast in the center of the screen after adding successfully.
- Use the existing cart system, API, and toast implementation.
- Use Framer Motion for animations.
- Do not use dummy data or invent assets.
- Inspect the existing implementation before coding.
- Modify only the Best-Selling Trips section and necessary cart integration points.
- Preserve the existing architecture and functionality.