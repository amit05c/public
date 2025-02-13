import React, { useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import companyLogo from "./logo-final.png"

const generateSerialNumber = (asset, counter) => {
    const categoryCode = asset.category === 'Software' ? 'SW' : 'HW';
    const typeCode = asset.type.slice(0, 3).toUpperCase();
    const dateCode = asset.dop.replace(/-/g, '');
    const serial = counter.toString().padStart(3, '0');
    return `DSB${categoryCode}${typeCode}${dateCode}${serial}`;
};

const AssetQRGenerator = ({ assets }) => {
    const qrRef = useRef(null);

    // const handleOpenPDF = () => {
    //     html2canvas(qrRef.current, { scale: 3 }).then(canvas => {
    //         const imgData = canvas.toDataURL('image/png');

    //         // Create PDF
    //         const pdf = new jsPDF({
    //             orientation: 'portrait',
    //             unit: 'px',
    //             format: [canvas.width, canvas.height]
    //         });

    //         pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

    //         // Convert PDF to Blob and open in a new tab
    //         const pdfBlob = pdf.output('blob');
    //         const pdfUrl = URL.createObjectURL(pdfBlob);
    //         window.open(pdfUrl, '_blank');
    //     });
    // };


    const handleOpenPDF = () => {
        const button = document.querySelector("button"); // Select the button
        button.style.display = "none"; // Hide the button

        html2canvas(qrRef.current, { scale: 3, useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            // Create PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

            // Convert PDF to Blob and open in a new tab
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');

            button.style.display = "block"; // Show the button again
        });
    };


    const printStyles = `
    @media print {
        button { display: none !important; }
        body::after { content: none !important; }
        #print-section { page-break-before: always; page-break-after: always; }
    }
`;

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = printStyles;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);


    return (
        <div>
            <div id="print-section" ref={qrRef} >
                {assets.map((asset, index) => {
                    const serialNumber = generateSerialNumber(asset, asset.id);
                    const qrData = `Serial Number: 0${asset.id} | Asset Serial Number: ${asset.assetSerialNumber} | DOP: ${asset.dop}`;
                    console.log('qrdata', qrData)
                    return (
                        <div key={index} style={{
                            width: '80%',
                            // height: '106px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            border: '1px solid black',
                            pageBreakAfter: 'always',
                            margin: 'auto',
                            marginBottom: '7.5591px',
                            padding: '1rem'
                        }}>
                            {/* QR Code on Left */}
                            <QRCodeSVG value={qrData} size={80} bgColor="#ffffff" style={{ position: 'relative', top: 0, left: 0 }} />

                            {/* Logo and Serial on Right */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '72px',
                                height: '1in',
                                // border: '1px solid red',
                                position: 'relative',
                                top: 0,
                                left: 0,
                                rotate: '270deg'
                            }}>
                                <img src={companyLogo} alt="Company Logo" style={{ height: '46px', m: 'auto' }} />
                                <p style={{ fontSize: '8px', fontWeight: 'bold', textAlign: 'center' }}>{serialNumber}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button onClick={handleOpenPDF} style={{ marginTop: '10px', padding: '6px 12px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Download PSD
            </button>
        </div>
    );
};

export default AssetQRGenerator