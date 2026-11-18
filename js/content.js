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
  kingName: "Pingu",                  // what she calls him
  kingRealName: "Tejasvi",
  nickname: "Motu",                   // what he calls her (every time 😄)

  /* ---------------------------------------------------------------
     THE GRAND ENTRANCE
     --------------------------------------------------------------- */
  entrance: {
    eyebrow: "Est. the day Pingu asked her to play basketball",
    title: "The Royal Museum of Her Kingdom",
    dedication: "Built stone by stone, frame by frame, by Pingu, for Her Royal Highness",
    name: "Princess Muskan",
    button: "Open the Royal Gates"
  },

  /* ---------------------------------------------------------------
     HALL OF PORTRAITS  (gilded frames, crimson walls)
     The frame marked  hidesKey: true  is the one hiding the golden key.
     --------------------------------------------------------------- */
  portraits: [
    { src: "assets/photos/portrait-1.jpg", title: "The Future World Traveller",  caption: "First these mountains. Then the whole world. Together, obviously.", pos: "50% 40%" },
    { src: "assets/photos/portrait-2.jpg", title: "The Princess, Radiant",       caption: "Even the hearts floated up to crown her. They knew before I did.", pos: "50% 35%" },
    { src: "assets/photos/portrait-3.jpg", title: "The Famous Smile",            caption: "Chin on hand, sun on face, Pingu completely defeated. Insured for an amount that does not exist.", pos: "50% 60%" },
    { src: "assets/photos/portrait-4.jpg", title: "The Royal Telephone Box",     caption: "One and a half years of not calling. One basketball invite fixed everything.", pos: "50% 60%" },
    { src: "assets/photos/portrait-5.jpg", title: "Portrait No. 5",              caption: "The artist insisted something precious be kept safe behind this frame.", hidesKey: true, pos: "38% 50%" },
    { src: "assets/photos/portrait-6.jpg", title: "The One and Only",            caption: "Eyes closed, hearts everywhere. Visitors may not stare for more than four hours (Pingu is exempt).", pos: "50% 30%" }
  ],

  /* ---------------------------------------------------------------
     GALLERY OF LITTLE MOMENTS  (polaroids on strings — click to flip)
     --------------------------------------------------------------- */
  moments: [
    { src: "assets/photos/moment-2.jpg", front: "head on my shoulder",    back: "You put your head on my shoulder in the middle of a shop and I forgot what we came to buy.", pos: "50% 40%" },
    { src: "assets/photos/moment-3.jpg", front: "late night, us",         back: "Bad lighting, sleepy faces, probably right after Bigg Boss. One of my favourite photos ever.", pos: "50% 50%" },
    { src: "assets/photos/first-flower.jpg", front: "the first flower ✿", back: "22 May 2026. That night at First Coffee in Chitkara. One little white rose, and the start of a lifetime of flowers.", pos: "50% 50%" },
    { src: "assets/photos/moment-4.jpg", front: "pingu & motu",           back: "Leather jacket Motu and her very lucky Pingu.", pos: "50% 50%" },
    { src: "assets/photos/moment-6.jpg", front: "work mode: ON",          back: "No makeup, messy hair, totally focused. Still the prettiest person I know. Don't argue (you'll win, but don't).", pos: "50% 30%" },
    { src: "assets/photos/moment-5.jpg", front: "just us 🤍",             back: "Some moments are just ours. This is one of them.", pos: "50% 40%" },
    { src: "assets/photos/moment-7.jpg", front: "motu, unbothered",       back: "Specs on, zero interest in my nonsense. Iconic. I love this version of you too.", pos: "50% 50%" },
    { src: "assets/photos/moment-1.jpg", front: "diwali (ai edition)",    back: "Okay, confession: this one's AI. We haven't had a Diwali together yet. Next year we recreate it for real: same lights, same pose, real us.", pos: "50% 30%" },
    { src: "assets/photos/moment-8.jpg", front: "our little world",       back: "\"너와 나, 그리고 우리의 작은 세상\": you and me, and our little world. ♡", pos: "50% 40%" }
  ],

  /* ---------------------------------------------------------------
     THE ROYAL CHRONICLES  (our story, as an illuminated manuscript)
     --------------------------------------------------------------- */
  chronicles: [
    { chapter: "Chapter I",   date: "1.5 years of silence", title: "Classmates Who Never Spoke",  src: "assets/photos/portrait-4.jpg", pos: "50% 62%", text: "One and a half years in the same class. Same lectures, same teachers, same boring days, and we never said a single word to each other. Not one. You were right there the whole time and I had no idea. Biggest waste of time in history, honestly." },
    { chapter: "Chapter II",  date: "The day it began",     title: "The Basketball Invitation",   src: "assets/photos/moment-4.jpg",   pos: "50% 45%", text: "Then one day I just asked: 'Want to play basketball?' Best question I've ever asked anyone. After that we played every single day, all through our hostel days. I don't think I even cared about the score. I just wanted those evenings with you." },
    { chapter: "Chapter III", date: "Mid-March",            title: "It Became Us",                src: "assets/photos/portrait-3.jpg", pos: "50% 60%", text: "Somewhere in mid-March, it stopped being 'me and her' and became 'us'. And then the first time I held your hand. I was so nervous, and you just held it back like it was the most normal thing in the world. I'll never forget that moment. Ever." },
    { chapter: "Chapter IV",  date: "22 May 2026",          title: "The First Flower",            src: "assets/photos/first-flower.jpg", pos: "50% 50%", text: "That night at First Coffee, the café in Chitkara. And I gave you your first flower: a little white rose. Not the fanciest flower in the world, but I've never been prouder of anything I've held. I still remember your face when you took it. If I could, I'd frame that exact second and hang it in the centre of this museum." },
    { chapter: "Chapter V",   date: "Now",                  title: "Pingu & Motu, Under One Roof", src: "assets/photos/chronicle-3.jpg", pos: "50% 45%", text: "Now we live together. You come home from your internship, we put on Bigg Boss, there's junk food everywhere, you call me 'baabbuuuu' in that funny voice, I call you Motu (every time), and you win whatever argument we're having. Best days of my life. No competition." },
    { chapter: "Chapter VI",  date: "Coming soon",          title: "The Whole World",             src: "assets/photos/portrait-1.jpg", pos: "50% 40%", text: "And next? We travel the world together. Every mountain, every city, every beach, every street food stall (you'll want all of them). The story is still being written, Motu, and I can't wait to write every page of it with you." }
  ],

  /* ---------------------------------------------------------------
     THE MUSKAN TIMES  📰
     --------------------------------------------------------------- */
  newspaper: {
    name: "The Muskan Times",
    motto: "All the News That's Fit to Adore",
    volume: "Vol. ∞ · No. 1",
    price: "Price: One Packet of Chips",
    photo: "assets/photos/moment-2.jpg",
    photoPos: "50% 54%",
    photoCaption: "ABOVE: Her Royal Highness rests her head on Pingu's shoulder in the middle of a shop. Pingu forgot what they came to buy and has not recovered since. (Royal Photographer: Pingu, holding the phone.)",
    headline: "PRINCESS MUSKAN ONCE AGAIN LEAVES HER KINGDOM SPEECHLESS!",
    subhead: "Citizens report weak knees, involuntary grinning, and one king who can't stop staring. Royal physicians say there is no cure, and frankly, nobody wants one.",
    lead: {
      title: "Princess Returns From Internship; Kingdom Loses All Composure",
      body: [
        "THE ROYAL APARTMENT — In a development that surprised absolutely no one, Princess Muskan returned home from another long day at her internship and was once again effortlessly wonderful, leaving the entire household (Pingu) in a state of stunned, slightly dizzy silence.",
        "Witnesses describe the evening as \"a laugh, followed by a very loud 'baabbuuuu', followed by the king forgetting what he was saying mid-sentence.\" Bigg Boss was paused for several minutes while the king recovered.",
        "\"She was just telling me about her day,\" said the king, visibly emotional. \"She's so focused at work. So serious. Then she gets home and immediately asks where the chips are. How is one person this perfect?\"",
        "The princess has declined to comment, as she was busy winning an argument. Sources confirm she won. Sources also confirm the king doesn't know what the argument was about."
      ]
    },
    articles: [
      { kicker: "BREAKING", title: "Local King Reportedly Falls in Love With Princess Again", illo: "heart",
        body: "For the 4,817th consecutive time this year, King Pingu was observed falling hopelessly in love with Princess Muskan. Palace sources say the latest incident happened during a Bigg Boss episode, when the princess laughed at a contestant and the king stopped watching the TV entirely. Experts warn that further episodes (of both kinds) are expected nightly." },
      { kicker: "ARTS & CULTURE", title: "Princess Muskan Declared Officially Too Beautiful for Ordinary Portraits", illo: "frame",
        body: "The Royal Academy of Fine Arts has formally admitted defeat. \"We tried oils, watercolours, charcoal, and one very ambitious AI Diwali photo,\" said the Academy's director. \"None of it was enough.\" Canvases across the kingdom have filed complaints about feeling inadequate. The king says this is \"fair, honestly.\"" },
      { kicker: "ROYAL DECREE", title: "Kingdom Announces Unlimited Cuddle Privileges", illo: "crown",
        body: "In a landmark ruling, the Royal Council has granted Princess Muskan unlimited, non-expiring cuddle privileges, effective immediately and forever. The decree covers post-internship cuddles, Bigg Boss cuddles, junk-food-coma cuddles, and the rare but legendary \"no reason at all\" cuddle. Because the royal couple now share a castle, the king has been placed on permanent, 24-hour standby." },
      { kicker: "SCIENCE", title: "Royal Scientists Unable to Explain Her Ability to Make Someone Smile", illo: "telescope",
        body: "After months of research and an alarming amount of junk food, the Royal Institute of Science concluded that the princess's smile-inducing ability \"defies all known laws of physics.\" Lead researcher Dr. Grin noted: \"She just says 'baabbuuuu' in a funny voice and his entire face changes. We have no equations for this.\" Funding has been increased indefinitely." }
    ],
    briefs: [
      { title: "WEATHER", body: "Forecast: 100% chance of her being adorable. Scattered giggles in the afternoon. A strong 'baabbuuuu' front moving in by evening." },
      { title: "MARKETS", body: "Junk food stocks up 400%. Bad days down to an all-time low. Analysts credit one (1) princess." },
      { title: "ENTERTAINMENT", body: "Bigg Boss ratings in the royal apartment remain sky-high. The princess has correctly predicted another eviction. The king has predicted nothing, ever." },
      { title: "SPORTS ARCHIVE", body: "After 1.5 years of total silence, a classmate named Pingu asked a girl to play basketball. They played every day until hostel ended. Experts call it the greatest assist in recorded history." },
      { title: "ROYAL RADIO", body: "\"Khat\" holds the #1 spot for the 35th week running. The royal couple refuse to let anything else chart." }
    ],
    classifieds: [
      "WANTED: One more episode of Bigg Boss before bed. And then one more. Contact: Motu & Pingu.",
      "LOST: One small star, the brightest in the sky, glowing rose-gold and shaped like a tiny crown. Last seen in the HALL OF A THOUSAND STARS, hiding among the ordinary ones. Finder will know it when they see it. ✦",
      "FOR SALE: Pingu's hoodie. Just kidding. Motu already took it.",
      "NOTICE: The junk food cupboard has been restocked. The princess will share it anyway, because she shares everything. The kingdom is baffled.",
      "ANNOUNCEMENT: Flower count officially started 22 May 2026, with one white rose at First Coffee, Chitkara, late at night. The king plans to never stop counting."
    ],
    extraHeadlines: [
      "Princess Says 'Baabbuuuu' — Kingdom Holds Breath",
      "Pingu Calls Princess 'Motu' For The 10,000th Time; Survives, Narrowly",
      "Princess Wins Argument; King Still Unsure What It Was About",
      "Bigg Boss Contestant Evicted Exactly As Princess Predicted",
      "Basketball Court Where It All Began Declared National Monument",
      "Royal Couple Announce World Tour; Dates To Be Decided By Princess",
      "Princess Shares Her Last Chip; Scientists Call It 'A Miracle'",
      "King Caught Smiling At Phone Again; 'It's Her,' Confirm Sources",
      "'Khat' Plays Once; King Immediately Thinks Of Princess"
    ]
  },

  /* ---------------------------------------------------------------
     THE HALL OF A THOUSAND STARS  ✨
     --------------------------------------------------------------- */
  stars: {
    title: "A Thousand Little Reasons",
    subtitle: "Every star in this sky is a reason. Touch one.",
    reasons: [
      "Your laugh. Honestly, it's my favourite sound in the world.",
      "When you call me 'baabbuuuu' in that funny voice. I lose it every time.",
      "You believe in me, even on the days I don't believe in myself.",
      "How focused you get when you're working. Not gonna lie, it's kind of attractive.",
      "You share everything with me. Even your junk food. That's real love.",
      "Watching Bigg Boss with you is better than the actual show.",
      "You always win our arguments, and somehow I'm happy about it.",
      "That you said yes to a random basketball game.",
      "All those evenings on the court back in hostel days.",
      "The first time you held my hand.",
      "That night at First Coffee in Chitkara, and your face when I gave you that little white rose.",
      "Coming home to you.",
      "How hard you work at your internship and still have time for me.",
      "The way your smile changes my entire day.",
      "How you make ordinary moments feel special.",
      "Your little expressions. Every single one.",
      "The way you care, quietly and completely.",
      "Simply being yourself.",
      "How excited you get about junk food, like it's a festival every time.",
      "That you're my Motu.",
      "How a normal day with you feels like an adventure.",
      "That we're going to see the whole world together.",
      "That 'Khat' is our song, and now it always sounds like you.",
      "That out of everyone, you chose me.",
      "Because there's only one you, and I'm the lucky one who gets you."
    ],
    secret: "You found the crown star, Motu. Of course it was you. Out of all the lights in this sky, you were always going to be the one that shines the most. Just like in my life. ✦"
  },

  /* ---------------------------------------------------------------
     HER ROYAL IDENTITY CARD  👑
     --------------------------------------------------------------- */
  idCard: {
    photo: "assets/photos/portrait-2.jpg",
    photoPos: "50% 30%",
    name: "Princess Muskan",
    title: "Her Majesty, The One and Only",
    kingdom: "The Kingdom of Love",
    status: "Eternally Adored",
    powers: "Stealing hearts, making days better, winning every argument, and being impossibly adorable",
    privileges: "Unlimited cuddles, unlimited attention, unlimited junk food, and the right to annoy the king",
    issuedBy: "The Royal Museum of Her Kingdom",
    number: "No. MOTU-∞-001",
    issued: "Mid-March (officially)",
    expires: "Never. Not even a little.",
    back: {
      heading: "Terms & Conditions of Royalty",
      terms: [
        "Holder may cause spontaneous smiling in a 50-mile radius.",
        "Holder controls the Bigg Boss remote. This is non-negotiable.",
        "Holder is legally always right, retroactively.",
        "Saying 'baabbuuuu' in a funny voice is a royal command.",
        "This card cannot be revoked, cancelled, or argued with (you'd lose)."
      ],
      found: "IF FOUND: Return holder to Pingu immediately. Reward: unlimited hugs and one packet of chips.",
      warning: "⚠ WARNING: Excessive cuteness. Handle with care."
    }
  },

  /* ---------------------------------------------------------------
     THE ROYAL PRIVILEGE BOOK  📜
     --------------------------------------------------------------- */
  privileges: {
    title: "The Royal Book of Privileges",
    subtitle: "Being the Official & Binding Laws Concerning Her Royal Highness, Princess Muskan (a.k.a. Motu)",
    rules: [
      { rule: "The princess is always allowed to steal the king's hoodies.", note: "Clause 1(b): Once stolen, a hoodie becomes princess property. Appeals are not accepted.", illo: "hoodie" },
      { rule: "The princess has unlimited rights to demand attention.", note: "At any hour. For any reason. Including no reason. Especially no reason.", illo: "bell" },
      { rule: "The king must tolerate random cuteness.", note: "Especially the 'baabbuuuu' voice. The king has no defence against it and has stopped trying.", illo: "sparkle" },
      { rule: "Princess complaints must be heard immediately.", note: "Even during Bigg Boss. (Okay, the ad break is also acceptable.)", illo: "scroll" },
      { rule: "The princess is never required to share her food.", note: "She shares everything anyway, even her junk food. Scientists are baffled. The king is grateful.", illo: "cake" },
      { rule: "The king is officially responsible for making her smile.", note: "Failure to do so within 24 hours triggers an emergency junk food delivery.", illo: "smile" },
      { rule: "Bigg Boss nights are sacred.", note: "No spoilers. No phones. The princess decides who we're supporting this season.", illo: "glass" },
      { rule: "The princess wins every argument. Retroactively.", note: "Official record so far: Princess, every single one. Pingu, zero. Rematches are not permitted.", illo: "trophy" },
      { rule: "After a long internship day, the princess is owed snacks, hugs and a listening ear.", note: "The king shall nod, say 'you're so right', and mean it.", illo: "hand" },
      { rule: "The princess may call the king 'Pingu' anywhere, anytime, in front of anyone.", note: "The king calls her 'Motu' every single time. This is a term of deepest love and is not up for debate. (She may still hit him.)", illo: "heart" },
      { rule: "The princess always gets the best seat, the blanket and the last bite.", note: "This law predates the kingdom itself (and the basketball game).", illo: "crown" }
    ],
    closing: "Signed, sealed and lovingly enforced by Pingu, King of the Kingdom of Love."
  },

  /* ---------------------------------------------------------------
     THE ROYAL WISHING WELL  ⛲
     --------------------------------------------------------------- */
  wishes: {
    intro: "If I could make one wish for my princess...",
    list: [
      "I'd wish you happiness: the deep, quiet kind that stays even on boring Tuesdays.",
      "I'd wish you success in your internship, your career, and every single thing you work so hard for. You deserve all of it.",
      "I'd wish you peace: a calm mind, easy days, and nights where you sleep well.",
      "I'd wish you confidence, so you could see yourself exactly the way I see you.",
      "I'd wish that you always believe in yourself the way you believe in me.",
      "I'd wish us a passport full of stamps. The whole world, Motu, together.",
      "I'd wish you endless junk food that never, ever makes your stomach hurt.",
      "I'd wish that you always know, every single day, that I'm thinking about you. Only you.",
      "And if I had one wish left... I'd wish for a lifetime of Bigg Boss nights, 'baabbuuuu's and you."
    ]
  },

  /* ---------------------------------------------------------------
     THE LOCKED LOVE LETTER  💌
     Each string in an array becomes one paragraph.
     --------------------------------------------------------------- */
  letter: {
    doorText: "Some words deserve their own little room.",
    salutation: "My dearest Muskan,",

    opening: [
      "I made you a whole museum, and this was still the hardest room to write. Everything outside these walls is jokes and newspapers and royal nonsense. This part is just me, talking to you, saying the things I don't always manage to say out loud."
    ],

    memories: [
      "Do you realise we sat in the same class for one and a half years and never talked? Not even once. I still can't believe I wasted all that time. And then one day I asked you to play basketball. Honestly, the best question I've ever asked anyone.",
      "After that it was basketball every single day, all through hostel. I don't think I even cared about the game. I just wanted those evenings with you.",
      "Then mid-March happened, and suddenly it was us. I'll never forget the first time I held your hand. I was so nervous, and you just held it back like it was the most normal thing in the world. I think about that moment more than you know. And 22 May: that night at First Coffee in Chitkara, and the first flower I ever gave you. A little white rose. I still remember your face.",
      "Now we live together. You come back from your internship, we put on Bigg Boss, there's junk food everywhere, you call me 'baabbuuuu' in that funny voice and I just start laughing. These are honestly the best days of my life."
    ],

    apologies: [
      "I want to say sorry for something. There were times in the past when I didn't understand your side. I was too caught up in how I felt to really listen to how you felt, and that wasn't fair to you. I'm sorry, Muskan. I'm learning, and I promise I'll keep trying to see things through your eyes too."
    ],

    gratitude: [
      "Thank you for believing in me. Seriously. You believed in me when I didn't believe in myself, and you still do, every day. You have no idea how much that means to me. A lot of who I'm becoming is because of you.",
      "And thank you for sharing everything with me: your food, your time, your days, your heart. I don't take any of it for granted."
    ],

    feelings: [
      "I want you to know something, and I want you to really believe it: I always think about you. Only you. When I wake up, in the middle of the day, when something funny happens, when Khat comes on, it's always you in my head. There is nobody else. There never will be.",
      "And be proud of yourself, Motu. Look at you: working so hard, so focused, doing your internship, still taking care of me and still making me laugh every single day. I'm so proud of you. I hope you're proud of yourself too.",
      "We're going to travel the whole world together. And wherever we end up, home will always be wherever you are.",
      "I love you. So much. More every single day."
    ],

    closing: "Forever yours,",
    signature: "Your Pingu",
    signatureSub: "(your baabbuuuu, Tejasvi)",
    photo: "assets/photos/moment-2.jpg",   // pinned to the bottom of the letter
    photoCaption: "us ♡"
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
      "It's that this entire kingdom only exists because of her, the girl who sat in the same classroom for a year and a half, said yes to one basketball game, and changed everything.",
      "Every gallery is a love letter. Every room is a thank-you. Every star is a promise.",
      "Long live Princess Muskan. Long live my Motu. Long live the one who made a king out of an ordinary Pingu."
    ],
    signature: "— With all my love, now and always,"
  },

  /* ---------------------------------------------------------------
     OUR JOURNEY  🎬  (the animated story that plays after the gates open)
     --------------------------------------------------------------- */
  journey: {
    title: "Our Journey",
    subtitle: "Starring Pingu & Motu",
    board: "Same class · 1.5 years · 0 words 🤐",
    scenes: [
      { date: "1.5 years of silence",                  text: "Same class. Same lectures. One and a half years… and not a single word." },
      { date: "The day it began",                      text: "Then one day, Pingu found his courage. After that: basketball every single day, all through hostel." },
      { date: "Mid-March",                             text: "It became us. And the first time I held your hand, I didn't want to let go." },
      { date: "22 May 2026 · First Coffee, Chitkara",  text: "A late night, a little white rose, and the first flower I ever gave you." },
      { date: "Now",                                   text: "One home. Bigg Boss nights. Junk food everywhere. And a lot of 'baabbuuuu'." },
      { date: "And then…",                             text: "He built her a whole kingdom. Come in, Your Highness." }
    ],
    lines: {
      silence: "…",
      ask: "Wanna play basketball? 🏀",
      yes: "Okay! 😊",
      rose: "This is for you ✿",
      roseReply: "Pingu… 🥹",
      babu: "baabbuuuu! 😆",
      babuReply: "Haan Motu? 😂",
      museum: "Pingu… what is this?!",
      museumReply: "Your kingdom, Motu 👑"
    }
  },

  /* ---------------------------------------------------------------
     THE BASKETBALL COURT  🏀  (mini-game — a message appears per basket)
     --------------------------------------------------------------- */
  court: {
    title: "The Basketball Court",
    subtitle: "Where it all began",
    lede: "This is where Pingu shot his shot. Now it's your turn, Motu.",
    messages: [
      "Swish! Just like the day I asked you to play basketball. Best shot I ever took. 🏀",
      "Nothing but net. Just like how nothing but you is on my mind.",
      "You score every time. Especially in arguments. 😌",
      "That one went straight into my heart, Motu.",
      "The hostel-days champion is back! 🏆",
      "Okay, show-off. Still not as impressive as your laugh.",
      "Three points for you, unlimited cuddles for me? Deal.",
      "Even the hoop can't resist you. Same, honestly."
    ],
    cheers: ["Wooo! That's my Motu! 🎉", "Swish!! 😍", "Unstoppable!", "MVP! 🏆"],
    misses: ["So close! Again 😄", "The rim got shy. Try again!", "That was a warm-up, right?", "Still amazing 🫶"]
  },

  /* ---------------------------------------------------------------
     THE TWO OF YOU, FOLLOWING HER AROUND THE MUSEUM
     Each room: list of [who, line]. "who" is "pingu" or "motu".
     --------------------------------------------------------------- */
  buddies: {
    rooms: {
      map:        [["motu", "Pingu, where do we go first?"], ["pingu", "Wherever you want, Motu."]],
      portraits:  [["pingu", "Honestly? She's prettier in person."]],
      moments:    [["motu", "Who allowed THAT photo?! 😤"], ["pingu", "Me. The king."]],
      chronicles: [["pingu", "1.5 years of not talking. Never again."]],
      times:      [["motu", "Who writes this newspaper?!"], ["pingu", "…no comment."]],
      stars:      [["pingu", "Every single one of these is about you."]],
      records:    [["motu", "Unlimited junk food is legally binding now."]],
      library:    [["pingu", "Rule 8 is very unfair."], ["motu", "Rule 8 stays."]],
      garden:     [["motu", "Make a wish, baabbuuuu!"]],
      letter:     [["pingu", "Read this one slowly, okay?"]],
      throne:     [["motu", "Long live… me? 👑"], ["pingu", "Always."]]
    },
    random: {
      pingu: ["Motu, snacks? 🍟", "Bigg Boss tonight?", "I love you 🤍", "Race you to the next room!", "Khat on repeat?", "Motu!!"],
      motu:  ["baabbuuuu! 😆", "Stop staring, Pingu.", "I'm hungry.", "I won that argument btw.", "Hehe 🤭", "Pingu!!"]
    }
  },

  /* ---------------------------------------------------------------
     Background music — your song, "Khat".
     Add the mp3 file at  assets/khat.mp3  (it plays after she opens the
     gates; the speaker button turns it off). Leave "" for no music.
     --------------------------------------------------------------- */
  music: "assets/khat.mp3"
};
