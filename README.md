# ticky-tac
The ultimate tic-tac-toe

Really, the last one you'll need. 

This game utilizes buttons to store their row `index`, and `place` in their values. It communicates with a local server's Rest API to get the AI's best moves back to the player.

It also works with a miniMax algorithm to traverse all possible multiverse tic-tac-toe outcomes. It uses a recursive search algorithm to 'score' which moves would be best and returns that move to the player. 

---
## How to play 

1. Clone this repo into your computer
2. Execute `yarn install`
3. Run the script `yarn start` for a local build or build it.
4. In a seperate terminal, execute `yarn server` and that'll host the 'AI' that will communicate with the client and play tic-tac-toe

---
## LORE

The `O's` have been at war with this `X's` for many decades. Some say they're still battling at this very moment... Can you stop the war and bring peace back to the game board?

---
Things to improve: 
- Could have added a "loading" state while it waits for the server to compute the next AI move, but it was blazing fast