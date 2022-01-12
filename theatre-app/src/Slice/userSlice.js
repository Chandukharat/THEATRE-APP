import { createSlice } from "@reduxjs/toolkit";

import seatsGenerator from "../utils/seatsGenerator";
import calculator from "../utils/calculator";

const initialState={
    seats:seatsGenerator(5,5),
    total:0,
    selected:[],
    price:[100,200,300,400,500]
}

const userSlice=createSlice({
    name:"userData",
    initialState,
    reducers:{
        book:(state,action)=>{
            state.seats.forEach(row=>{
                row.forEach(seat=>{
                    if(action.payload===seat[0]){
                        if(seat[1]==="disabled" || seat[1]==="userBooked"){
                            return
                        }
                        if(seat[1]==="booked"){
                            seat[1]="available"
                        }
                        else{
                            seat[1]="booked"
                        }
                    }
                })
            })
        },
        disable:(state,action)=>{
            state.seats.forEach(row=>{
                row.forEach(seat=>{
                    if(action.payload===seat[0]){
                        if(seat[1]==="disabled"){
                            seat[1]="available"
                        }
                        else{
                            seat[1]="disabled"
                        }
                    }
                })
            })
        },
        calculate:(state,action)=>{
            const{selectedSeats,total}=calculator(state.seats,state.price)
            state.total=total
            state.selected=selectedSeats
        },
        reset:(state,action)=>{
            state.seats=seatsGenerator(5,5)
            state.total=0
            state.selected=[]
        },
        replace:(state,action)=>{
          if(state.seats[1]==='userBooked'){return }else{ state.seats=action.payload}
        },
        generate:(state,action)=>{
            state.seats=seatsGenerator(action.payload.x,action.payload.y)
        },
        pricer:(state,action)=>{
            state.price=action.payload
        },
        submitted:(state,action)=>{
            state.seats.forEach(row=>{
                row.forEach(seat=>{
                    if(seat[1]==="booked"){
                        seat[1]="userBooked"
                    }
                })
            })
        }
    }
})

export default userSlice.reducer

export const {book,calculate,reset,disable,replace,generate,pricer,submitted}=userSlice.actions