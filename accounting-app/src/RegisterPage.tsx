import React, { useState } from 'react';
import axios from 'axios';
const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/register', {
                name,
                password,
                phone,
                email,
            });

            if (response.data.status === 200) {
                console.log('Registration success');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default RegisterPage;
