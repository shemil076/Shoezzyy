import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { adminSignin } from "../features/adminSlice";
import { AppDispatch, RootState } from "../store";
import '../styles/RegularButton.css';

interface SignInModalProps  {
    isOpen: boolean;
    onClose: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({isOpen, onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error: authError } = useSelector((state: RootState) => state.admin);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await dispatch(adminSignin({ email, password }));
        setError(null);
        //  window.location.href = '/';
      } catch (err) {
        setError('Invalid credentials');
      }
    };
  
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom">
                  <h2>Admin Sign-In</h2>
      {error && <p>{error}</p>}
      {authError && <p>{authError}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="regular-black-button" type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
        </Modal>
    );
};

export default SignInModal;