import React, { useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/all';
import axios from 'axios';

import './styles.css';

function ControlView() {
  const codeInstructions = [
    {
      cod: "--",
      instruction: "Selecione",
    },
    {
      cod: "79",
      instruction: "Liga/Desl Dispositivo",
    },
    {
      cod: "77",
      instruction: "Altera Nível de Potência",
    },
    {
      cod: "84",
      instruction: "Solicita Medida do Sensor",
    },
    {
      cod: "86",
      instruction: "Resposta do Sensor",
    },
    {
      cod: "6",
      instruction: "ACK",
    },
    {
      cod: "21",
      instruction: "NACK",
    },
    {
      cod: "82",
      instruction: "NACK",
    },
    {
      cod: "83",
      instruction: "Solicita Setpoint ",
    },
    {
      cod: "81",
      instruction: "Altera Setpoint",
    },
    {
      cod: "5",
      instruction: "Está Operacional?",
    },
    {
      cod: "51",
      instruction: "Escreve 1 BYTE",
    },
    {
      cod: "52",
      instruction: "Escreve 1 WORD",
    },
    {
      cod: "53",
      instruction: "Escreve 2 WORD",
    },
    {
      cod: "54",
      instruction: "Escreve N BYTES",
    },
    {
      cod: "55",
      instruction: "Solicita N BYTES",
    },
    {
      cod: "56",
      instruction: "Responde N BYTES",
    },
  ];
  const recievedData = [255, 255, 255, 255, 255, 255, 255, 255];
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  // const [input3, setInput3] = useState("");
  // const [input4, setInput4] = useState("");
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [data4, setData4] = useState("");
  const [data5, setData5] = useState("");
  const [data6, setData6] = useState("");
  // const [input11, setInput11] = useState("");
  // const [input12, setInput12] = useState("");
  // const [input13, setInput13] = useState("");
  // const [input14, setInput14] = useState("");
  // const [input15, setInput15] = useState("");
  // const [input16, setInput16] = useState("");


  function handleSubmit() {
    // var myform = document.forms[0].children;
    // for (let i of myform){
    //   console.log(i.value);
    // }

    console.log({input1,input2});

    

    axios.post(`http://192.168.0.105/`
      `${data1}${data2}${data3}${data4}${data5}${data6}`)
      .then((response) => {
        console.log(response.data);
      }).catch((error)=> console.log(error));

  }

  return (
    <>
      <header>
        <h1>This is control view</h1>
      </header>

      <main>
        <div class="container-send-form">
          <h2>Envio de comandos</h2>

          <form 
            action="/" 
            method="get" 
            target="_blank"
            class="form-inline"
          >
            <label for="origin">Origem:</label>
            <input 
              id="origin"
              class="form-input"
              type="number" 
              placeholder="0-255" 
              min="0"
              max="255" 
              onChange={(e) => setInput1(e.target.value) }
              value={input1}
              />

            <label for="destiny">Destino:</label>
            <input 
              class="form-input" 
              type="number" 
              placeholder="0-255" 
              min="0" 
              max="255"
              onChange={(e)=> setInput2(e.target.value) }
              value={input2}
              />

            <label for="instructions">Instruções:</label>
            <select 
              name="select" 
              id="select-protocol" 
              onChange={(e)=> setInput2(e.target.value)}
              >
              {
                codeInstructions.map((instruct) => (
                  <option value={instruct.cod}>{instruct.instruction}</option>
                ))
              }
            </select>
          
            <div class="packages-container">
              <h3>Pacote de dados
              <AiOutlineQuestionCircle />
              </h3>

              <div class="packages-input">

                <div class="package-item">
                  <label for="">Dado 1:</label>
                  <input 
                    class="form-input" 
                    type="number" 
                    placeholder="0-255" 
                    min="0" max="255"
                    onChange={(e) => setData1(e.target.value) } />
                </div>
                
                <div class="package-item">
                  <label for="">Dado 2:</label>
                  <input 
                    class="form-input" 
                    type="number" 
                    placeholder="0-255" 
                    min="0" max="255" 
                    onChange={(e) => setData2(e.target.value) } />
                </div>
                            
                <div class="package-item">
                  <label for="">Dado 3:</label>
                  <input 
                    class="form-input" 
                    type="number" 
                    placeholder="0-255" 
                    min="0" max="255"
                    onChange={(e) => setData3(e.target.value) } />
                </div>

                <div class="package-item">
                  <label for="">Dado 4:</label>
                  <input 
                    class="form-input" 
                    type="number" 
                    placeholder="0-255" 
                    min="0" max="255"
                    onChange={(e) => setData4(e.target.value) } />
                </div>
              
                <div class="package-item">
                  <label for="">Dado 5:</label>
                  <input 
                    class="form-input" 
                    type="number" 
                    placeholder="0-255" 
                    min="0" max="255"
                    onChange={(e) => setData5(e.target.value) } />
                </div>
                
                <div class="package-item">
                  <label for="">Dado 6:</label>
                  <input 
                    class="form-input" 
                    type="number" 
                    placeholder="0-255" 
                    min="0" max="255"
                    onChange={(e) => setData6(e.target.value) } />
                </div>
                
              </div>
              
            </div>
            
            <div class="extra-code-container">
              <h3>Códigos de verificação</h3>

              <div class="extra-inst-item">
                <label for="">
                  PAC 
                  <span class="pac-icon"><AiOutlineQuestionCircle /></span>
                  :
                </label>
                <input type="number" placeholder="0-255" min="0" max="255" />
              </div>  

              <div class="extra-inst-item">
                <label for="">CRC:</label>
                <input type="number" placeholder="0-255" min="0" max="255" />
              </div>          
            </div>
            
            <div class="address-container">
              <h3>IP da aplicação</h3>
              
              <div class="address-item">
                <label for="">IP:</label>
    
                <input 
                  type="text" 
                  placeholder="111.111.111.11"
                  maxLength="11" />
              </div>
              
            </div>
            
            <div class="submit-content">
              <input 
                class="submit-button" 
                type="submit" 
                value="Enviar" 
                onClick={handleSubmit}/>
            </div>
            
          </form>
        </div>
       
          
        <div class="extra-tooltip">
          <p>Enchimento ou identificador de fragmentação</p>
        </div> 
      
        <div class="recieved-data-container">
          <h2>Dados Recebidos</h2>
          
          <div class="data-list">
            <ul class="list-content">
              {
                recievedData.map((data, index) => (
                  <li class="data-item">
                    <strong>Dado {index + 1}:</strong>
                    <span>{data}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

      </main>
      
    </>
  );
}

export default ControlView;