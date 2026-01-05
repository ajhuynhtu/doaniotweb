import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, redirect to home
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f5f7fa'}}>
      {/* Bên trái: hình login.png, tiêu đề, mô tả */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', borderTopLeftRadius: 24, borderBottomLeftRadius: 24, padding: 0}}>
        <img src="/login.png" alt="Smart Home" style={{width: 220, marginBottom: 32, marginTop: 24}} />
        <h2 style={{fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 18, textAlign: 'center'}}>Easy living<br/>with your smart home <span role="img" aria-label="bulb">💡</span></h2>
        <p style={{color: '#888', fontSize: 16, textAlign: 'center', maxWidth: 320}}>Get your smart devices in one place and manage all of these with a few taps.</p>
      </div>
      {/* Bên phải: form login */}
      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit} style={{width: 340, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32}}>
          <h2 style={{marginBottom: 8, fontWeight: 700, fontSize: 28}}>Login</h2>
          <p style={{color: '#888', marginBottom: 24}}>Welcome back! Please enter your details.</p>
          
          {error && <div style={{color: 'red', marginBottom: 16, fontSize: 14}}>{error}</div>}
          
          <div style={{marginBottom: 16}}>
            <input
              type="email"
              placeholder="joe.doe@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12}}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd'}}
            />
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
            <label style={{display: 'flex', alignItems: 'center', fontSize: 14}}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{marginRight: 6}} />
              Remember information
            </label>
            <a href="#" style={{fontSize: 14, color: '#3b82f6', textDecoration: 'none'}}>Forget password?</a>
          </div>
          <button type="submit" style={{width: '100%', background: '#2563eb', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, marginBottom: 16, cursor: 'pointer'}}>Login</button>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16}}>
            <button type="button" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', border: '1px solid #ddd', borderRadius: 8, padding: 10, background: '#fff', cursor: 'pointer'}}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{width: 20}} /> Login with Google
            </button>
            <button type="button" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', border: '1px solid #ddd', borderRadius: 8, padding: 10, background: '#fff', cursor: 'pointer'}}>
              <img src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" style={{width: 20}} /> Login with Facebook
            </button>
            <button type="button" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', border: '1px solid #ddd', borderRadius: 8, padding: 10, background: '#fff', cursor: 'pointer'}}>
              <img src="https://www.svgrepo.com/show/452210/apple.svg" alt="Apple" style={{width: 20}} /> Login with Apple
            </button>
          </div>
          <div style={{textAlign: 'center', fontSize: 14}}>
            First time here? <a href="/register" style={{color: '#2563eb', textDecoration: 'none'}}>Sign up for free</a>
          </div>
        </form>
      </div>
    </div>
  );
}
