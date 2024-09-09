import "./Principal.css";
import { useState, useRef, useEffect } from "react";
import olhoEsq from "../img/irise.gif";
import olhoDir from "../img/irisd.gif";
import olhoEsqBr from "../img/irise-branco.png";
import olhoDirBr from "../img/irisd-branco.png";

export default function Principal() {
  const [img, setImg] = useState(null);
  const divFundoRef = useRef(null);
  const tituloRef = useRef(null);

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  }

  function telaCheia() {
    const divFundo = divFundoRef.current;
    const titulo = tituloRef.current;
    if (divFundo) {
      divFundo.style.width = "100%";
      divFundo.style.height = "97vh";
      titulo.style.display = "none";
    }
  }

  const [olho, setOlho] = useState(0);
  const listaMascara = [olhoEsq, olhoDir, olhoEsqBr, olhoDirBr];

  const handleOlho = () => {
    setOlho((prev) => (prev + 1) % listaMascara.length);
  };

  const [posicaoX, setPosicaoX] = useState(0);
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

  // Adiciona o evento de movimentação com as setas
  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.key) {
        case "ArrowUp":
          setPosicaoY((prev) => prev - 5); // Move para cima
          break;
        case "ArrowDown":
          setPosicaoY((prev) => prev + 5); // Move para baixo
          break;
        case "ArrowLeft":
          setPosicaoX((prev) => prev - 5); // Move para a esquerda
          break;
        case "ArrowRight":
          setPosicaoX((prev) => prev + 5); // Move para a direita
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <h1 ref={tituloRef} className="titulo">Iris Diag</h1>

      <div className="fundo" ref={divFundoRef}>
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
          <button onClick={telaCheia}>Tela Cheia</button>
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleOlho}>Mudar Máscara</button>
          <button onClick={handleOpacidade} id="botaoOpacidade">
            Alterar Opacidade
          </button>

          <label htmlFor="inputFile">
            <div className="inputs">
              <input
                type="range"
                id="tamanho"
                min="50"
                max="200"
                value={tamanhoMascara}
                onChange={handleTamanhoChange}
              />
              <p>Tamanho da Máscara</p>
              <input
                type="range"
                id="tamanhoOlho"
                min="50"
                max="300"
                value={tamanhoOlho}
                onChange={handleTamanhoOlhoChange}
              />
              <p>Tamanho do Olho</p>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
