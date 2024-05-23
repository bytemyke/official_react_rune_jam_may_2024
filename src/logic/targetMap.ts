//gameTime in ms or s, whatever is easier to use (1000ms = 1s)
export function targetMap(gameLength: number) {
   const targetMap = [];
   //for amount we should spawn
  let target = {
    x: 0,
    y: 0,
    img: "../assets/goodTarget.png",
    type:"good",
    spawnTime : 0
};
targetMap.push(target);
//re-arrange array by first spawn time to last spawn time if you didn't build it in that order
}