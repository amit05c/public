import React from 'react';

const PrintQRCode = () => {
    const handlePrint = async () => {
        try {
            const response = await fetch('http://localhost:5000/print-qr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: 'https://yourwebsite.com/order/12345' }),
            });

            if (response.ok) {
                alert('QR Code sent to printer');
            } else {
                alert('Failed to print QR Code');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <button onClick={handlePrint}>Print QR Code</button>;
};

export default PrintQRCode;
