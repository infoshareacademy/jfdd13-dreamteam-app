import React from 'react';

const testData = JSON.parse(localStorage.getItem('form'));

export const testLocalStorageOnClick = () => {
  return (<p> 
    fetch('https://dreamteam-app.firebaseio.com/test.json'); 
    {JSON.parse(localStorage.getItem('click'))} 
    </p>
  )
}

const Test = () => {
 
    return (
    <div>
      <ul>
        {testData.map(item => {
      
      <li>{item.price}</li>
      <li>{item.description}</li>}
          
          )}
         </ul>
    </div>
    )
     {/* {testData.map(obj => {
                const [city, continent, data, description, email, price, terms, title] = obj;

        return [obj.city, obj.continent, obj.data, obj.description, obj.email, obj.price, obj.terms, obj.title];
     }).catch(err => console.log(err))
    } */}
     
    
}

export default Test;