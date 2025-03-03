import React from 'react';
// import { Provider } from 'react-redux';
// import store from './redux/store.js';
// import ProductsList from "./components/ProductsList.jsx";
// import CategoriesList from "./components/CategoriesList.jsx";
import { useEffect} from "react";

import Login from "./components/Login";


function App() {

    return (
        <div>
            <h1>Test JWT Auth</h1>
            <Login />
        </div>
    );
}
// const App = () => {
//   return (
//     <Provider store={store}>
//       <div className="min-h-screen bg-gray-100 p-6">
//         <CategoriesList />
//         <ProductsList />
//       </div>
//     </Provider>
//   );
// };

export default App;
