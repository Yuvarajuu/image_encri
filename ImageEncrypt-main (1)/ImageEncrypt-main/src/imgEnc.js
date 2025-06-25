import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const ImgEnc = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [encryptedData, setEncryptedData] = useState('');
    const [decryptedData, setDecryptedData] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const encryptImage = () => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            const encrypted = CryptoJS.AES.encrypt(base64, '1234567890abc').toString();
            setEncryptedData(encrypted);
        };
        reader.readAsDataURL(selectedFile);
    };
    //the secret key here is 1234567890abc if u want u can change it
    const decryptImage = () => {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, '1234567890abc').toString(CryptoJS.enc.Utf8);
        setDecryptedData('data:image/png;base64,' + decrypted);
    };

    return (
        <div>
            <h3>Image Encryption </h3>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={encryptImage} disabled={!selectedFile}>Encrypt Image</button>
            {encryptedData && <div>
                <h3>Encrypted Data</h3>
                <textarea rows="10" cols="50" readOnly value={encryptedData}></textarea>
            </div>}
            <button onClick={decryptImage} disabled={!encryptedData}>Decrypt Image</button>
            {decryptedData && <div>
                <h3>Decrypted Image</h3>
                <img src={decryptedData} alt="Decrypted" height='200' />
            </div>}
        </div>
    );
};

export default ImgEnc;