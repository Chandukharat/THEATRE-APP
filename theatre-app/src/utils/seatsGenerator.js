function seatsGenerator(r,c){
    let seats=[]
    let count=1
    for(let i=1;i<=r;i++){
        let row=[]
        for(let j=1;j<=c;j++){
            row.push([count,"available"])
            count++
        }
        seats.push(row)
    }
    return seats
}

export default seatsGenerator