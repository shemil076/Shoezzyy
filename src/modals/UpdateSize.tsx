import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { Shoe } from "../types/types";
import Button from "../components/Button";


interface UpdateSizeProps {
    isOpen: boolean;
    onClose: () => void;
    shoe: Shoe;
}

const UpdateSize : React.FC<UpdateSizeProps> = ({isOpen, onClose, shoe}) => {
    const [minSize, setMinSize] = useState(shoe.minimumSize);
    const [maxSize, setMaxSize] = useState(shoe.maximumSize); 
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [isSaveDisable, setIsSaveDisable] = useState<boolean>(true);

    useEffect(()=>{
        if(!isNaN(minSize) && !isNaN(maxSize)){
            setIsSaveDisable(minSize == shoe.minimumSize && maxSize == shoe.maximumSize);
        }else{
            setIsSaveDisable(true);
        }

    },[minSize, maxSize])

    const handleOnClose = () =>{
        onClose();
    }

    const handleSave = async () =>{
        setIsSubmitting(true);
        
        const updatedShoePrice = {
            _id : shoe._id,
            minimumSize : minSize,
            maximumSize : maxSize,
        }

        try{
            const response = await fetch('/api/shoes/size',{
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
             <h2>Update Size</h2>
             <form onSubmit={(e)=>{e.preventDefault()}}>
             <label>
                Minimum Size:
                    <input
                        type="number"
                        value={minSize}
                        onChange={(e) => setMinSize(parseInt(e.target.value))}
                        // style={getInputStyle(minSize)}
                        placeholder='Enter the minimum size'
                    />
                </label>
                <label>
                Maximum Size:
                    <input
                        type="number"
                        value={maxSize}
                        onChange={(e) => setMaxSize(parseInt(e.target.value))}
                        // style={getInputStyle(minSize)}
                        placeholder='Enter the maximum size'
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

export default UpdateSize;