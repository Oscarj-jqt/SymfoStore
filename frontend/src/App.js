import ProduitsListe from './components/ProduitsListe.jsx';
import CategoriesListe from './components/CategoriesListe.jsx';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';



const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-6">
        <CategoriesListe />
        <ProduitsListe />
      </div>
    </Provider>
  );
};

export default App;
