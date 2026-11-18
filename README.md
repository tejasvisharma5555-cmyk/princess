# 👑 The Royal Museum of Her Kingdom

A cinematic, interactive museum built to celebrate one person: **Princess Muskan**.

It's a plain static site with no build step and no dependencies. Open `index.html` or host the folder anywhere (GitHub Pages, Netlify, Vercel).

## ✎ Personalising it (the important part)

**Everything you'd want to change is in [`js/content.js`](js/content.js).** You never need to touch `app.js` or `style.css`.

1. **Photos:** add them to `assets/photos/` (see the [photo guide](assets/photos/README.md)).
2. **Your name:** set `kingName` near the top, and `letter.signature`.
3. **The Locked Love Letter 💌:** this is the emotional highlight. The starter letter is complete, but it's split into clearly marked sections (`memories`, `apologies`, `gratitude`, `feelings`). Rewrite each one in your own words.
4. **The Royal Chronicles:** replace the five chapters with your real story.
5. **Reasons, wishes, news articles, privileges:** all editable lists. Add as many as you like: one star appears for every reason.
6. **Music (optional):** put an mp3 in `assets/` and set `music: "assets/your-song.mp3"`.

## 🗺 The kingdom

| Room | What happens |
|---|---|
| **Grand Entrance** | Golden gates swing open |
| **The Royal Map** | Hub with every hall. Cartographer's notes hold subtle clues |
| **Hall of Portraits** | Gilded frames on crimson walls, with cinematic lightbox |
| **Gallery of Little Moments** | Swaying polaroids. Tap to flip and read the back |
| **The Royal Chronicles** | Illuminated-manuscript timeline of your story |
| **The Muskan Times** 📰 | Vintage newspaper: expanding articles, "Stop the Presses!", a stampable royal seal |
| **Hall of a Thousand Stars** ✨ | Canvas night sky with 24 clickable reason-stars that draw a constellation as she finds them |
| **Royal Records Office** | Her Royal ID card: 3D tilt, flips to a funny back |
| **The Royal Library** | Page-turning Book of Privileges that she can sign and seal |
| **The Enchanted Garden** | Toss a golden coin into the fountain for a wish. Toss again for more |
| **The Locked Room** 💌 | Golden door → wax seal breaks → letter unfolds |
| **The Throne Room** | The final royal decree, sealed until every secret is found |

## 🔑 The secret adventure (optional; every gallery stays open)

1. **The Cartographer's Note:** a tiny "here be Muskan" heart in the map's margin.
2. **The Golden Key:** one portrait hangs crooked, and something glints behind it.
3. **The Locked Love Letter:** the key opens the golden door.
4. **The Crown Star:** the newspaper's classifieds describe a lost rose-gold star in the Hall of Stars.
5. **A Wish in the Well:** a coin glints in the garden beyond the walls.

Finding all five opens **The Throne Room**. The crown badge (top-right) tracks how much of the kingdom she has explored and gives gentle hints. Progress is saved in her browser.

To reset progress while testing, run `localStorage.removeItem("royal-museum-muskan-v1")` in the browser console.
