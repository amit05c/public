import React from "react";
import QRCode from "react-qr-code";
import companyLogo from "./logo-final.png";

const generateSerialNumber = (asset, counter) => {
    const categoryCode = asset.category === "Software" ? "SW" : "HW";
    const typeCode = asset.type.slice(0, 3).toUpperCase();
    const dateCode = asset.dop.replace(/-/g, "");
    const serial = counter.toString().padStart(3, "0");
    return `DSB${categoryCode}${typeCode}${dateCode}${serial}`;
};

const QrCode = ({ assetData }) => {
    const printerWidth = "6cm";
    const printerHeight = "5cm";

    return (
        <>
            {/* Print-specific styles */}
            <style>
                {`
                    @media print {
                        .print-container {
                            width: ${printerWidth} !important;
                            height: ${printerHeight} !important;
                            margin: .2rem auto;
                            page-break-after: always;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            border: 1px solid black;
                        }
                    }
                `}
            </style>

            {assetData.map((el, index) => {
                const serialNumber = generateSerialNumber(el, el.id);
                const qrData = `Asset Serial No : ${el.assetSerialNumber} | DSB Serial No : ${el.id} | Purchase Date : ${el.dop}`;

                return (
                    <div
                        key={index}
                        className="print-container"
                        style={{
                            width: printerWidth,
                            height: printerHeight,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid black",
                            padding: "5px",
                            pageBreakAfter: "always",
                            gap: '.8rem',
                            margin: '.3rem, auto',

                        }}
                    >
                        {/* QR Code */}
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <QRCode
                                size={100}
                                style={{ height: "auto", width: "100%" }}
                                value={qrData}
                                viewBox={`0 0 100 100`}
                            />
                        </div>

                        {/* Company Logo and Serial Number */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                marginTop: "5px",
                            }}
                        >
                            <img
                                src={companyLogo}
                                alt="Company Logo"
                                style={{ height: "30px", marginBottom: "3px" }}
                            />
                            <p
                                style={{
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    margin: "0",
                                }}
                            >
                                {serialNumber}
                            </p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default QrCode;
