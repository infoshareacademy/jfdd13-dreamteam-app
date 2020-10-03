import React from 'react'
import Loader from "react-loader-spinner";


export const ShowLoader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={0}
      />
    </div>
  )
}