import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {calculate,reset,replace,submitted} from '../Slice/userSlice'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Checkout(){
    const {seats,total,selected}=useSelector(state=>state.userSlice)
    const [time,setTime]=useState([4,60])
    const dispatch=useDispatch()
    let interval=null

    const navigate=useNavigate()

    useEffect(()=>{
        axios.get('http://127.0.0.1:2000/access').then(res=>{
            if(res.data.database.length){
                dispatch(replace(res.data.database))
            }
        })
        setTimeout(()=>{dispatch(calculate());},1000)
        timer()
        return function(){
            clearInterval(interval)
        }
    },[])


    const handleSubmit=()=>{
        dispatch(submitted())
        axios.post('http://127.0.0.1:2000/update',{seats:seats})
        navigate('/')
    }

    const timer=()=>{
        let min=time[0]
        let sec=60
        interval=setInterval(()=>{
            sec=sec-1
            if(sec===0){
                sec=60
                min=min-1
            }
            if(min<0){
                clearInterval(interval)
                dispatch(reset())
            }
            else{
                setTime([min,sec])
            }
        },1000)
    }

    return(
        <div className="last" >
        <div>Selected Seats: {selected.map(seatNo=>seatNo+" , ")}</div>
        <div>Total Price: {total} ₹</div>
        <div>Time Left: {time[0]}.{time[1]} min</div>
        <button type="button" class="btn btn-info" onClick={handleSubmit}>Confirm</button>
        </div>
    )
}

export default Checkout