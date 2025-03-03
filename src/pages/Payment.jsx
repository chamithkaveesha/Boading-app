import { useEffect, useState } from 'react';
import { useGlobalState } from "../context/GlobalState";
import { fetchRoomUsers} from '../api/Dashboard';
import { createPayment } from '../api/payment';
import { getOwner } from '../api/user';
import { useNavigate } from "react-router-dom";

function Payment() {

    
    const [payer, setPayer] = useState("null");
    const [recipients, setRecipients] = useState([]);
    const [totalValue, setTotalValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [roomUsers, setRoomUsers] = useState([]);
    const { room, setRoom } = useGlobalState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOwner = async () => {
          try {
            const owner = await getOwner();
            setPayer(owner);
          } catch (error) {
            console.error("Failed to fetch room users", error);
          }
        };
      
        fetchOwner();
      }, []);


    useEffect(() => {
      if (!room || !room.id) {
        console.warn("Room is not available, redirecting...");
        navigate('/');  // Redirect user if room is not available
        return;
      }
      const getRoomUsers = async () => {
          try {
            () => navigate('/');
            const users = await fetchRoomUsers(room.id);
            setRoomUsers(users);
          } catch (error) {
            // Todo :Handle error
            console.error("Failed to fetch room users", error);
          }
        };
      
        getRoomUsers();
      }, []);
      
    const handleSetRecipients = (user) => {
        if (recipients.includes(user)) {
            setRecipients(recipients.filter((recipient) => recipient !== user));
        } else {
            setRecipients([...recipients, user]);
        } 
    };

    
    const handlePaymentSubmit = async () => {
      if (!payer || recipients.length === 0 || totalValue<0) {
        setError("All fields are required.");
        return;
      }
  
      setLoading(true);
      setError('');
      const recipientIds = recipients.map((recipient) => recipient.id);
      console.log(recipientIds);
      console.log(payer.id);

  
      const paymentData = {
        roomId: room.id,
        totalAmount: totalValue,
        isRepayment: false,  // Set this to true or false based on your need
        payerId: payer.id,
        recipientIds: recipients.map((recipient) => recipient.id),
      };
  
      try {
        await createPayment(paymentData);
        // Handle successful payment creation, maybe reset state or show success message
        console.log("Payment successfully created");
      } catch (err) {
        setError(err.message || "Failed to create payment");
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="p-6 bg-gray-200 rounded-lg shadow-lg space-y-6 m-10">
          <h2 className="text-2xl font-semibold text-gray-900">Create Payment</h2>
          <hr className= 'text-gray-400'/>
          <h3 className="text-xl font-semibold text-gray-900 text-center">{room? room.name : () => navigate('/')}</h3>
            
            {/* Payer Section */}
            <section className="space-y-4">
                <span className="font-semibold text-gray-700">PAYER:</span>
                <span className="text-lg font-medium text-gray-900"></span>
                
                <div className="text-sm text-gray-800 flex justify-center gap-2">
                    {/* Display search results for members */}
                    {roomUsers.map((user, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer p-2 rounded-md ${payer && payer.id === user.id ? 'bg-red-500 text-amber-50' : 'bg-gray-300'}`}
                            onClick={() => setPayer(user)}
                        >
                            {user.name}
                        </div>
                    ))}

                </div>
            </section>

            {/*recipient section*/}
            <section className="space-y-4">
                <span className="font-semibold text-gray-700">Recipients:</span>
                <div className="text-sm text-gray-800 flex justify-center gap-2">
                    {/* Display search results for members */}
                    {roomUsers.map((user, index) => (
                      <div
                          key={index}
                          className={`cursor-pointer p-2 rounded-md ${recipients.some(recipient => recipient.id === user.id) ? 'bg-red-500 text-amber-50' : 'bg-gray-300'}`}
                          onClick={() => handleSetRecipients(user)}
                      >
                          {user.name}
                      </div>
                  ))}

                </div>
            </section>

            {/* description sec */}
            <section className="space-y-4">
                <label className="font-semibold text-gray-700">Description</label>
                <textarea
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </section>

            {/* Total Value Section */}
            <section className="space-y-4 flex flex-col justify-center">
                <label className="font-semibold text-gray-700">Total Value</label>
                <input
                    type="number"
                    placeholder="500"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={totalValue}
                    onChange={(e) => setTotalValue(e.target.value)}
                />
                <button
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 cursor-pointer"
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
