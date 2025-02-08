import React, { useState } from 'react';

function Repayment() {
    const [payer, setPayer] = useState('');
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [payerSearchResults, setPayerSearchResults] = useState([]);
    const [payeeSearchResults, setPayeeSearchResults] = useState([]);


    

    const handleConfirm = () => {
        // Logic for confirming repayment
        console.log('Payer:', payer);
        console.log('Payee:', payee);
        console.log('Amount:', amount);
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <section className="space-y-6">
                <section className="space-y-4">
                    <label className="font-semibold text-gray-700">Add Payer</label>
                    <input 
                        value={payer} 
                        onChange={(e) => setPayer(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter payer name"
                    />
                    <p className="text-sm text-gray-500">
                        {/* Display search results, all are selectable */}
                        {payerSearchResults.map((result, index) => (
                            <div key={index} className="py-2">{result}</div>
                        ))}
                    </p>
                    <span className="text-lg font-medium text-gray-900">{payer}</span>
                </section>

                <section className="space-y-4">
                    <label className="font-semibold text-gray-700">Add Payee</label>
                    <input 
                        value={payee} 
                        onChange={(e) => setPayee(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter payee name"
                    />
                    <p className="text-sm text-gray-500">
                        {/* Display search results, all are selectable */}
                        {payeeSearchResults.map((result, index) => (
                            <div key={index} className="py-2">{result}</div>
                        ))}
                    </p>
                    <span className="text-lg font-medium text-gray-900">{payee}</span>
                </section>
            </section>

            <section className="space-y-4 mt-6">
                <span className="text-xl font-bold text-red-600">-250</span>
                <label htmlFor="payment" className="block font-semibold text-gray-700">Payment</label>
                <input 
                    id="payment"
                    type="text" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter amount"
                />
                <button 
                    onClick={handleConfirm}
                    className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    Confirm
                </button>
            </section>
        </div>
    );
}

export default Repayment;
