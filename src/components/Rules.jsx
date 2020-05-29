import React from "react";
import { Typography as Font, Modal, Dialog } from "@material-ui/core";
function Rules({openRules,setOpenRules}) {
  const gameRules = [
    "Any live cell with fewer than two live neighbours dies, as if by underpopulation",
    "Any live cell with two or three live neighbours lives on to the next generation",
    "Any live cell with more than three live neighbours dies, as if by overpopulation",
    "Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction",
  ];
  return (
    <div>
      <Dialog open={openRules} onClose={() => setOpenRules(!openRules)}>
        <Font variant="h3">Rules:</Font>
        <ul>
          {gameRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </Dialog>
    </div>
  );
}

export default Rules;
