import { useState } from 'react';
import axios from 'axios';

function Payment() {
    const [name, setName] = useState('account owner'); // Default name
    const [searchTerm, setSearchTerm] = useState('');
    const [payerSearchTerm, setPayerSearchTerm] = useState('');
    const [members, setMembers] = useState([]);
    const [payer, setPayer] = useState('');
    const [totalValue, setTotalValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = (term) => {
        // Simulate member search (In real app, you'd call an API here)
        const foundMembers = ['Indunil', 'John', 'Jane'].filter((member) =>
            member.toLowerCase().includes(term.toLowerCase())
        );
        setMembers(foundMembers);
    };

    const handlePayerSearch = (term) => {
        // Simulate payer search
        const foundPayers = ['Indunil', 'John', 'Jane'].filter((payer) =>
            payer.toLowerCase().includes(term.toLowerCase())
        );
        setPayer(payer);
    };

    const handlePaymentSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const paymentData = {
                payerName: payer,
                memberName: name,
                totalValue: totalValue,
            };

            // Call the backend API to create a payment
            const response = await axios.post('http://localhost:8080/api/payments/create', paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Replace with actual token logic
                },
            });

            if (response.status === 201) {
                alert('Payment confirmed!');
            }
        } catch (err) {
            setError('Error confirming payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg space-y-6">
            {/* Search for Members Section */}
            <section className="space-y-4">
                <label className="font-semibold text-gray-700">Search for Members</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    placeholder="Indunil"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-sm text-gray-500">
                    {/* Display search results for members */}
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                            onClick={() => setName(member)}
                        >
                            {member}
                        </div>
                    ))}
                </p>
                <button
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
                    onClick={() => alert(`Member ${name} added`)}
                >
                    ADD
                </button>
            </section>

            {/* Payer Section */}
            <section className="space-y-4">
                <span className="font-semibold text-gray-700">PAYER:</span>
                <span className="text-lg font-medium text-gray-900">{name}</span>
                <label className="font-semibold text-gray-700"> for a payer</label>
                <input
                    type="text"
                    value={payerSearchTerm}
                    onChange={(e) => {
                        setPayerSearchTerm(e.target.value);
                        handlePayerSearch(e.target.value);
                    }}
                    placeholder="Indunil"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-sm text-gray-500">
                    {/* Display search results for payers */}
                    {payerSearchTerm &&
                        ['Indunil', 'John', 'Jane']
                            .filter((payer) =>
                                payer.toLowerCase().includes(payerSearchTerm.toLowerCase())
                            )
                            .map((payer, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                                    onClick={() => setPayer(payer)}
                                >
                                    {payer}
                                </div>
                            ))}
                </p>
            </section>

            {/* Total Value Section */}
            <section className="space-y-4">
                <label className="font-semibold text-gray-700">Total Value</label>
                <input
                    type="number"
                    placeholder="500"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={totalValue}
                    onChange={(e) => setTotalValue(e.target.value)}
                />
                <button
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
                    onClick={handlePaymentSubmit}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Confirm'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </section>
        </div>
    );
}

export default Payment;
