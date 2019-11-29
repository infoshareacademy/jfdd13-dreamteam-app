import React from 'react';

export const testLocalStorageOnClick = () => {

  return (<p> 
           fetch('https://dreamteam-app.firebaseio.com/test.json'); 
     
    {JSON.parse(localStorage.getItem('click'))} 
    </p>
  )
}

const Test = props => {
  // const [test, setTest] = useState("")
 
    return (
    <div>
      {/* <p>{localStorage.getItem('click')}</p> */}
        <p>{localStorage.getItem('form')}</p>
        {/* <p>{JSON.parse(localStorage.getItem('form'))}</p> */}
        

    </div>)
}

export default Test;