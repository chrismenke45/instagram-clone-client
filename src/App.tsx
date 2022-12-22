import React from 'react';
import Banner from './components/Banner';
import NavFooter from './components/NavFooter';

const App: React.FC = () => {

  return (
    <div id="app">
      <Banner />
      <main>Main</main>
      <NavFooter />
    </div>
  );
}

export default App;