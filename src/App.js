import logo from './logo.svg';
import './App.css';
import AssetQRGenerator from './AssetQRGenerator';
import QrCode from './QrCode';
import Signin from './Signin';

// DELL - 6BWP1W2, HK0TXR2, 5J7Q1W2, 57HP9S2, CGFFDX2, GPTQDX2, 3738DX2, 56GM9S2, B8R4DX2, 539K1W2, B638DX2,

//   LENOVO -
//   MP1SC01F

function App() {
  const assetData = [
    { id: 17, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "6BWP1W2" },
    { id: 18, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "HK0TXR2" },
    { id: 19, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "5J7Q1W2" },
    { id: 20, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "57HP9S2" },
    { id: 21, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "CGFFDX2" },
    { id: 22, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "GPTQDX2" },
    { id: 23, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "3738DX2" },
    { id: 24, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "56GM9S2" },
    { id: 25, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "B8R4DX2" },
    { id: 26, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "539K1W2" },
    { id: 27, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "B638DX2" },
    { id: 28, category: 'Hardware', type: 'laptop', dop: "2025-01-16", assetSerialNumber: "MP1SC01F" },
  ];

  // return <AssetQRGenerator assets={assetData} />;
  // return <QrCode assetData={assetData} />
  return (
    <Signin />
  )
}

export default App;


let data = [
  {
    date: '2025-02-02',
    attendaceTotalHours: '04', // get from attendance
    timeSheetTotalHours: '06' // get from timesheet
  },
  {
    data: '2025-02-3',
    attendaceTotalHours: '05',
    timeSheetTotalHours: '05'
  }
]