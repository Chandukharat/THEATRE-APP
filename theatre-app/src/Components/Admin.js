import {useSelector,useDispatch} from 'react-redux'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {disable} from '../Slice/userSlice'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { generate,pricer } from '../Slice/userSlice';
import axios from 'axios'

function Admin(){
    const [movies,setMovies]=useState("")
    const [x,setX]=useState(5)
    const [y,setY]=useState(5)
    const [price,setPrice]=useState(Array(x).fill(Number))
    const [data , setdata]=useState({
       "names" :"",
        "link" :""
    })

    function dataSend(event){
        setdata({...data,[event.target.name]:event.target.value})

        console.log(data)

    }

    useEffect(()=>{
        axios.get('http://localhost:2000/poster').then((x)=>{
            setMovies(x.data)
        console.log(x.data[0]._id)})
     },[])
    

    
    const { seats } = useSelector(state => state.userSlice)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const generator=()=>{
        let xInt=parseInt(x)
        let yInt=parseInt(y)
        setPrice(Array(xInt).fill(Number))
        dispatch(generate({x:xInt,y:yInt}))
    }

    const priceHandler=(e)=>{
        let temp=[...price]
        temp[e.target.id-1]=parseInt(e.target.value)
        setPrice(temp)
    }

    return(
        <div className='seats'>
        <div >
         <div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">NAME OF MOVIE</span>
  <input name="names" onChange={dataSend} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">LINK OF POSTER</span>
  <input name="link" onChange={dataSend} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>

</div>
    
        <button  type="button" class="btn btn-info" onClick={()=>{axios.put(`http://localhost:2000/movieNames/${movies[0]._id}`,data).then(()=>{alert('DATA SENT SUCCESSFULLY')})}} >SEND</button>
        <label>Generate custom seats: </label>
        <input type="number" value={x} onChange={(e)=>{
            setX(e.target.value)
        }} />
        <input type="number" value={y} onChange={(e)=>{
            setY(e.target.value)
        }}
        />
        <button type="button" class="btn btn-info" onClick={generator}>Generate</button>
            <table>
                <thead></thead>
                
                    {seats.map((row,index) => {
                        return (
                            <tbody key={row}>
                            <tr >
                                <td><input type="number"
                                value={price[index]}
                                onChange={priceHandler}
                                id={index+1} 
                                style={{width:"60px"}} 
                                 
                                placeholder={100*(index+1)}/></td>
                                {row.map(seat => {
                                    return (
                                        <td key={seat}><Button 
                                   
                                            variant={seat[1]==="available"?"primary":(seat[1]==="disabled"?"secondary":"success")}
                                            onClick={()=>{dispatch(disable(seat[0]))}}>
                                            {seat[0]}
                                        </Button>
                                        </td>
                                    )
                                })}
                            </tr>
                            </tbody>
                        )
                    })}
                
            </table>
            <button type="button" class="btn btn-info" onClick={()=>{
                dispatch(pricer(price))
            axios.post('http://127.0.0.1:2000/update',{seats:seats})
            navigate('/')
            }}>save</button>
        </div>
    )
}

export default Admin