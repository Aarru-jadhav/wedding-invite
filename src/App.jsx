import { useState } from "react";

import Loader from "./Sections/Loader";
import Hero from "./Sections/Hero";
import Story from "./Sections/Story";
import Event from "./Sections/Event";
import Savethedate from "./Sections/Savethedate";
import Location from "./Sections/Location";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <Loader
          onComplete={() => {
            setLoading(false);
          }}
        />
      )}

      {!loading && (
        <>
          <Hero />
          <Story />
          <Event/>
          <Savethedate/>
         <Location/>
        </>
      )}
    </>
  );
}

export default App;