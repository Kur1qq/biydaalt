import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DrugDetails.css';

const DrugDetails = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);

  useEffect(() => {
    const getDrugDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/drugs/public/${id}`);
        const data = await response.json();
        setDrug(data.data);
      } catch (error) {
        console.error("Эмийн дэлгэрэнгүй авахад алдаа:", error);
      }
    };

    getDrugDetails();
  }, [id]);

  if (!drug) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <div className="drug-details-wrapper">
      <div className="drug-text">
        <h1 className="drug-name" style={{ fontSize: '40px', fontWeight: 'bold' }}>{drug.name}</h1>
        <p className="drug-type">Төрөл: {drug.drug_class}</p>

        <div className="field">
          <h3>{drug.name} гэж юу вэ?</h3>
          <p>{drug.discription}</p>
        </div>

        <div className="field">
          <h3>Анхааруулга:</h3>
          <p>{drug.warnings}</p>
        </div>

        <div className="field">
          <h3>Гаж нөлөө:</h3>
          <p>{drug.side_effect}</p>
        </div>

        <div className="field">
          <h3>Хэрэглээ ба заалт:</h3>
          <p>{drug.side_effect}</p>
        </div>

        <div className="field">
          <h3>Тун хэмжээ ба хэрэглэх заавар:</h3>
          <p>{drug.side_effect}</p>
        </div>

        <div className="field">
          <h3>Харшил ба эсрэг заалт:</h3>
          <p>{drug.side_effect}</p>
        </div>

        <div className="field">
          <h3>Үйлдвэрлэгч ба гарал үүсэл:</h3>
          <p>{drug.side_effect}</p>
        </div>
      </div>

      <div className="drug-image">
        {drug.drug_file && (
          <div className="drug-image-card">
            <div className="drug-image-caption">Зураг</div>
            <img
              src={`http://localhost:5001/uploads/${drug.drug_file}`}
              alt={drug.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DrugDetails;
