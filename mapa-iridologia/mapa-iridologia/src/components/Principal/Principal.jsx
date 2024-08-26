import "./Principal.css";
import { useState, useRef } from "react";
import olhoEsq from "../img/irise.gif"
import olhoDir from "../img/irisd.gif"
import olhoEsqBr from "../img/irise-branco.png"
import olhoDirBr from "../img/irisd-branco.png"

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
      divFundo.style.height = "95vh";
      titulo.style.display = "none";
    }
  }

  const [olho, setOlho] = useState(0);
  const listaMascara = [olhoEsq , olhoDir , olhoEsqBr , olhoDirBr]; 

  const handleOlho = () => {
    setOlho(prevOlho == 0 ? (prevOlho) => {prevOlho+1} : prevOlho = 0);
  }

  const [posicaoX , setPosicaoX] = useState(0);
  const [posicaoY, setPosicaoY] = useState(0);
  const [tamanhoMascara, setTamanhoMascara] = useState(0);
  const [tamanhoOlho, setTamanhoOlho] = useState(0);

  function handleXChange(e) {
    setPosicaoX(e.target.value);
  }

  function handleYChange(e) {
    setPosicaoY(e.target.value);
  }

  function handleTamanhoChange(e) {
    setTamanhoMascara(e.target.value);
  }

  function handleTamanhoOlhoChange(e) {
    setTamanhoOlho(e.target.value);
  }

  return (
    <>
      <h1 ref={tituloRef}>Iris Diag</h1>

      <div className="fundo" ref={divFundoRef}>
        <img src={listaMascara[olho]} alt="" className="mascara-olho" style={{ transform: `translateX(${posicaoX}px) translateY(${posicaoY}px) scale(${tamanhoMascara/100})` }}/>
        {img && <img src={img} alt="Preview" className="img-inputada" style={{transform: `scale(${tamanhoOlho/100})`}}/>}
      </div>
      <button onClick={telaCheia}>Tela Cheia</button>

      <label htmlFor="inputFile">
        <div className="configs">
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleOlho} >{}</button>
        </div>
        <div className="inputs">
          <input type="range" id="horizontal" min="0" max="900" value={posicaoX} onChange={handleXChange}/>
          <input type="range" id="vertical" min="-30" max="80" value={posicaoY} onChange={handleYChange}/>
          <input type="range" id="tamanho" min="50" max="200" value={tamanhoMascara} onChange={handleTamanhoChange}/>
          <input type="range" id="tamanhoOlho" min="50" max="300" value={tamanhoOlho} onChange={handleTamanhoOlhoChange}/>
        </div>
      </label>
    </>
  );
}
