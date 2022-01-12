import { useParams,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {book,replace} from '../Slice/userSlice'
import './Style.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect } from 'react';

function Seats() {
    const params = useParams()
    const { seats,price } = useSelector(state => state.userSlice)
    const dispatch=useDispatch()

    //  useEffect(()=>{
    //     axios.get('http://127.0.0.1:2000/access').then(res=>{
    //         {
    //             dispat
    //         }ch(replace(res.data.database))
    //     })
    // },[]) 

    const updater=()=>{
        axios.post('http://127.0.0.1:2000/update',{seats:seats})
    }

    return (
        <>
            <h2 className='seats' >{params.name}</h2>
            <table className='seats'>
                <thead></thead>
                <tbody  >
                    {seats.map((row,index) => {
                        return (
                            <tr  key={row}>
                                <div className='seat'>{price[index]}₹</div>
                                {row.map(seat => {
                                    return (
                                        <td className='seat'  key={seat}><Button className='seat'
                                        variant={seat[1]==="available"?"primary":(seat[1]==="disabled"?"secondary":(seat[1]==="booked"?"success":"danger"))}
                                            onClick={()=>{dispatch(book(seat[0]))}}>
                                            {seat[0]}
                                        </Button>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='seats'>
                <Link to="/checkout"><button onClick={updater} type="button" class="btn btn-warning">Checkout</button></Link>
            </div>
        </>
    )
}

export default Seats


/* {seats.map((row) => {
    return (
        <div>
            {row.map((seat) => {
                return <button>{seat}</button>
            })}
        </div>
    )
})} */