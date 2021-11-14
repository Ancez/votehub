import React from "react";

let emojis = [
  '1F3A8', '1F3AD', '1F5BC', '1F9F5', '1F9F6', '1FAA1', '1FAA2', // art 0-6
  '1F3C5', '1F3C6', '1F396', '1F947', '1F948', '1F949', // award 7-12
  '1F3AB', '1F9E7', '1F9E8', '1F38A', '1F38B', '1F38D', '1F38E', '1F38F', '1F39F', '1F380',
  '1F381', '1F383', '1F384', '1F386', '1F387', '1F388', '1F389', '1F390', '1F391', '1F397', '2728', // event 13-33
  '1F0CF', '1F3AE', '1F3AF', '1F3B0', '1F3B1', '1F3B2', '1F3B4', '1F004', '1F9E9', '1F9F8', '1F9FF', '1F52E',
  '1F579', '1FA80', '1FA81', '1FA84', '1FA85', '1FA86', '265F', '2660', '2663', '2665', '2666', // game 34-56
  '1F3A3', '1F3B3', '1F3BD', '1F3BE', '1F3BF', '1F3C0', '1F3C8', '1F3C9', '1F3CF', '1F3D0', '1F3D1', '1F3D2',
  '1F3D3', '1F3F8', '1F6F7', '1F93F', '1F94A', '1F94B', '1F94C', '1F94D', '1F94E', '1F94F', '1F945', '26BD',
  '26BE', '26F3', '26F8' // sport 57-83
]

let randomEmojiIndex = Math.floor(Math.random() * Math.floor(83))
let randomEmojiCode = emojis[randomEmojiIndex]

async function importEmoji():Promise<any> {
  // return await import 'openmoji/src/activities/arts-crafts/'
}

export function Emoji() {

  return (
  <div>
    {/*{emoji}*/}
  </div>
)
}