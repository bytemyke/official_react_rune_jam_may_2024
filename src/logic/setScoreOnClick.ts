export function setScoreOnClick(e:any, modifier:number) {
    console.log(e);
    // e.currentTarget.destroy();
    Rune.actions.setScore(modifier);
}
