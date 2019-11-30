import React from 'react';

const dataCheck = JSON.parse(localStorage.getItem('form'));
const testDataImport = (dataCheck) || []


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
          {
              testDataImport.map((item, index) => (

                  <li key={index}>{item.price}</li>
                  // <li>{item.description}</li>
              ))
              }
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