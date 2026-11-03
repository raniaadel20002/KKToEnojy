Redesign **only the Testimonials & Reviews section on the Home page** based on the provided Figma designs.

**References:**
- Global instructions: `PromptsUi/GlobalInstruction.md`
- Desktop: `C:\Users\DELL\Desktop\Work\KKToEnojy\PromptsUi\home\review\review\.png`
- Responsive: `C:\Users\DELL\Desktop\Work\KKToEnojy\PromptsUi\home\review\responsive.png`
- assets: `C:\Users\DELL\Desktop\Work\KKToEnojy\public\review`

**Project Isolation:**
- This is a completely new feature named `ReviewsProject`.
- Keep it completely separate from existing Reviews functionality.
- Do not modify existing review components, APIs, types, or pages.
- Create new components and files under `ReviewsProject`.

**Section Design:**
- Background: `#FAF7F2`

**Review Cards:**
- Background: `#FFFFFF`
- Border: `1px solid #EDE7DC`
- Border radius: `20px`
- Box shadow: `0px 12px 32px 0px #0E4A681A`
- Card content: Traveller name, email, date, star rating, and review comment.
- Match the exact layout and spacing in the Figma design.

**See More Button:**
- Background: `#FAF7F2`
- Border: `0.3px solid #A4A4A4`
- Border radius: `10px`
- Text color: `#7C7C7C`
- Font weight: Regular

**Review Submission Form:**
- Background: `#FFFFFF`
- Border: `1px solid #EDE7DC`
- Box shadow: `0px 12px 32px 0px #0E4A681A`
- Border radius: `20px`
- Input border radius: `12px`
- Submit button border radius: 30px 
- Match the form layout and fields in the Figma design.

**Placement:**
- Immediately after FAQ and before Footer.
- Completely remove `ExploreSection`.

**Requirements:**
- Audit whether dedicated `ReviewsProject` APIs exist.
- Integrate only if they exist; otherwise implement UI only and wait for backend integration.
- No dummy data or invented endpoints.
- Support all translations and responsive layouts.
- Modify only necessary files. No unrelated changes.