/* =====================================================================
   THE ROYAL MUSEUM OF HER KINGDOM — CONTENT FILE
   ---------------------------------------------------------------------
   ✎  Everything you might want to personalise lives in THIS file.
      You never need to touch app.js or style.css.

   PHOTOS: drop images into  assets/photos/  and put their file names
   below (e.g. "assets/photos/beach.jpg"). Any photo that is missing
   shows an elegant placeholder frame instead, so nothing ever breaks.
   ===================================================================== */

window.KINGDOM = {

  princessName: "Muskan",
  kingName: "Your King",              // ✎ how you sign things (e.g. "Your Rohan")

  /* ---------------------------------------------------------------
     THE GRAND ENTRANCE
     --------------------------------------------------------------- */
  entrance: {
    eyebrow: "Est. the day she first smiled",
    title: "The Royal Museum of Her Kingdom",
    dedication: "Built stone by stone, frame by frame, for Her Royal Highness",
    name: "Princess Muskan",
    button: "Open the Royal Gates"
  },

  /* ---------------------------------------------------------------
     HALL OF PORTRAITS  (gilded frames, crimson walls)
     The frame marked  hidesKey: true  is the one hiding the golden key.
     --------------------------------------------------------------- */
  portraits: [
    { src: "assets/photos/portrait-1.jpg", title: "The Princess, Radiant",       caption: "Oil on canvas could never. The museum tried. The museum failed." },
    { src: "assets/photos/portrait-2.jpg", title: "Her Highness at Golden Hour", caption: "The sun set early that day out of pure embarrassment." },
    { src: "assets/photos/portrait-3.jpg", title: "The Famous Smile",            caption: "Insured by the kingdom for an amount that does not exist." },
    { src: "assets/photos/portrait-4.jpg", title: "Study in Mischief",           caption: "Moments before she said something that made the king laugh for ten minutes." },
    { src: "assets/photos/portrait-5.jpg", title: "Portrait No. 5",              caption: "The artist insisted something precious be kept safe behind this frame.", hidesKey: true },
    { src: "assets/photos/portrait-6.jpg", title: "The One and Only",            caption: "Visitors are asked not to stare for more than four hours." }
  ],

  /* ---------------------------------------------------------------
     GALLERY OF LITTLE MOMENTS  (polaroids on strings — click to flip)
     --------------------------------------------------------------- */
  moments: [
    { src: "assets/photos/moment-1.jpg", front: "that random tuesday",   back: "Nothing happened that day. You were there, so it was perfect anyway." },
    { src: "assets/photos/moment-2.jpg", front: "your 'thinking' face",  back: "You do this tiny thing with your eyebrows. I have never recovered." },
    { src: "assets/photos/moment-3.jpg", front: "food > everything",     back: "The way you light up when the food arrives is my favourite show." },
    { src: "assets/photos/moment-4.jpg", front: "mid-laugh",             back: "If I could bottle one sound in the world, it would be this one." },
    { src: "assets/photos/moment-5.jpg", front: "us, being silly",       back: "Proof that the king is only cool when you're not around." },
    { src: "assets/photos/moment-6.jpg", front: "the sleepy princess",   back: "Five more minutes, she said. It was forty. Worth it." },
    { src: "assets/photos/moment-7.jpg", front: "that outfit though",    back: "The kingdom declared a public holiday the moment you walked in." },
    { src: "assets/photos/moment-8.jpg", front: "my favourite view",     back: "Not the scenery. You. It was always you." }
  ],

  /* ---------------------------------------------------------------
     THE ROYAL CHRONICLES  (our story, as an illuminated manuscript)
     ✎ Replace with your real chapters, dates and photos.
     --------------------------------------------------------------- */
  chronicles: [
    { chapter: "Chapter I",   date: "Once upon a time",     title: "The Kingdom Begins",          src: "assets/photos/chronicle-1.jpg", text: "There was a day — an ordinary day, the history books will insist — when a girl named Muskan walked into my life. Nobody blew a trumpet. Nobody rolled out a carpet. But somewhere, quietly, a kingdom was founded." },
    { chapter: "Chapter II",  date: "Soon after",           title: "The First Long Conversation", src: "assets/photos/chronicle-2.jpg", text: "We talked until the hours stopped making sense. I remember thinking: oh no. Oh no, I'm going to think about this person all the time now. (The royal astronomers confirm: I was correct.)" },
    { chapter: "Chapter III", date: "The middle chapters",  title: "Becoming Us",                 src: "assets/photos/chronicle-3.jpg", text: "Inside jokes. Shared playlists. Food stolen off my plate with zero remorse. Somewhere along the way, 'you and me' quietly became 'us', and everything got a little warmer." },
    { chapter: "Chapter IV",  date: "The hard days",        title: "Weathering Storms",           src: "assets/photos/chronicle-4.jpg", text: "Not every page of a kingdom's story is golden. But every storm taught me the same lesson: I would rather work through anything with you than have an easy day with anyone else." },
    { chapter: "Chapter V",   date: "Today",                title: "The Kingdom, Now",            src: "assets/photos/chronicle-5.jpg", text: "And here we are. A whole museum, built for one person — because one person deserved a whole museum. The story is still being written, Your Highness. I can't wait to read the next chapter with you." }
  ],

  /* ---------------------------------------------------------------
     THE MUSKAN TIMES  📰
     --------------------------------------------------------------- */
  newspaper: {
    name: "The Muskan Times",
    motto: "All the News That's Fit to Adore",
    volume: "Vol. ∞ · No. 1",
    price: "Price: One Smile",
    headline: "PRINCESS MUSKAN ONCE AGAIN LEAVES HER KINGDOM SPEECHLESS!",
    subhead: "Citizens report weak knees, involuntary grinning, and a sudden urge to write poetry. Royal physicians say there is no cure, and frankly, nobody wants one.",
    lead: {
      title: "Kingdom Brought to Standstill",
      body: [
        "THE ROYAL CAPITAL — In a development that surprised absolutely no one, Princess Muskan was once again sighted being effortlessly wonderful, leaving the entire kingdom in a state of stunned, slightly dizzy silence.",
        "Witnesses describe the event as \"a smile, followed by a laugh, followed by the king forgetting what he was saying mid-sentence.\" Traffic in the capital halted for several minutes as citizens paused to recover.",
        "\"I was simply buying bread,\" said one shaken baker. \"Then she walked past and said thank you, and now I've named a cake after her.\" The cake has since sold out across forty-two provinces.",
        "The palace has declined to comment, except to confirm that the king is \"fine,\" \"totally fine,\" and \"not staring.\" Reports indicate the king was, in fact, staring."
      ]
    },
    articles: [
      { kicker: "BREAKING", title: "Local King Reportedly Falls in Love With Princess Again", illo: "heart",
        body: "For the 4,817th consecutive time this year, the King has been observed falling hopelessly in love with Princess Muskan. Palace sources say the latest incident was triggered by \"the way she scrunched her nose.\" Experts warn that further episodes are expected daily, possibly hourly. The King, reached for comment, simply sighed dreamily and walked into a pillar." },
      { kicker: "ARTS & CULTURE", title: "Princess Declared Officially Too Beautiful for Ordinary Portraits", illo: "frame",
        body: "The Royal Academy of Fine Arts has issued a formal statement admitting defeat. \"Our painters tried oils, watercolours, charcoal, and at one point, glitter,\" said the Academy's director. \"None of it was enough.\" Canvases across the kingdom have reportedly filed complaints about feeling inadequate. A new medium — 'pure adoration' — is being developed." },
      { kicker: "ROYAL DECREE", title: "Kingdom Announces Unlimited Cuddle Privileges", illo: "crown",
        body: "In a landmark ruling, the Royal Council has granted Princess Muskan unlimited, non-expiring, fully transferable cuddle privileges, effective immediately and forever. The decree includes cold-day cuddles, movie cuddles, \"I'm just tired\" cuddles, and the rare but legendary \"no reason at all\" cuddle. The King has been placed on permanent standby." },
      { kicker: "SCIENCE", title: "Royal Scientists Unable to Explain Her Ability to Make Someone Smile", illo: "telescope",
        body: "After seven years of research, three telescopes and an alarming amount of coffee, the Royal Institute of Science has concluded that Princess Muskan's smile-inducing ability \"defies all known laws of physics.\" Lead researcher Dr. Grin noted: \"She sends a single text and his entire face changes. We have no equations for this.\" Funding has been increased indefinitely." }
    ],
    briefs: [
      { title: "WEATHER", body: "Forecast: 100% chance of her being adorable. Scattered giggles in the afternoon. Warm cuddle-front moving in by evening." },
      { title: "MARKETS", body: "Hugs up 300%. Bad days down to an all-time low. Analysts credit one (1) princess." },
      { title: "SPORTS", body: "Princess wins argument she started, defending champion title for the 900th year running." }
    ],
    classifieds: [
      "WANTED: More hours in the day to spend with the Princess. Will trade sleep.",
      "LOST: One small star — the brightest in the sky, glowing rose-gold and shaped like a tiny crown. Last seen in the HALL OF A THOUSAND STARS, hiding among the ordinary ones. Finder will know it when they see it. ✦",
      "FOR SALE: King's hoodie. Just kidding. Princess already took it.",
      "NOTICE: The royal snack cupboard has been restocked. Princess has first pick, as per Article 5."
    ],
    extraHeadlines: [
      "Princess Says 'Hmm' — Kingdom Holds Breath",
      "Royal Bakery Reports Record Sales of Muskan Cake",
      "King Caught Smiling at Phone Again; 'It's Her,' Confirm Sources",
      "Princess Wears New Outfit; Fashion Industry Collapses",
      "Kingdom's Rivers Now Flowing Slightly Faster Just to See Her",
      "Princess Sends 'hehe'; King Hospitalised With Happiness",
      "Breaking: Moon Requests Day Off After Being Outshone"
    ]
  },

  /* ---------------------------------------------------------------
     THE HALL OF A THOUSAND STARS  ✨
     ✎ Add as many reasons as you like — one star appears per reason.
     --------------------------------------------------------------- */
  stars: {
    title: "A Thousand Little Reasons",
    subtitle: "Every star in this sky is a reason. Touch one.",
    reasons: [
      "The way your smile changes my entire day.",
      "How you make ordinary moments feel special.",
      "Your little expressions — every single one of them.",
      "Your laugh. Especially the one you try to hold in.",
      "The way you care, quietly and completely.",
      "Simply being yourself, without apology.",
      "How you remember the tiny things I mention once.",
      "The way you say my name when you want something.",
      "Your kindness to people who can never repay you.",
      "How you get excited about food like it's a festival.",
      "The way you make silence feel comfortable.",
      "Your stubbornness — yes, even that. Mostly.",
      "How brave you are, even on the days you don't feel it.",
      "The way you look at the world with so much heart.",
      "Your good-morning texts that fix my whole mood.",
      "How you make every place feel like home.",
      "The sleepy, grumpy version of you. A national treasure.",
      "The way you hold my hand like it's the obvious thing to do.",
      "How you believe in me more than I do.",
      "Your terrible, wonderful jokes.",
      "The way you dance when you think nobody's watching.",
      "How you make me want to be a better person.",
      "That you chose me. I still can't believe my luck.",
      "Because there is only one you, and the world is brighter for it."
    ],
    secret: "You found the crown star. Of all the lights in this sky, it was always going to be you who found it — because you're the one who taught me what shining looks like. ✦"
  },

  /* ---------------------------------------------------------------
     HER ROYAL IDENTITY CARD  👑
     --------------------------------------------------------------- */
  idCard: {
    photo: "assets/photos/id-photo.jpg",
    name: "Princess Muskan",
    title: "Her Majesty, The One and Only",
    kingdom: "The Kingdom of Love",
    status: "Eternally Adored",
    powers: "Stealing hearts, making days better, and being impossibly adorable",
    privileges: "Unlimited cuddles, unlimited attention, and the right to annoy the king",
    issuedBy: "The Royal Museum of Her Kingdom",
    number: "No. MUSKAN-∞-001",
    issued: "The day she first smiled",
    expires: "Never. Not even a little.",
    back: {
      heading: "Terms & Conditions of Royalty",
      terms: [
        "Holder may cause spontaneous smiling in a 50-mile radius.",
        "Card grants access to all snacks, hoodies, and the warm side of the bed.",
        "Holder is legally always right, retroactively.",
        "Pouting by the holder is to be treated as a national emergency.",
        "This card cannot be revoked, cancelled, or argued with."
      ],
      found: "IF FOUND: Return holder to the King immediately. Reward: unlimited hugs.",
      warning: "⚠ WARNING: Excessive cuteness. Handle with care."
    }
  },

  /* ---------------------------------------------------------------
     THE ROYAL PRIVILEGE BOOK  📜
     --------------------------------------------------------------- */
  privileges: {
    title: "The Royal Book of Privileges",
    subtitle: "Being the Official & Binding Laws Concerning Her Royal Highness",
    rules: [
      { rule: "The princess is always allowed to steal the king's hoodies.", note: "Clause 1(b): Once stolen, a hoodie becomes princess property. Appeals are not accepted.", illo: "hoodie" },
      { rule: "The princess has unlimited rights to demand attention.", note: "At any hour. For any reason. Including no reason. Especially no reason.", illo: "bell" },
      { rule: "The king must tolerate random cuteness.", note: "Even when it is clearly deliberate and strategically timed to win an argument.", illo: "sparkle" },
      { rule: "Princess complaints must be heard immediately.", note: "The king shall nod, say 'you're so right', and mean it.", illo: "scroll" },
      { rule: "The princess is never required to share her food.", note: "Clause 5(b): 'Just one bite' from the king is legally classified as theft.", illo: "cake" },
      { rule: "The king is officially responsible for making her smile.", note: "Failure to do so within 24 hours triggers an emergency chocolate delivery.", illo: "smile" },
      { rule: "A princess saying 'I'm fine' shall be investigated.", note: "By the Royal Detective (the king) with snacks, patience and hugs.", illo: "glass" },
      { rule: "The princess wins every argument. Retroactively.", note: "Including arguments she has not started yet.", illo: "trophy" },
      { rule: "Cold hands may be warmed on the king at any hour.", note: "The king may not flinch. The king will flinch. This is forgiven.", illo: "hand" },
      { rule: "The princess always gets the best seat, the blanket and the last bite.", note: "This law predates the kingdom itself.", illo: "crown" }
    ],
    closing: "Signed, sealed and lovingly enforced by the King."
  },

  /* ---------------------------------------------------------------
     THE ROYAL WISHING WELL  ⛲
     --------------------------------------------------------------- */
  wishes: {
    intro: "If I could make one wish for my princess...",
    list: [
      "I'd wish you happiness — the deep, quiet kind that stays even on ordinary Tuesdays.",
      "I'd wish you success in everything you set your heart on, and the courage to chase all of it.",
      "I'd wish you peace — a calm mind, soft days, and nights that let you rest.",
      "I'd wish you confidence, so you could see yourself exactly the way I see you.",
      "I'd wish you people who love you loudly, and never make you doubt your worth.",
      "I'd wish you health, laughter, and an endless supply of your favourite food.",
      "I'd wish that every dream you've whispered to yourself finds its way to you.",
      "I'd wish that whenever life gets heavy, you remember you never carry it alone.",
      "And if I had one wish left... I'd wish for more time — a lifetime of it — with you."
    ]
  },

  /* ---------------------------------------------------------------
     THE LOCKED LOVE LETTER  💌
     ✎✎✎  THIS IS THE EMOTIONAL HEART OF THE MUSEUM.
     The starter text below is complete and works as-is, but it is at its
     most powerful in YOUR words. Each section is clearly marked —
     rewrite them with your real memories, apologies, gratitude and feelings.
     Each string in an array becomes one paragraph.
     --------------------------------------------------------------- */
  letter: {
    doorText: "Some words deserve their own little room.",
    salutation: "My dearest Muskan,",

    opening: [
      "I built you an entire museum, and still, this is the room I was most nervous about. Everything outside these walls is a celebration. This room is just me — no jokes, no headlines, no royal decrees. Just the things I don't always know how to say out loud."
    ],

    // ✎ MEMORIES — replace with real moments only the two of you know
    memories: [
      "I keep thinking about the little moments. The first time you laughed at something I said and I realised I'd spend the rest of my life trying to hear that sound again. The late-night conversations that made the clock feel irrelevant. The ordinary days that became my favourite days, simply because you were in them.",
      "I don't remember what we ate, or what the weather was, or what time it got. I just remember you."
    ],

    // ✎ APOLOGIES — the honest part
    apologies: [
      "I know I haven't always gotten it right. There have been times I didn't listen well enough, times I let my moods get in the way, times you needed more from me than I gave. I'm sorry for every one of those moments. Not because I have to be — but because you deserve someone who keeps learning how to love you better. I'm trying to be that someone, every day."
    ],

    // ✎ GRATITUDE — what she has given you
    gratitude: [
      "Thank you for your patience with me. Thank you for your kindness, for the way you care without keeping score, for believing in me on the days I couldn't. Thank you for every message that made a bad day bearable, and every smile that made a good day better.",
      "Thank you for choosing me. I don't take it for granted. Not for a single second."
    ],

    // ✎ FEELINGS — the heart of it
    feelings: [
      "Here is the truth, Muskan: you make my world softer and brighter and more worth it. When something good happens, you're the first person I want to tell. When something goes wrong, you're the only person I want to talk to. You are my comfort and my favourite adventure all at once.",
      "If this whole museum crumbled tomorrow, this one thing would still be standing: I love you. Completely, stubbornly, and more every day."
    ],

    closing: "Forever your king, and forever yours,",
    signature: "Your King"   // ✎ your name or nickname
  },

  /* ---------------------------------------------------------------
     THE FINAL ROYAL MESSAGE  (unlocked when every secret is found)
     --------------------------------------------------------------- */
  finale: {
    title: "By Royal Decree",
    lines: [
      "Let it be known throughout every province, every river and every star:",
      "Princess Muskan has explored every corner of her kingdom, found every secret, and opened every locked door.",
      "But the greatest secret of this museum was never hidden in a frame, a fountain or a sky.",
      "It's that this entire kingdom only exists because of her.",
      "Every gallery is a love letter. Every room is a thank-you. Every star is a promise.",
      "Long live the Princess. Long live the one who made a king out of an ordinary heart."
    ],
    signature: "— With all my love, now and always"
  },

  /* ---------------------------------------------------------------
     Optional background music. Put an mp3 in assets/ and set the path,
     e.g. "assets/music.mp3". Leave empty for no music button.
     --------------------------------------------------------------- */
  music: ""
};
