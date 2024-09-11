import { useState } from "react";
import Modal from "../components/Modal";
import { Shoe } from "../types/types";
import Button from "../components/Button";

interface UpdateImagesProps {
    isOpen: boolean;
    onClose: () => void;
    shoe: Shoe;
}

const UpdateImages: React.FC<UpdateImagesProps> = ({ isOpen, onClose, shoe }) => {

    const [images, setImages] = useState<File[]>([]);
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () =>{
        onClose();
        setImages([]);
        setImageURLs([]);
    }

    const handleSave = async () => {
        if (images.length === 0) {
          alert("Please select at least one image to upload.");
          return;
        }
      
        setIsSubmitting(true);
      

        const formData = new FormData();
        formData.append('_id', shoe._id);
        images.forEach((image) => formData.append("images", image));
      
        try {
        
          const response = await fetch(`/api/shoes/shoeImages`, {
            method: "PUT", 
            body: formData, 
          });
      
          if (response.ok) {
            onClose(); 
            window.location.reload(); 
          } else {
            console.error("Error updating images");
            alert("Failed to update images. Please try again.");
          }
        } catch (error) {
          console.error("Error updating images:", error);
          alert("An error occurred while updating images. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      };
      

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (files.length + images.length > 4) {
                alert('You can only upload up to 4 images.');
                return;
            }

            setImages(prevImages => [...prevImages, ...files]);
            setImageURLs(prevURLs => [
                ...prevURLs,
                ...files.map(file => URL.createObjectURL(file))
            ]);
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom"
        >
            <h2>Update Images</h2>

            <form onSubmit={(e) => { e.preventDefault() }}>
                <label>
                    Upload Images:
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        style={{ borderColor: images.length === 0 ? 'red' : 'initial' }}
                    />
                </label>

                {imageURLs.length > 0 && (
                    <div className="image-preview">
                        {imageURLs.map((url, index) => (
                            <img key={index} src={url} alt={`Preview ${index + 1}`} className="image-preview-thumbnail" />
                        ))}
                    </div>
                )}

                <div className='button-section'>

                    <Button onClick={handleClose || (() => { })} className='regular-black-button'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} isDisabled={isSubmitting} className='regular-black-button'>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </form>

        </Modal>
    )
}

export default UpdateImages;
