import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { Shoe } from "../types/types";
import Button from "../components/Button";


interface UpdateShoeStringDataProps {
    isOpen: boolean;
    onClose: () => void;
    shoe: Shoe;
    isNameToChange?: boolean;
}

const UpdateShoeStringData: React.FC<UpdateShoeStringDataProps> = ({ isOpen, onClose, shoe, isNameToChange = false }) => {

    const [currentName, setCurrentName] = useState(shoe.name);
    const [currentDescription, setCurrentDescription] = useState(shoe.description);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [isSaveDisable, setIsSaveDisable] = useState<boolean>(true);

    useEffect(() => {
        if (isNameToChange) {
            setIsSaveDisable(currentName == shoe.name || currentName == "")
        } else {
            setIsSaveDisable(currentDescription == shoe.description || currentDescription == "")
        }
    }, [currentName, currentDescription])

    const handleOnClose = () => {
        onClose();
    }

    const handleSave = async () =>{
        setIsSubmitting(true);
        
        let updatedShoePrice = null;

        if(isNameToChange){
            updatedShoePrice  = {
                _id : shoe._id,
                name: currentName,
            }
        }else{
            updatedShoePrice  = {
                _id : shoe._id,
                description: currentDescription,
            }
        }

        try{
            const response = await fetch('/api/shoes/stringData',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(updatedShoePrice)
            });

            if (response.ok) {
                onClose();
              } else {
                console.error('Error updating shoe details');
              }
              window.location.reload();
        } catch (error) {
            console.error('Error updating shoe details', error);
        }finally{
            setIsSubmitting(false);
        }

    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleOnClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom">
            <h2>Update Shoe {isNameToChange ? "Name" : "Description"}</h2>

            <form onSubmit={(e) => { e.preventDefault() }}>
                {isNameToChange ?
                    <label>
                        Name:
                        <input
                            type="text"
                            value={currentName}
                            onChange={(e) => setCurrentName(e.target.value)}
                            // style={getInputStyle(minSize)}
                            placeholder='Enter the minimum size'
                        />
                    </label>
                    :
                    <label>
                        Description:
                        <textarea
                            value={currentDescription}
                            onChange={(e) => setCurrentDescription(e.target.value)}
                            // style={getInputStyle(minSize)}
                            placeholder='Enter the minimum size'
                        />
                    </label>}
                <div className='button-section'>

                    <Button onClick={handleOnClose} className='modal-button'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} isDisabled={isSaveDisable} className='modal-button'>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </form>

        </Modal>
    )
}

export default UpdateShoeStringData;