function game() {
  function moveKnight(pos, end) {
    let deque = [[pos]];
    while (deque) {
      let newDeque = [];
      let lengthDeque = deque.length;
      for (let i = 0; i < lengthDeque; ++i) {
        let list = deque.shift();
        let curr = list[0];
        if (curr[0] < 0 || curr[0] > 7 || curr[1] < 0 || curr[1] > 7) {
          continue;
        } else if (curr[0] == end[0] && curr[1] == end[1]) {
          console.log(
            `You completed it in ${list.length - 1} moves. Here's your path:`,
          );
          return list.reverse();
        }

        let addList = [[curr[0] - 2, curr[1] + 1]].concat(list);
        newDeque.push(addList);
        let addList2 = [[curr[0] - 2, curr[1] - 1]].concat(list);
        newDeque.push(addList2);
        let addList3 = [[curr[0] + 1, curr[1] + 2]].concat(list);
        newDeque.push(addList3);
        let addList4 = [[curr[0] - 1, curr[1] + 2]].concat(list);
        newDeque.push(addList4);
        let addList5 = [[curr[0] + 2, curr[1] + 1]].concat(list);
        newDeque.push(addList5);
        let addList6 = [[curr[0] + 2, curr[1] - 1]].concat(list);
        newDeque.push(addList6);
        let addList7 = [[curr[0] + 1, curr[1] - 2]].concat(list);
        newDeque.push(addList7);
        let addList8 = [[curr[0] - 1, curr[1] - 2]].concat(list);
        newDeque.push(addList8);
      }
      deque = newDeque;
    }
  }

  return { moveKnight };
}

let chess = game();
let moves = chess.moveKnight([3, 3], [4, 3]);
// let moves = chess.moveKnight([3, 3], [5, 4]);

moves.forEach((x) => console.log(x));
