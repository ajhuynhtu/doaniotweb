import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Registration successful, redirect to home or login
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f5f7fa'}}>
      {/* Left side: similar to Login */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', borderTopLeftRadius: 24, borderBottomLeftRadius: 24, padding: 0}}>
        <img src="/login.png" alt="Smart Home" style={{width: 220, marginBottom: 32, marginTop: 24}} />
        <h2 style={{fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 18, textAlign: 'center'}}>Join us<br/>make your home smart <span role="img" aria-label="rocket">🚀</span></h2>
        <p style={{color: '#888', fontSize: 16, textAlign: 'center', maxWidth: 320}}>Create an account to start managing your smart devices today.</p>
      </div>
      {/* Right side: form register */}
      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit} style={{width: 340, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32}}>
          <h2 style={{marginBottom: 8, fontWeight: 700, fontSize: 28}}>Register</h2>
          <p style={{color: '#888', marginBottom: 24}}>Create your free account.</p>
          
          {error && <div style={{color: 'red', marginBottom: 16, fontSize: 14}}>{error}</div>}

          <div style={{marginBottom: 16}}>
            <input
              type="email"
              placeholder="Email"
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
              style={{width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12}}
            />
             <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              style={{width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd'}}
            />
          </div>
          
          <button type="submit" style={{width: '100%', background: '#2563eb', color: '#fff', padding: 12, border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, marginBottom: 16, cursor: 'pointer'}}>Sign Up</button>
          
          <div style={{textAlign: 'center', fontSize: 14}}>
            Already have an account? <Link to="/login" style={{color: '#2563eb', textDecoration: 'none'}}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
