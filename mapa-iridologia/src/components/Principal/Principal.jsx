import "./Principal.css";
import { useState, useRef, useEffect } from "react";
import olhoEsq from "/img/irise.gif";
import olhoDir from "/img/irisd.gif";
import olhoEsqBr from "/img/irise-branco.png";
import olhoDirBr from "/img/irisd-branco.png";
import irisCor from "/img/iris-cor.png";

import opacidadeImg from "/img/blend.png";
import mascaraImg from "/img/layers.png"

export default function Principal() {
  const [img, setImg] = useState(null);
  const divFundoRef = useRef(null);

  const [olho, setOlho] = useState(0);
  const listaMascara = [olhoEsq, olhoDir, olhoEsqBr, olhoDirBr, irisCor];

  const handleOlho = () => {
    setOlho((prev) => (prev + 1) % listaMascara.length);
  };

  const [posicaoX, setPosicaoX] = useState(530);
  const [posicaoY, setPosicaoY] = useState(0);
  const [tamanhoMascara, setTamanhoMascara] = useState(100);
  const [tamanhoOlho, setTamanhoOlho] = useState(100);
  const [opacidade, setOpacidade] = useState(1);

  function handleTamanhoChange(e) {
    setTamanhoMascara(e.target.value);
  }

  function handleTamanhoOlhoChange(e) {
    setTamanhoOlho(e.target.value);
  }

  function handleOpacidade() {
    setOpacidade((prev) => (prev === 1 ? 0 : 1));
  }

  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.key) {
        case "ArrowUp":
          setPosicaoY((prev) => prev - 5);
          break;
        case "ArrowDown":
          setPosicaoY((prev) => prev + 5);
          break;
        case "ArrowLeft":
          setPosicaoX((prev) => prev - 5);
          break;
        case "ArrowRight":
          setPosicaoX((prev) => prev + 5);
          break;
        default:
          break;
      }
    }

    function handlePaste(e) {
      const items = e.clipboardData.items;
      const file = Array.from(items).find((item) => item.type.startsWith("image/"));
      if (file) {
        const blob = file.getAsFile();
        if (img) URL.revokeObjectURL(img);
        setImg(URL.createObjectURL(blob));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("paste", handlePaste);
    };
  }, [img]);

  return (
    <div className="bg">
      <div className="fundo" ref={divFundoRef}>
        <h1 className="titulo">Iris Diag</h1>
        <img
          src={listaMascara[olho]}
          alt=""
          className="mascara-olho"
          style={{
            transform: `translateX(${posicaoX}px) translateY(${posicaoY}px) scale(${tamanhoMascara / 100})`,
            opacity: `${opacidade}`,
          }}
        />
        {img && (
          <img
            src={img}
            alt="Preview"
            className="img-inputada"
            style={{ transform: `scale(${tamanhoOlho / 100})` }}
          />
        )}

        <div className="botoes">
          
          <button type="button" onClick={handleOlho}>
            <img src={mascaraImg} alt="Olho" />
            <p>Mudar Máscara</p>
          </button>
          <button onClick={handleOpacidade}>
            <img src={opacidadeImg} alt="Olho" />
            <p>Alterar Opacidade</p>
          </button>

          <div className="inputs">
            <div>
            <input
              type="range"
              min="50"
              max="200"
              value={tamanhoMascara}
              onChange={handleTamanhoChange}
              onFocus={(e) => e.target.blur()}
            />
            <p className="tamanho-mascara">Tamanho da Máscara</p>
            </div>
            <div>
            <input
              type="range"
              min="50"
              max="300"
              value={tamanhoOlho}
              onChange={handleTamanhoOlhoChange}
              onFocus={(e) => e.target.blur()}
            />
            <p className="tamanho-olho">Tamanho do Olho</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
