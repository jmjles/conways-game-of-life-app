import React from "react";
import { Typography as Font, Dialog } from "@material-ui/core";
function About({openAbout,setOpenAbout}) {
  return (
    <div>
      <Dialog open={openAbout} onClose={()=> setOpenAbout(!openAbout)}>
        <Font>About this Algorithm:</Font>
        <Font>
          But I do know one thing though. Bitches, they come, they go. Saturday
          through Sunday, Monday. Monday through Sunday, yo. Maybe I'll love you
          one day. Maybe we'll someday grow.
        </Font>
      </Dialog>
    </div>
  );
}

export default About;
