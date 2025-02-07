const name = "name";
const Rname = "room name";
const balance = 12;

function Account(){
    return(
        <div>
            <span>Name :</span>
            <span>{name}</span>
            <span>Balance :</span>
            <span>{balance}</span>
            <span>Room Name :</span>
            <span>{Rname}</span>
        </div>
    );

}

export default Account;