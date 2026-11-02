# Jodi Katzin Therapy — website redesign (prototype)

Prototype redesign of jodikatzintherapy.com (currently Squarespace) for Jodi Katzin, Occupational Therapist.
Live preview: https://jdix22.github.io/jodi-katzin-therapy/

All text, contact details, rates and photos come from the current site. Page addresses match the old ones
(`/about`, `/my-approach`, `/howtoworktogether`, `/connect`), so existing links and Google rankings carry over.

## What's new
- Warmer, calmer design (oat paper, plum, Jodi's rose) built around the water-ripple photo from her old Connect page.
- Home page "What are you carrying?" picker: visitors tap what they're navigating, and those topics come pre-ticked
  on the consultation request.
- Consultation request form on Connect that opens a ready-to-send email to Jodi. Nothing is stored on the site.
  To send without an email app, paste a form-service URL (Formspree, Basin) into `FORM_ENDPOINT` in `assets/site.js`.
- Interactive IFS "parts" diagram on My Approach.
- Rates and FAQ answered up front (cost, benefits receipts, virtual vs in person, frequency, reply time).
- Search and AI-answer groundwork: unique titles and descriptions, structured data for the practice, Jodi,
  her credentials, services and prices, social preview image, sitemap, robots.txt, 404 page.
- 9-8-8 crisis line note in the footer (standard on therapy sites).

## Questions for Jodi before launch
1. **In-person location.** The site only says "Vaughan, Ontario". Share an address or a neighbourhood/intersection?
2. **Phone number.** None is listed. Add one, or keep email only?
3. **Virtual sessions.** Available to anyone in Ontario? (Helps the site show up beyond Vaughan.)
4. **Booking.** Requests go by email today. Would she like online booking (Jane, Calendly, Owl Practice)?
5. **Wording to approve.** The short captions on the IFS diagram ("may be standing guard…", "may be asking for rest…"),
   the "25 years as an Occupational Therapist" badge and the section headlines were written for the redesign.
6. **Crisis note.** OK to keep the 9-8-8 line in the footer?
7. **Title.** The site describes her as an "Occupational Therapist offering Psychotherapy-based support", never
   "psychotherapist" (a protected title in Ontario). Confirm this matches how she wants to be described.

## Going live (after Jodi approves)
- Remove `<meta name="robots" content="noindex">` from every page.
- Replace `https://jdix22.github.io/jodi-katzin-therapy/` with `https://www.jodikatzintherapy.com/` in canonicals,
  social tags, JSON-LD, `sitemap.xml` and `robots.txt`; change `/jodi-katzin-therapy/` paths in `404.html` to `/`.
- Point the domain away from Squarespace, then submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Jodi's own to-dos: claim a Google Business Profile (as a service-area business if she'd rather not show an address),
  add the website to her Instagram bio, and make sure her listings (Psychology Today etc., if any) use the same name,
  email and wording.

Source files for the social image and app icon are in `_src/` (not published).
