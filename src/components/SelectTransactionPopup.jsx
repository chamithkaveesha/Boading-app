import { useNavigate } from "react-router-dom";
import Modal from "../SubComponents/Modal";

function SelectTransactionPopup({ isOpen, onClose }) {

    const navigate = useNavigate();
    const handlePayment = () => {
        navigate("payment");
        onClose();
    }
    const handleRePayment = () => {
        navigate("repayment");
        onClose();
    }

  return (
    
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold text-black mb-6">Select Transaction Method</h2>
        <div className="flex justify-between">
            <button onClick={handlePayment} className="bg-red-500 text-amber-50 p-2 rounded-sm cursor-pointer">Payment</button>
            <button onClick={handleRePayment} className="bg-green-500 text-amber-50 p-2 rounded-sm cursor-pointer">Re-Payment</button>
        </div>
      
    </Modal>
  );
}

export default SelectTransactionPopup;
