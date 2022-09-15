import React, { useState } from "react";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import api from "../../../services/api";
import "./CadastrarProduto.css";

import { toast, ToastContainer } from "react-toastify";

export default function CadastrarProduto() {
  const navigate = useNavigate();
  const {
    user: { token },
  } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    ean: "",
    amount: 0,
    salePrice: 0,
    purchasePrice: 0,
    category: "",
    maxDiscountPercentage: 0,
    percentageOfCommission: 0,
    fixedCommissionValue: 0,
  });

  const names = [
    "amount",
    "fixedCommissionValue",
    "maxDiscountPercentage",
    "percentageOfCommission",
    "purchasePrice",
    "salePrice",
  ];

  function handleChange({ target }) {
    if (names.includes(target.name)) {
      setFormData({ ...formData, [target.name]: Number(target.value) });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await api.createDrug(formData, token);

      console.log(res.data);
      navigate("/estoque");
    } catch (error) {
      console.log(error);
      toast("Não foi possível cadastrar o produto.");
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="content">
        <main>
          <div className="electron-back">
            <div href="#" className="titulo-page">
              <FaArrowAltCircleLeft
                style={{ cursor: "pointer" }}
                className="icon-back"
                onClick={() => navigate("/estoque")}
              />
              CADASTRAR PRODUTO
            </div>

            <form className="container-inputs" onSubmit={handleSubmit}>
              <div className="nome-produto">
                <label className="label-name">Nome do Produto:</label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  className="input-border"
                  type="text"
                  placeholder="Nome do Produto"
                  name="name"
                />
              </div>

              <div className="ean-input">
                <label className="label-name">EAN: </label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  name="ean"
                  className="input-border"
                  type="text"
                  placeholder="Ean"
                />
              </div>

              <div className="estoque-input">
                <label className="label-name">Quantidade:</label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  name="amount"
                  className="input-border"
                  type="text"
                  placeholder="Quantidade"
                />
              </div>

              <div className="preco-custo-input">
                <label className="label-name">Preço de custo:</label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  name="purchasePrice"
                  className="input-border"
                  type="money"
                  placeholder="Preço de custo"
                />
              </div>

              <div className="preco-venda-input">
                <label className="label-name">Preço de venda:</label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  name="salePrice"
                  className="input-border"
                  type="money"
                  placeholder="Preço de venda"
                />
              </div>

              <div className="categoria-input">
                <label className="label-name">Categoria: </label>
                <br />
                <select
                  defaultValue={"Escolha a opção"}
                  name="category"
                  id="categoria"
                  className="input-border"
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled="disabled">Escolha a opção</option>
                  <option value="Medicamento">Medicamento</option>
                  <option value="Perfumaria">Perfumaria</option>
                </select>
              </div>

              <div className="valor-maximo-desconto-input">
                <label className="label-name">Valor Máximo Desconto:</label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  name="maxDiscountPercentage"
                  className="input-border"
                  type="money"
                  placeholder="Valor Máximo Desconto"
                />
              </div>

              <div className="percentual-comissao-input">
                <label className="label-name">Percentual de Comissão:</label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  name="percentageOfCommission"
                  className="input-border"
                  type="text"
                  placeholder="Percentual de Comissão"
                />
              </div>

              <div className="valor-fixo-input">
                <label className="label-name">Valor Fixo de Comissão:</label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  name="fixedCommissionValue"
                  className="input-border"
                  type="text"
                  placeholder="Valor Fixo de Comissão"
                />
              </div>

              <div className="valor-fixo-input">
                <label className="label-name">Imagem</label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  name="image"
                  className="input-border"
                  type="text"
                  placeholder="Imagem"
                />
              </div>

              <div className="outline-button">
                <button
                  style={{ cursor: "pointer" }}
                  className="cadastrar-produto-button"
                  type="submit"
                >
                  Cadastrar Produto
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  className="cancelar-button"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
