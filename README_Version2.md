```markdown
HomeSync brochure — GSAP ScrollTrigger starter (updated with provided images)

Images mapping (place these exact filenames into ./assets/)
- assets/img1.jpg  — Smart switch models collage (your Image 1)
- assets/img2.jpg  — Packaging & dealer materials (your Image 2)
- assets/img3.jpg  — Hero devices / close-ups (your Image 3)
- assets/img4.jpg  — Technical specifications sheet (your Image 4)

What I updated
- index.html: replaced placeholder images with the provided images and adjusted alt text.
- styles.css: small sizing tweaks so the provided images display cleanly in each scene.
- app.js: interactions remain the same (GSAP + ScrollTrigger) — scenes are pinned and scrubbed, with snap behaviour for the variant/horizontal scene.

Notes & next steps
- Variants scene currently uses the single collage (img1) repeated across slides so we keep the "one visible switch per step" interaction intact. If you prefer separate cropped images for each color, provide four individual variant image files and I'll swap them in (recommended for best composition).
- For production: add responsive srcset/picture elements and optimize the images (WebP/AVIF and responsive widths). I can provide an optimized image export workflow.
- If you want, I can:
  1) Crop/prepare 4 variant images from your collage for the variants scene (I can produce visual crops and updated files),
  2) Convert this to a React + Framer Motion version,
  3) Produce a Webflow interactions spec to import into Webflow.

Tell me which next step you want and I’ll proceed: crop variants (1), React/Framer (2), or Webflow spec (3).
```