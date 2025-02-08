import { useLoaderData } from "react-router-dom";
import TransactionPage from "../components/TransactionPage";

function TransactionLog() {
  const transactions = useLoaderData();
  return (
    <TransactionPage transactions={transactions}/>
  );
}

export default TransactionLog;