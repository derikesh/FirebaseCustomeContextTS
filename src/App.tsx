import { useEffect, useState } from 'react'
import './App.css'
import { useFirebase } from './Context/Firebase'



function App() {

  const [books,setBook] = useState<string[]>([]);

  const firebase = useFirebase();

    useEffect(() => {
      firebase?.listAllBookk()
        .then(data => {
          setBook(data.docs);
        })
        .catch(err => {
          console.error(err);
        });
    }, [])

    

  return (
    <>
    
      <div> 
       <h1>liting all of the mfs</h1>
       { books.map( (item:any)=>(
          <div key={item.id}>
            <h1>{item.data().Name}</h1>
            <div className='w-full'>
              { item.data().imageUrl.map( (items:string)=>(
                <img width={"50%"} height={"auto"} src={items} alt="" />
              
              ) ) }
              </div>
            </div>
       ) ) }
      </div>

    </>
  )
}

export default App
