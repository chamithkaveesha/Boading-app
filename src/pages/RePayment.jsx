import { useState } from 'react';
import axios from 'axios';

function Repayment() {
    const [payer, setPayer] = useState('');
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [payerSearchResults, setPayerSearchResults] = useState([]);
    const [payeeSearchResults, setPayeeSearchResults] = useState([]);

    const handlePayerSearch = async (searchTerm) => {
        // Simulate an API call to search for payers
        try {
            const response = await axios.get(`/api/payers/search?query=${searchTerm}`);
            setPayerSearchResults(response.data); // Assume response.data is an array of payer names
        } catch (error) {
            console.error('Error fetching payer data:', error);
        }
    };

    const handlePayeeSearch = async (searchTerm) => {
        // Simulate an API call to search for payees
        try {
            const response = await axios.get(`/api/payees/search?query=${searchTerm}`);
            setPayeeSearchResults(response.data); // Assume response.data is an array of payee names
        } catch (error) {
            console.error('Error fetching payee data:', error);
        }
    };

    const handleConfirm = async () => {
        // Confirm repayment and send details to backend
        try {
            const response = await axios.post('/api/repayments', {
                payer,
                payee,
                amount: parseFloat(amount),
            });
            if (response.status === 200) {
                alert('Repayment confirmed!');
            }
        } catch (error) {
            console.error('Error confirming repayment:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <section className="space-y-6">
                <section className="space-y-4">
                    <label className="font-semibold text-gray-700">Add Payer</label>
                    <input 
                        value={payer} 
                        onChange={(e) => {
                            setPayer(e.target.value);
                            handlePayerSearch(e.target.value);  // Trigger search when input changes
                        }} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter payer name"
                    />
                    <p className="text-sm text-gray-500">
                        {payerSearchResults.map((result, index) => (
                            <div 
                                key={index} 
                                className="py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => setPayer(result)}
                            >
                                {result}
                            </div>
                        ))}
                    </p>
                    <span className="text-lg font-medium text-gray-900">{payer}</span>
                </section>

                <section className="space-y-4">
                    <label className="font-semibold text-gray-700">Add Payee</label>
                    <input 
                        value={payee} 
                        onChange={(e) => {
                            setPayee(e.target.value);
                            handlePayeeSearch(e.target.value);  // Trigger search when input changes
                        }} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter payee name"
                    />
                    <p className="text-sm text-gray-500">
                        {payeeSearchResults.map((result, index) => (
                            <div 
                                key={index} 
                                className="py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => setPayee(result)}
                            >
                                {result}
                            </div>
                        ))}
                    </p>
                    <span className="text-lg font-medium text-gray-900">{payee}</span>
                </section>
            </section>

            <section className="space-y-4 mt-6">
                <label htmlFor="payment" className="block font-semibold text-gray-700">Payment Amount</label>
                <input 
                    id="payment"
                    type="number" 
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
