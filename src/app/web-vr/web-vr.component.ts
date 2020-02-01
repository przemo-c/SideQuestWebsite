import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-web-vr",
  templateUrl: "./web-vr.component.html",
  styleUrls: ["./web-vr.component.css"]
})
export class WebVRComponent implements OnInit {
  webvrGames = [
    {
      url: "https://webvr.soundboxing.co/",
      title: "Soundboxing Beta",
      author: "Soundboxing + Supermedium",
      description:
        "A VR music kickboxing game with beats created by people. If you feel the urge to dance, you're doing it right!",
      image: "https://supermedium.com/superassets/site/soundboxing.jpg",
      logo: "https://supermedium.com/superassets/site/soundboxing.png"
    },
    {
      url: "https://joshshadik.github.io/jelly-face/",
      title: "Jelly Face",
      author: "Josh Shadik",
      description:
        "Pinch and squeeze these celebrities' cheeks, or their entire head! Grandmas love this.",
      image: "https://supermedium.com/superassets/site/jellyface.jpg",
      logo: "https://supermedium.com/superassets/site/jellyface.png"
    },
    {
      url: "https://patches.vizor.io/machinedrum/ocean-of-thought",
      title: "Ocean of Thought",
      author: "machinedrum + fthr + lintu",
      description:
        "A surreal and relaxive music experience for Machine Drum's Ocean of Thought.",
      image: "https://supermedium.com/superassets/site/oceanofthought.jpg",
      logo: "https://supermedium.com/superassets/site/oceanofthought.png"
    },
    {
      url: "https://supermedium.com/gunters-of-oasis-deploy/",
      title: "Gunters of OASIS",
      author: "Supermedium",
      description:
        "Hundreds of generated worlds, among one lies a golden egg. First gunters to find it inherit half a hundred dollars and the OASIS.",
      image: "https://supermedium.com/superassets/site/guntersofoasis.jpg",
      logo: "https://supermedium.com/superassets/site/guntersofoasis.png"
    },
    {
      url: "http://apps.amandaghassaei.com/OrigamiSimulator/",
      title: "Origami Simulator",
      author: "Amanda Ghassaei",
      description:
        "Grab, stretch, and simulate dozens of origami patterns folding and creasing simultaneously in 3D.",
      image: "https://supermedium.com/superassets/site/origamisimulator.jpg",
      logo: "https://supermedium.com/superassets/site/origamisimulator.png"
    },
    {
      url: "https://experiments.withgoogle.com/webvr/inside-music/view/",
      title: "Inside Music",
      author: "Song Exploder + Google",
      description:
        "Step inside music to get a closer look at how they're made. Explode songs to their individual ingredients.",
      image: "https://supermedium.com/superassets/site/insidemusic.jpg",
      logo: "https://supermedium.com/superassets/site/insidemusic.png"
    },
    {
      url: "https://slime-freighter.glitch.me/?autoplay=true",
      title: "Slime Freighter",
      author: "Ethan Rabb (algoraphics)",
      description:
        "A trip down a road. Emphasis on trip. VR music experience for Big Black Delta's 'Side of the Road'.",
      image: "https://supermedium.com/superassets/site/slimefreighter.jpg",
      logo: "https://supermedium.com/superassets/site/slimefreighter.png"
    },
    {
      url: "https://sketchfab.com/models/311d052a9f034ba8bce55a1a8296b6f9",
      title: "Van Gogh Room",
      author: "Ruslan Sokolovsky",
      description:
        "The room of the artist. Recreation of Vincent Van Gogh's 'The Bedroom' painting.",
      image: "https://supermedium.com/superassets/site/vangoghroom.jpg",
      logo: "https://supermedium.com/superassets/site/vangoghroom.png"
    },
    {
      url: "https://sketchfab.com/models/2324f9685404433fa6231c7cb2cd2ff5",
      title: "Apollo 11",
      author: "The Arck Project",
      description:
        "Neil Armstrong & Buzz Aldrin landed on the moon July 20, 1969. Step onto the lunar surface alongside Armstrong.",
      image: "https://supermedium.com/superassets/site/apollo11.jpg",
      logo: "https://supermedium.com/superassets/site/apollo11.png"
    },
    {
      url: "https://sketchfab.com/models/69be107ca5234ca8a9fcff6ba6851e9e",
      title: "Sherlock",
      author: "Aurelien Martel",
      description:
        "Visit 221B Baker Street, home of the world's most renowned detective.",
      image: "https://supermedium.com/superassets/site/sherlock.jpg",
      logo: "https://supermedium.com/superassets/site/sherlock.png"
    },
    {
      url: "https://supermedium.com/supersays/src",
      title: "Super Says",
      author: "@feiss",
      description:
        "Test your memory with Super. Memorize the color sequence and grab a high score!",
      image: "https://supermedium.com/superassets/site/supersays.jpg",
      logo: "https://supermedium.com/superassets/site/supersays.png"
    },
    {
      url: "https://sketchfab.com/models/618ea0209b1045e89b2c6d2b74d0956e",
      title: "Lily & Snout",
      author: "Sketchfab",
      description:
        "A girl, a dragon, and some berries. Pick your vantage point and watch this charming VR short.",
      image: "https://supermedium.com/superassets/site/lilyandsnout.jpg",
      logo: "https://supermedium.com/superassets/site/lilyandsnout.png"
    },
    {
      url: "https://sketchfab.com/models/90034cbe58904828a11429395cef9125",
      title: "Tomb of Nefertari",
      author: "scionk",
      description:
        "A 3D reconstruction of QV66, the tomb of Egyptian queen Nefertari (1255 BC), in the Valley of the Queens.",
      image: "https://supermedium.com/superassets/site/nefertari.jpg",
      logo: "https://supermedium.com/superassets/site/nefertari.png"
    },
    {
      url: "https://sketchfab.com/models/478d32513eda44338b59aa2284ee01b8",
      title: "Sea Railway",
      author: "fongoose",
      description: "Relive the Sea-Railway scene from Spirited Away.",
      image:
        "https://supermedium.com/superassets/site/spiritedawaysearailway.jpg",
      logo:
        "https://supermedium.com/superassets/site/spiritedawaysearailway.png"
    },
    {
      url: "https://aframe.io/a-painter/",
      title: "A-Painter",
      author: "A-Frame Authors",
      description:
        "Paint in VR! Create a masterpiece with dozens of brushes available. Save your painting and share it with your friends.",
      image: "https://supermedium.com/superassets/site/apainter.jpg",
      logo: "https://supermedium.com/superassets/site/apainter.png"
    },
    {
      url: "https://tonite.dance/",
      title: "Dance Tonite",
      author: "Jonathan Puckey and Moniker",
      description:
        "Go from room to room watching dances created entirely by fans. An ever-changing VR collaboration by LCD Soundsystem.",
      image: "https://supermedium.com/superassets/site/dancetonite.jpg",
      logo: "https://supermedium.com/superassets/site/dancetonite.png"
    },
    {
      url:
        "https://player.with.in/embed/?id=541&resolution=1920&forced=false&autoplay=true&t=0&internal=true",
      title: "Under Neon Lights",
      author: "Within",
      description:
        "Enter a world of imagination and color in this interactive music experience for The Chemical Brothers Under Neon Lights.",
      image: "https://supermedium.com/superassets/site/underneonlights.jpg",
      logo: "https://supermedium.com/superassets/site/underneonlights.png"
    },
    {
      url: "https://tabel.withgoogle.com/film",
      title: "Tabel",
      author: "Art Copy & Code + Google",
      description:
        "A tasty allegory for global inaction in the face of climate change. Listen to the conversation you want.",
      image: "https://supermedium.com/superassets/site/tabel.jpg",
      logo: "https://supermedium.com/superassets/site/tabel.png"
    },
    {
      url: "https://forest.webvrexperiments.com/",
      title: "Musical Forest",
      author: "Google Creative Lab",
      description:
        "Join users from around the world in a musical forest. Tap or click a shape to play it. You can add shapes too!",
      image: "https://supermedium.com/superassets/site/musicalforest.jpg",
      logo: "https://supermedium.com/superassets/site/musicalforest.png"
    },
    {
      url: "https://supermedium.com/puzzle-rain/app/?mode=normal",
      title: "Puzzle Rain",
      author: "Mozilla",
      description: "A musical WebVR journey.",
      image: "https://supermedium.com/superassets/site/puzzlerain.jpg",
      logo: "https://supermedium.com/superassets/site/puzzlerain.png"
    },
    {
      url: "https://xplsv.github.io/obsidian/?webvr",
      title: "Obsidian",
      author: "xplsv + Mr.doob",
      description:
        "To the electronic beat of Om Unit and Lorn, watch an ever-changing sphere as you travel down a tunnel of lights bombarding the senses.",
      image: "https://supermedium.com/superassets/site/obsidian.jpg",
      logo: "https://supermedium.com/superassets/site/obsidian.png"
    },
    {
      url: "https://mrdoob.github.io/brokenmantra/?webvr",
      title: "Broken Mantra",
      author: "Mr.doob",
      description:
        "Feel the bass in a computer generated music video for Lorn's 'Broken Mantra'. Orbs, particles, lights, streaks, glitch, music.",
      image: "https://supermedium.com/superassets/site/brokenmantra.jpg",
      logo: "https://supermedium.com/superassets/site/brokenmantra.png"
    },
    {
      url: "http://paragram.io/view/?id=stahl&vr=true",
      title: "Stahl House",
      author: "Paragram",
      description:
        "Visit Stahl House in Hollywood Hills, an iconic representation of modern architecture in LA.",
      image: "https://supermedium.com/superassets/site/stahlhouse.jpg",
      logo: "https://supermedium.com/superassets/site/stahlhouse.png"
    },
    {
      url: "https://supermedium.com/three.js/examples/webvr_vive_paint.html",
      title: "Paint",
      author: "Mr.doob",
      description: "Paint, draw, doodle, sketch.",
      image: "https://supermedium.com/superassets/site/paint.jpg",
      logo: "https://supermedium.com/superassets/site/paint.png"
    },
    {
      url:
        "https://www.blend4web.com/apps/space_disaster/space_disaster.html?v=063e38d76f7a243a3b5b97e9ce5d0b96",
      title: "Space Disaster",
      author: "Blend4Web",
      description:
        "Zip through the asteroid belt in your laser-equipped spaceship.",
      image: "https://supermedium.com/superassets/site/spacedisaster.jpg",
      logo: "https://supermedium.com/superassets/site/spacedisaster.png"
    },
    {
      url: "http://swimminglessonsformodernlife.com/polygon-shredder/",
      title: "Polygon Shredder",
      author: "Jaume Sanchez Elias (@thespite)",
      description:
        "A whirlwind of confetti amassed from shredded cubes and polygons.",
      image: "https://supermedium.com/superassets/site/polygonshredder.jpg",
      logo: "https://supermedium.com/superassets/site/polygonshredder.png"
    },
    {
      url: "https://findinglove.activetheory.net/",
      title: "Finding Love",
      author: "Active Theory",
      description:
        "We fall in love by chance. We stay in love by chance. A virtual reality story for us.",
      image: "https://supermedium.com/superassets/site/findinglove.jpg",
      logo: "https://supermedium.com/superassets/site/findinglove.png"
    },
    {
      url: "https://sonicumbrella.com/",
      title: "Sonic Umbrella",
      author: "Plan 8",
      description:
        "Stand under a umbrella and hear the sounds of raining dog toys, ping pong balls, and more. Listen to objects crashing all around.",
      image: "https://supermedium.com/superassets/site/sonicumbrella.jpg",
      logo: "https://supermedium.com/superassets/site/sonicumbrella.png"
    },
    {
      url: "https://ngokevin.github.io/up-there-webvr",
      title: "Up There",
      author: "Charlie Hoey (@flimshaw)",
      description:
        "Planetarium of 100K real stars. Spot exoplanets, travel through time, hold the galaxy in your hands with the grip buttons.",
      image: "https://supermedium.com/superassets/site/upthere.jpg",
      logo: "https://supermedium.com/superassets/site/upthere.png"
    },
    {
      url: "https://demo.marpi.pl/spider/",
      title: "Spider",
      author: "Marpi",
      description: "Come visit your little pet spider in VR!",
      image: "https://supermedium.com/superassets/site/spider.jpg",
      logo: "https://supermedium.com/superassets/site/spider.png"
    },
    {
      url: "https://aframe-shooting-stars.glitch.me/",
      title: "Shooting Stars",
      author: "Philip Bell",
      description: "Get lost in an explosion of colors.",
      image: "https://supermedium.com/superassets/site/shootingstars.jpg",
      logo: "https://supermedium.com/superassets/site/shootingstars.png"
    },
    {
      url: "https://ngokevin.github.io/float/",
      title: "Float",
      author: "eleVR (incl. Vi Hart)",
      description:
        "A puzzle of floating platforms admist blooming plants and sky islands.",
      image: "https://supermedium.com/superassets/site/float.jpg",
      logo: "https://supermedium.com/superassets/site/float.png"
    },
    {
      url: "http://www.gnometech.com/webvr/aurora/",
      title: "Aurora",
      author: "Gnometech",
      description:
        "Catch the northern lights (aurora borealis) live in Yellowknife, Canada.",
      image: "https://supermedium.com/superassets/site/aurora.jpg",
      logo: "https://supermedium.com/superassets/site/aurora.png"
    },
    {
      url: "https://forestwave.glitch.me/",
      title: "Forest Wave",
      author: "alfredofrlp",
      description: "Trippy space forest.",
      image: "https://supermedium.com/superassets/site/forestwave.jpg",
      logo: "https://supermedium.com/superassets/site/forestwave.png"
    },
    {
      url: "https://crossthestreet.fun/game/",
      title: "Cross the Street",
      author: "SROMLINE",
      description:
        "How many times can you cross the Golden Gate bridge without getting hit by a car? Get on the global leaderboards!",
      image: "https://supermedium.com/superassets/site/crossthestreet.jpg",
      logo: "https://supermedium.com/superassets/site/crossthestreet.png"
    },
    {
      url: "https://bear71vr.nfb.ca/",
      title: "Bear 71",
      author: "National Film Board of Canada",
      description:
        "Blur the line between the wild world and the wired one. Follow Bear 71, a female grizzly bear living in the Canadian Rockies.",
      image: "https://supermedium.com/superassets/site/bear71.jpg",
      logo: "https://supermedium.com/superassets/site/bear71.png"
    },
    {
      url: "https://cecropia.github.io/thehallaframe/",
      title: "The Hall",
      author: "Cecropia Solutions",
      description:
        "A fine little museum. Statues, kinectic sculptures, and paintings.",
      image: "https://supermedium.com/superassets/site/thehall.jpg",
      logo: "https://supermedium.com/superassets/site/thehall.png"
    },
    {
      url: "https://aframe.city/",
      title: "City Builder",
      author: "Kieran Farr",
      description:
        "Create a virtual city with your hands using a library of pixel-style models. You are the mayor.",
      image: "https://supermedium.com/superassets/site/citybuilder.jpg",
      logo: "https://supermedium.com/superassets/site/citybuilder.png"
    },
    {
      url: "https://vr.with.in/",
      title: "Within",
      author: "Within",
      description:
        "Extraordinary stories in virtual reality. Space adventures and marine seascapes. A produced library of 360-degree videos.",
      image: "https://supermedium.com/superassets/site/within.jpg",
      logo: "https://supermedium.com/superassets/site/within.png"
    },
    {
      url: "https://classes.marpi.pl/resonate/",
      title: "Resonate: Audio Reactive",
      author: "Marpi",
      description:
        "Ride the audio reactive waves. First installment of featuring generative VR worlds.",
      image: "https://supermedium.com/superassets/site/resonate.jpg",
      logo: "https://supermedium.com/superassets/site/resonate.png"
    },
    {
      url: "https://speaktogo.withgoogle.com/",
      title: "Speak to Go",
      author: "Google Creative Lab",
      description:
        "Discover somewhere new in the world. 360-degree imagery from around the globe. Press the trigger instead of the spacebar.",
      image: "https://supermedium.com/superassets/site/speaktogo.jpg",
      logo: "https://supermedium.com/superassets/site/speaktogo.png"
    },
    {
      url: "https://spacerocks.moar.io/",
      title: "Space Rocks",
      author: "Stewart Smith",
      description:
        "Escape through space on stolen plasma engines while slinging photon bolts at deadly asteroids. How many can you blow apart?",
      image: "https://supermedium.com/superassets/site/spacerocks.jpg",
      logo: "https://supermedium.com/superassets/site/spacerocks.png"
    },
    {
      url: "https://christmasexperiments.com//xps/2016/24/dark-haze/",
      title: "Dark Haze",
      author: "Can x Gloom x Marpi x Spite",
      description:
        "Where dust, smoke and other dry particles obscure the clarity of the sky. A Christmas Experiment.",
      image: "https://supermedium.com/superassets/site/darkhaze.jpg",
      logo: "https://supermedium.com/superassets/site/darkhaze.png"
    },
    {
      url: "https://christmasexperiments.com/xps/2016/01/night-eye/",
      title: "Night Eye",
      author: "Lin.Bert Collective",
      description:
        "Using abstract lines to recreate the shape of the animals in the forest. Click the thumb at the winds to move.",
      image: "https://supermedium.com/superassets/site/nighteye.jpg",
      logo: "https://supermedium.com/superassets/site/nighteye.png"
    },
    {
      url: "https://aframe.io/a-blast/",
      title: "A-Blast",
      author: "A-Frame Authors",
      description:
        "Stay alert as creatures happily fire at your from all angles. Protect yourself with laser pistols. Shoot down projectiles that come at you.",
      image: "https://supermedium.com/superassets/site/ablast.jpg",
      logo: "https://supermedium.com/superassets/site/ablast.png"
    },
    {
      url: "https://aframe.io/a-saturday-night/",
      title: "A Saturday Night",
      author: "A-Frame Authors",
      description:
        "The hottest dance club. Be a bear, a chicken, Elvis, or a disco lady, and shake it off. Record a dance in VR and show the world your moves.",
      image: "https://supermedium.com/superassets/site/asaturdaynight.jpg",
      logo: "https://supermedium.com/superassets/site/asaturdaynight.png"
    },
    {
      url: "https://accessmars.withgoogle.com/",
      title: "Access Mars",
      author: "Google Creative Lab & NASA JPL",
      description:
        "The real surface of Mars from over 200,000 photographs sent back to Earth by the Curiosity rover. Used by NASA JPL scientists.",
      image: "https://supermedium.com/superassets/site/accessmars.jpg",
      logo: "https://supermedium.com/superassets/site/accessmars.png"
    },
    {
      url: "https://demo.marpi.pl/archan/eutow/",
      title: "Eutow",
      author: "Marpi",
      description:
        "A Virtual Reality collaboration with Archan Nair, a series of 3D virtual worlds with music by An on Bast.",
      image: "https://supermedium.com/superassets/site/eutow.jpg",
      logo: "https://supermedium.com/superassets/site/eutow.png"
    },
    {
      url: "https://massmigrations.com/ide",
      title: "Mass Migrations",
      author: "Marpi",
      description:
        "An experiment in mecha world creation. Create, adopt and set them free.",
      image: "https://supermedium.com/superassets/site/massmigrations.jpg",
      logo: "https://supermedium.com/superassets/site/massmigrations.png"
    },
    {
      url: "https://virtualart.chromeexperiments.com/vr/",
      title: "Virtual Art Sessions",
      author: "Google",
      description:
        "Six world-renowned artists given a new way to paint, draw, and sculpt. Observe them as they paint.",
      image: "https://supermedium.com/superassets/site/virtualartsessions.jpg",
      logo: "https://supermedium.com/superassets/site/virtualartsessions.png"
    },
    {
      url: "https://playcanv.as//index/GgVZJtha",
      title: "WebVR Lab",
      author: "PlayCanvas",
      description:
        "Fire some confetti and play the record. A small lab demonstrating various interactions in VR. Teleport, grab, throw.",
      image: "https://supermedium.com/superassets/site/playcanvaswebvrlab.jpg",
      logo: "https://supermedium.com/superassets/site/playcanvaswebvrlab.png"
    },
    {
      url: "https://supermedium.com/superframe/scenes/pokemon/",
      title: "Pokemon",
      author: "Kevin Ngo",
      description:
        "Stand from the trainer's stand at the Pokemon Stadium with Pikachu against Charizard.",
      image: "https://supermedium.com/superassets/site/pokemon.jpg",
      logo: "https://supermedium.com/superassets/site/pokemon.png"
    },
    {
      url: "https://sketchfab.com/models/63dd568f5bc64e8694d5f4252924c99e",
      title: "Sherwood Forest",
      author: "Lisa Shcheglova",
      description: "Welcome to Sherwood Forest!",
      image:
        "https://supermedium.com/superassets/site/robinhoodinsherwoodforest.jpg",
      logo:
        "https://supermedium.com/superassets/site/robinhoodinsherwoodforest.png"
    },
    {
      url: "https://sketchfab.com/models/7bb67d1dea724a6eb4ebe21bcf94b09e",
      title: "SIKA",
      author: "Marine Quiviger",
      description:
        "Deer under a cherry blossom on an island in the moonlit lake.",
      image: "https://supermedium.com/superassets/site/sika.jpg",
      logo: "https://supermedium.com/superassets/site/sika.png"
    },
    {
      url: "https://www.shadertoy.com/view/4dSGW1",
      title: "Grid of Cylinders",
      author: "Inigo Quilez (iq)",
      description:
        "An infinite grid of cylinders, like the swelling waves of the ocean. An expanse of mountains, rising and falling, forever.",
      image: "https://supermedium.com/superassets/site/gridofcylinders.jpg",
      logo: "https://supermedium.com/superassets/site/gridofcylinders.png"
    },
    {
      url: "https://www.shadertoy.com/view/Msl3Rr",
      title: "Cubescape",
      author: "Inigo Quilez (iq)",
      description:
        "Marvel at the fine detail of the wood-grained waveforms. Rounded pulsating cubes that bounce to the beat.",
      image: "https://supermedium.com/superassets/site/cubescape.jpg",
      logo: "https://supermedium.com/superassets/site/cubescape.png"
    },
    {
      url: "https://www.shadertoy.com/view/XsjXR1",
      title: "Worms",
      author: "Inigo Quilez (iq)",
      description: "A surreal experience in a forest of strand things.",
      image: "https://supermedium.com/superassets/site/worms.jpg",
      logo: "https://supermedium.com/superassets/site/worms.png"
    },
    {
      url: "https://ravenworks.ca/witch/",
      title: "Witch's Brew",
      author: "Andrew Fraticelli (@ravenworks)",
      description:
        "Mix together a red potion, some blue potion, a bit of yellow potion, and baby you've got a stew going.",
      image: "https://supermedium.com/superassets/site/witchsbrew.jpg",
      logo: "https://supermedium.com/superassets/site/witchsbrew.png"
    },
    {
      url: "https://www.jorgefuentes.net/projects/puppetrilla/",
      title: "Ye Olde Puppetrilla",
      author: "Jorge Fuentes (@jorgefuentesnet)",
      description:
        "Ye Olde Puppetrilla has arrived in town and everybody's here to enjoy your puppeteering skills. It's showtime!",
      image: "https://supermedium.com/superassets/site/puppetrilla.jpg",
      logo: "https://supermedium.com/superassets/site/puppetrilla.png"
    },
    {
      url: "https://www.thedart76.com/webvr/epic-medieval-battle/emb.html",
      title: "Medieval Dance Battle",
      author: "Danilo Pasquariello (@thedart76)",
      description:
        "A medieval dance-off. Sit back and be the judge, who's got the moves?",
      image: "https://supermedium.com/superassets/site/epicmedievalbattle.jpg",
      logo: "https://supermedium.com/superassets/site/epicmedievalbattle.png"
    },
    {
      url: "https://my.panomoments.com",
      title: "PanoMoments",
      author: "PanoMoments",
      description:
        "The GIFs of VR, control time with your gaze! Press any button navigate through visual stories and living photos.",
      image: "https://supermedium.com/superassets/site/panomoments.jpg",
      logo: "https://supermedium.com/superassets/site/panomoments.png"
    },
    {
      url: "http://micosmo.com/trajectilecommand/",
      title: "Trajectile Command",
      author: "@AdamAlexandr",
      description:
        "Defend your cities from missiles and bombers! Inspired by an old arcade classic.",
      image: "https://supermedium.com/superassets/site/trajectilecommand.jpg",
      logo: "https://supermedium.com/superassets/site/trajectilecommand.png"
    },
    {
      url: "https://projects.gatunes.com/wsvr/#/61331/443,-448",
      title: "Walking Simulator VR",
      author: "Daniel Esteban (@danigatunes)",
      description:
        "Not all who wander are lost. An infinite generated Minecraft-like world.",
      image: "https://supermedium.com/superassets/site/walkingsimulator.jpg",
      logo: "https://supermedium.com/superassets/site/walkingsimulator.png"
    },
    {
      url: "https://vrbeats.gatunes.com/",
      title: "VR Beats",
      author: "Daniel Esteban (@danigatunes)",
      description:
        "Come on, DJ, turn the music up. Mix and sequence your own rhythms and tunes!",
      image: "https://supermedium.com/superassets/site/vrbeats.jpg",
      logo: "https://supermedium.com/superassets/site/vrbeats.png"
    },
    {
      url: "https://towermax.fitness/tower/",
      title: "Tower Max Fitness",
      author: "SROMLINE",
      description:
        "TRAIN YOUR POWER WITH THE TOWER. Soundbased VR workout in space on a tower.",
      image: "https://supermedium.com/superassets/site/towermaxfitness.jpg",
      logo: "https://supermedium.com/superassets/site/towermaxfitness.png"
    },
    {
      url: "https://vrblocks.gatunes.com/",
      title: "VRBlocks",
      author: "Daniel Esteban (@danigatunes)",
      description:
        "A tranquil multiplayer Minecraft-like sandbox. The sequel to Walking Simulator.",
      image: "https://supermedium.com/superassets/site/vrblocks.jpg",
      logo: "https://supermedium.com/superassets/site/vrblocks.png"
    },
    {
      url: "https://demos.littleworkshop.fr/demos/track/",
      title: "Track",
      author: "Little Workshop",
      description:
        "Go on a trip. Randomly ever-changing environment composed of various geometrical shapes.",
      image: "https://supermedium.com/superassets/site/track.jpg",
      logo: "https://supermedium.com/superassets/site/track.png"
    },
    {
      url: "https://www.jorgefuentes.net/projects/halloVReen/",
      title: "HalloVReen",
      author: "Jorge Fuentes (@jorgefuentesnet)",
      description:
        "Gaze upon the citizens of Creepville and see what they're up to. Can you find them all?",
      image: "https://supermedium.com/superassets/site/hallovreen.jpg",
      logo: "https://supermedium.com/superassets/site/hallovreen.png"
    },
    {
      url: "https://realmsvr.gatunes.com",
      title: "Realms VR",
      author: "Daniel Esteban (@danigatunes)",
      description: "A recursive VR experience.",
      image: "https://supermedium.com/superassets/site/realmsvr.jpg",
      logo: "https://supermedium.com/superassets/site/realmsvr.png"
    },
    {
      url:
        "https://constructarca.de/construct-arcade/game/barista-express/game/",
      title: "Barista Express",
      author: "Construct Arcade",
      description: "Virtually be a barista in your own cafe.",
      image: "https://supermedium.com/superassets/site/baristaexpress.jpg",
      logo: "https://supermedium.com/superassets/site/baristaexpress.png"
    },
    {
      url: "https://www.bluecybervr.com/episode01/",
      title: "Blue Cyber: Episode 1",
      author: "@bluecybervr",
      description:
        "You are charged to protect the galaxy with powers given from the artfiact, Blue Cyber. A science fantasy VR story.",
      image: "https://supermedium.com/superassets/site/bluecyber.jpg",
      logo: "https://supermedium.com/superassets/site/bluecyber.png"
    },
    {
      url: "https://codercat.tk/monster-or-friend/",
      title: "Monster or Friend",
      author: "Codercat (@kirill @sneha)",
      description:
        "You are followed by a procedurally animated sea space creature. A visual and audio experience.",
      image: "https://supermedium.com/superassets/site/monsterorfriend.jpg",
      logo: "https://supermedium.com/superassets/site/monsterorfriend.png"
    },
    {
      url: "https://moonrider.xyz",
      title: "Moon Rider",
      author: "Supermedium",
      description: "Surf the musical road among the stars, moon, and lights.",
      image: "https://supermedium.com/superassets/site/moonrider.jpg",
      logo: "https://supermedium.com/superassets/site/moonrider.png"
    }
  ];
  searchString = "";
  apps: any;
  constructor() {}

  ngOnInit() {
    this.webvrGames.reverse();
    this.apps = this.webvrGames;
  }

  debounceSearch() {
    this.apps = this.webvrGames.filter(a => {
      return (
        a.title.includes(this.searchString) ||
        (a.description || a.author).includes(this.searchString)
      );
    });
  }
}
