import React from 'react';

function Home ({setCurrentPage}) {

  function handleCheckout(e) {
    e.preventDefault();
    setCurrentPage('signup');
  }


  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default Home;