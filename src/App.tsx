import React from 'react';
import styles from './App.module.scss';
import { CardPage } from './pages';

function App() {
  return (
    <div className={styles['App']}>
      <CardPage />
    </div>
  );
}

export default App;
