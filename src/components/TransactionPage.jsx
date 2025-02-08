
function TransactionPage({ transactions }) {
    return (
      <div>
        <h1>Transaction Log</h1>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.amount} - {transaction.description}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TransactionPage;