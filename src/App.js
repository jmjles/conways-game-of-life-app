import React, { useState } from "react";
import "./App.css";
import { Container, Typography as Font, Grid, Fab, Button } from "@material-ui/core";
import GameArea from "./components/GameArea";
import Rules from "./components/Rules";
import About from "./components/About";

function App() {
  const [openRules, setOpenRules] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  return (
    <Container maxWidth="lg" style={{ textAlign: "center" }}>
      <Font variant="h1">Conway's Game of Life</Font>
      <Fab onClick={() => setOpenAbout(true)} style={styles.about}>
        ?
      </Fab>
      <Button
        onClick={() => setOpenRules(true)}
        variant="contained"
        style={styles.rules}
      >
        Rules
      </Button>
      <GameArea />
      <Rules openRules={openRules} setOpenRules={setOpenRules} />
      <About openAbout={openAbout} setOpenAbout={setOpenAbout} />
    </Container>
  );
}
const styles = {
  about:{
    float:'left'
  },
  rules:{
    float:'right'
  },
  gameArea:{

  }
}
export default App;
