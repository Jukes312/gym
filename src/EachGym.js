import React from 'react'
import { useContext } from 'react';
import DataContext from './context/DataContext';




const EachGym = ({name,placeId,rating}) => {
    const {myRef} = useContext(DataContext);


    const handleRefarray=(el)=>{
        if(el&&!myRef.current.includes(el)){
          myRef.current.push(el)
        }
       
      }
  return (
    <section key={placeId} className="gym-list__content" ref={handleRefarray} id={placeId}>
        <h1 className='gym-list__heading '>NAME:</h1>
        <p className="gym-list__name">{name}</p>
        <h1 className='gym-list__heading'>RATING:</h1>
        <p className="gym-list__rating">{rating||'Not rated'}</p>
    </section>
  )
}

export default EachGym