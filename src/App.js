import { useEffect, useRef, useState } from "react";
import './styles.css';


const people = ["Jesse", "Jerry", "Oggy", "Tom", "Ben"];


export default function App(){
  const [data, setData] = useState(people);

  const loadMore = ()=> {
    console.log("Load More");
    const temp = Array.from(Array(5).keys(), n=>"Sekhar");
    setData([...data, ...temp])
  }


  // useEffect(()=>console.log("logged"), [])
  return(
    <div>
      <h1>Table</h1>
      <DataTable data={data} loadMore={loadMore}/>
      
    </div>
  )

}

const DataTable = ({data, loadMore}) => {
  const ref = useRef(null);
  const onScreen = useIntersectionObserver(ref, {threshold : 1})
  console.log(onScreen)

  useEffect(()=>{
    if(onScreen){
      loadMore()
    }

  }, [onScreen])

  return(
    <div>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index)=>
              index !== data.length-1 ? 
               (<tr key={index}>
                  <td>{index }</td>
                  <td>{item}</td>
                </tr>
                ) :
                (<tr key={index} ref={ref}>
                    <td>{index }</td>
                    <td>{item}</td>
                  </tr>
                )
            )}
            <tr ref={ref}>Loading...</tr>

          </tbody>
        </table>
      </div>
  )
}

const useIntersectionObserver = (ref, options)=> {
  const [isvisible, setIsVisible ] = useState(false);

  useEffect(()=>{
    const observer = new IntersectionObserver(([entry])=>{
      setIsVisible(entry.isIntersecting)
    }, options);

    if(ref.current){
      observer.observe(ref.current)
    }
    return () => {
      observer.unobserve(ref.current)
    }

  }, [])



  return isvisible;

}