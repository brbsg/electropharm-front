import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import api from "../../services/api";
import "./Estoque.css";

function Estoque() {
  const navigate = useNavigate();
  const {
    user: { token },
  } = useUser();

  async function fetchData() {
    try {
      const { data } = await api.getAllDrugs(token);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <main>
          <div className="electron-back">
            <div className="search_box">
              <input type="text" placeholder="Pesquise aqui"></input>
              <FaSearch className="icon-search" />
            </div>

            <button
              onClick={() => navigate("/cadastrar-produto")}
              className="add-product"
            >
              + Adicionar Produto
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Estoque;
