# GA-Project-1
## RPG Boy

### Description
- Control a pixel character to hunt and kill several monsters.
- Clear the level by killing all of them before the alotted time.
- Be wary of losing too much health or you could die!

### How to play
- Use the Arrow-Keys to move RPG Boy around.
- Holding down Space will commence his attack pattern.
  - As long as a monster is within range, it will be damaged by his attack.
- Going up the levels will increase both RPG Boy's range and size.
- The timer will always start at 30 seconds every level.
- Killing monsters will recover health and time.

### Technologies used
#### Canvas
  - Canvas was used to facillitate free-movement and fast FPS, which was part of the initial thought design.
  - As it was something that class did not touch on, I wanted to challenge myself and learn something completely new. It was difficult and definitely still is, but after             spending a week on this project, I've grown more comfortable with it, and can manipulate it far better than i could before.

### Problems faced
1. The first problem I encountered was with the spawning of the monsters. Admittedly, I was still very unsure how to use canvas at the start of the week. It worked differently        from HTML elements and required plenty of Google-fu to make sense of anything. 

   - #### Randomizing of monster locations & Movements
    - I had initially hardcoded a single monster and the hero to be able to interact with each other. The problem, though, was that it didn't translate well dynamically. When i       tried to do the same thing ; attaching the function to my renderer function (renderAll), all I got was a bunch of monsters reappearing every 25 milliseconds at random           locations.
    - As to making them move, I faced a problem in making them bounce back. The intent was to have their coordinates turn negative once they reached the threshold of the canvas.
      This was problematic, and in a bid to reach the MVP ASAP before Tuesday, I settled for having them reappear at the opposite ends of the screen.
      
      Much of the code structure was deduced after studying the codepen below. The developer had movements that I sorely wanted, but I still needed to add personal changes, so I       had to deconstruct the code bit by bit and see which parts worked, and which segments did what.
      
      [https://codepen.io/jareilly/pen/mepMKN?editors=0010](url)
      
2. Drawing the hero was difficult. The format was different and required some study. Which parameters required the width/height, **why** said parameters required them, and what      did they do.
3. A third problem was the health/timer bars. It was an aesthetic problem. Changing the color for some reason ignored whatever color I requested, changing it into a deep green.      After consulting with Wei Jie, he discovered that as it was an experimental module, specific code was required to change it to the colors that I wanted.
4. The latest issue faced was one regarding Local Storage. I wanted to keep the latest High score of the player, and save it to the cache of the site. This was largely              successful, except for the problem that the HTML would not depict those changes unless the page was refreshed. 

   After some research and discussions with both Alex and my wife, I discovered that even though the L.S saved the values, it wasn't being pulled like it should be. Thus,          creating a function that specifically returned those values fixed the problem.
   
### Credits
1. Wei Jie
2. Alex
3. T.K.L
