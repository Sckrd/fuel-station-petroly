import React, { useState, useEffect } from 'react';
import Gauge from 'react-gauge-chart';

function App() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [fuelLevel, setFuelLevel] = useState(0.25);
  const [fuelType, setFuelType] = useState('91');
  const [totalPrice, setTotalPrice] = useState(0);

  const fuelPrices = {
    '91': 2.18,
    '95': 2.33,
    'diesel': 1.66
  };

  // جلب بيانات السيارات من قاعدة البيانات
  useEffect(() => {
    fetch('http://localhost:3001/cars')
      .then(response => response.json())
      .then(data => setCars(data));
  }, []);

  // حساب السعر
  useEffect(() => {
    if (selectedCar) {
      const litersNeeded = selectedCar.fuelCapacity * (1 - fuelLevel);
      const price = litersNeeded * fuelPrices[fuelType];
      setTotalPrice(price.toFixed(2));
    }
  }, [selectedCar, fuelLevel, fuelType]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>دفع الوقود المسبق</h1>

      {/* اختيار السيارة */}
      <select 
        onChange={(e) => setSelectedCar(JSON.parse(e.target.value))}
        style={{ width: '300px', padding: '10px', margin: '10px' }}
      >
        <option value="">اختر سيارتك</option>
        {cars.map(car => (
          <option key={car.id} value={JSON.stringify(car)}>
            {car.make} {car.model}
          </option>
        ))}
      </select>

      {/* عداد الوقود */}
      <div style={{ margin: '20px' }}>
        <Gauge
          id="fuel-gauge"
          percent={fuelLevel}
          arcPadding={0.02}
          colors={["#FF0000", "#00FF00"]}
          needleColor="#000"
          textColor="#000"
          needleBaseColor="#000"
          onClick={(value) => setFuelLevel(value)}
        />
      </div>

      {/* اختيار نوع الوقود */}
      <select 
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
        style={{ width: '300px', padding: '10px', margin: '10px' }}
      >
        <option value="91">بنزين 91</option>
        <option value="95">بنزين 95</option>
        <option value="diesel">ديزل</option>
      </select>

      {/* عرض السعر */}
      <h2>المبلغ المطلوب: {totalPrice} ريال</h2>

      {/* محاكاة الدفع */}
      <button 
        onClick={() => alert('تمت عملية الدفع بنجاح!')}
        style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white' }}
      >
        ادفع الآن
      </button>
    </div>
  );
}

export default App;
