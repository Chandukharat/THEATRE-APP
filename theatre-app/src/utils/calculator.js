function calculator(seats,price){
    let total=0
    let selectedSeats=[]
    seats.forEach((row,index)=>{
        row.forEach(seat=>{
            if(seat[1]==="booked"){
                total=total+price[index]
                selectedSeats.push(seat[0])
            }
        })
    })
    return {total,selectedSeats}
}

export default calculator