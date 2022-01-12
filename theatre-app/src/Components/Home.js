import { useEffect,useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import './Style.css'

function Home(){
    const [movies,setMovies]=useState([])
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
 

    const navigate=useNavigate()

    useEffect(()=>{
       axios.get('http://localhost:2000/poster').then((x)=>{setMovies(x.data)})
    },[])

    const verify=()=>{
        if(username==="admin" && password==="admin"){
            navigate('/admin')
        }
        else{
            alert("invalid username or password")
        }
    }

    return(
        <>
          {movies.map(movie=>{
            return(
                <div className="poster" key={movie}>
                <img src={`${movie.link}`} />
               <h1> {(movie.names).toUpperCase()}</h1>
                <Link to={`/seats/${(movie.names).toUpperCase()}`}><button type="button" class="btn btn-info">Book Your Show</button></Link>
                </div>
            )
        })}
        <div style={{border:"black solid 2px",margin:"10px",padding:"10px" ,width:"350px"}}>
        <h2>Admin panel</h2>
        <div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">username</span>
  <input placeholder="Type= admin" onChange={(e)=>{
            setUsername(e.target.value)
        }} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>

<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
  <input  placeholder="Type= admin" onChange={(e)=>{
            setPassword(e.target.value)
        }} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>


      <br/>
       <button type="button" class="btn btn-info" onClick={verify}>Login</button>
        </div>

      
        </>
    )
}

export default Home