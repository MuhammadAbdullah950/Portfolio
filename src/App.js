import React from 'react';
import { Navbar , Hero , Work , About , Contact , Footer } from './components';
function App() {
  return (
    <div className="min-h-screen h-full bg-black">
      <Navbar />
      <Hero />
      <Work />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
export default App;

