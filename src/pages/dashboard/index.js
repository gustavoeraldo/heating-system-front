import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { PauseOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';

import LineGraph from '../../components/graph';
import { SettingsModal } from '../../components';
import { BasicConfigAction } from '../../actions';
import './styles.css';

function Dashboard() {
  const dispatch = useDispatch();
  const { basic_config, measurements } = useSelector((state) => state.BasicConfigurationReducer);
  const [stop, setStop] = useState(0);
  const [measurementState, setMeasurementState] = useState(false);
  const [modalVisibility, setModalVisibility] = useState({ confiVisibility: false });

  async function sendCommandToEsp() {
    const { 
      origin, 
      destiny, 
      command, 
      sensor_id, 
      extra_info, 
      device_ip,
      check_sum } = basic_config; 
    
    const coded_message = `01${origin}${destiny}${command}${sensor_id}${extra_info}${check_sum}`;
    dispatch(BasicConfigAction.async_get_sensor_value(device_ip, coded_message));
  }

  useEffect(() => {
    if(measurementState){
      setTimeout(() => {
        setStop(stop+1);

        sendCommandToEsp();
        // dispatch(BasicConfigAction.async_get_measurements(1, 3));
      }, 1000 / basic_config.frequency);
    }
  
    }, [basic_config, stop, measurementState, measurements]);

  return (
    <body>
      <header class="temperature-monitoring-header">
        <h1>Temperature monitoring</h1>
      </header>
    
    <main>
      <div class="graph-container">
        <div class="graph">
          <div class="graph-line">
            <LineGraph dataSource={measurements} />
          </div>
        </div>
      </div>

      <SettingsModal 
        visible={modalVisibility.confiVisibility} 
        onCancel={()=> setModalVisibility({ confiVisibility: false })}/>

      <Button 
        key="set-config-btn" 
        onClick={()=> setModalVisibility({ confiVisibility: true })}
        >
          <SettingOutlined /> Configuração de uso
      </Button>
      
      {
        !measurementState ?
        <Button type="primary" onClick={()=> setMeasurementState(true)}>
          Iniciar aquisição <PlayCircleOutlined />
        </Button> 
        :
        <Button type="danger" onClick={()=> setMeasurementState(false)}>
          Pausar aquisição <PauseOutlined />
        </Button>
      }

    </main>
  </body>
  );
}

export default Dashboard;