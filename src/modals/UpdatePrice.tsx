import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { Shoe } from "../types/types";
import Button from "../components/Button";


interface UpdatePriceProps {
    isOpen: boolean;
    onClose: () => void;
    shoe: Shoe;
}

const UpdatePrice : React.FC<UpdatePriceProps> = ({isOpen, onClose, shoe}) => {
    const [shoePrice, setShoePrice] = useState(shoe.actualPrice);
    const [offerPrice, setOfferPrice] = useState(shoe.offerPrice); 
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [isSaveDisable, setIsSaveDisable] = useState<boolean>(true);

    useEffect(()=>{
        if(!isNaN(shoePrice)){
            setIsSaveDisable(shoePrice == shoe.actualPrice && offerPrice == shoe.offerPrice);
        }else{
            setIsSaveDisable(true);
        }

    },[shoePrice, offerPrice])

    const handleOnClose = () =>{
        onClose();
    }

    const handleSave = async () =>{
        setIsSubmitting(true);
        
        const updatedShoePrice = {
            _id : shoe._id,
            actualPrice : shoePrice,
            offerPrice : offerPrice
        }

        try{
            const response = await fetch('/api/shoes/price',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(updatedShoePrice)
            });

            if (response.ok) {
                onClose();
              } else {
                console.error('Error updating status');
              }
              window.location.reload();
        } catch (error) {
            console.error('Error updating status', error);
        }finally{
            setIsSubmitting(false);
        }

    }



    return(
        <Modal
            isOpen={isOpen}
            onClose={handleOnClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom"
        >
             <h2>New price</h2>
             <form onSubmit={(e)=>{e.preventDefault()}}>
             <label>
                    Price: LKR
                    <input
                        type="number"
                        value={shoePrice}
                        onChange={(e) => setShoePrice(parseInt(e.target.value))}
                        // style={getInputStyle(shoePrice)}
                        placeholder='Enter the price'
                    />
                </label>
                <label>
                    Price after discount: LKR
                    <input
                        type="number"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(parseInt(e.target.value))}
                        // style={getInputStyle(shoePrice)}
                        placeholder='Enter the price after the discount'
                    />
                </label>

                <div className='button-section'>

                <Button onClick={handleOnClose} className='modal-button'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}  isDisabled={isSubmitting || isSaveDisable} className='modal-button'>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </div>
             </form>
        </Modal>
    );
}

export default UpdatePrice;