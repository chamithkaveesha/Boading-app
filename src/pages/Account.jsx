import { useLoaderData } from 'react-router-dom';

const name = "name";
const Rname = "room name";
const balance = 12;

function Account(){
    const accountData = useLoaderData();
    return (
        <div>
            <h1>Account Information</h1>
            <pre>{JSON.stringify(accountData, null, 2)}</pre>
        </div>
        );

}

export default Account;


