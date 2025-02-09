import { useLoaderData } from "react-router-dom";
import TransactionPage from "../components/TransactionPage";

function TransactionLog() {
  const transactions = useLoaderData();
  return (
    <div>
      
      <TransactionPage transactions={transactions}/>
    </div>
    
  );
}

export default TransactionLog;