import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'antd';
import { 
  PauseOutlined, 
  PlayCircleOutlined, 
  SettingOutlined 
} from '@ant-design/icons';

import LineGraph from '../../components/graph';
import { SettingsModal } from '../../components';
import { BasicConfigAction } from '../../actions';
import './styles.css';

function Dashboard() {
  const dispatch = useDispatch();
  const { basic_config, measurements } = useSelector((state) => state.BasicConfigurationReducer);
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
    
    let coded_message;
    if (sensor_id.length <= 2) {
      coded_message = `01${origin}${destiny}${command}0${sensor_id}${extra_info}${check_sum}`;
      dispatch(BasicConfigAction.async_get_sensor_value(
          device_ip, coded_message, `Sensor ${sensor_id}`)
        );
    }else {
      const sensors = sensor_id.split('0').slice(1);
      for (let i in sensors) {
        coded_message = `01${origin}${destiny}${command}0${sensors[i]}${extra_info}${check_sum}`;        
        dispatch(BasicConfigAction.async_get_sensor_value(
          device_ip, coded_message, `Sensor ${sensors[i]}`)
        );
      }
    }
  }

  useEffect(() => {
    if(measurementState){
      setInterval(() => {
        sendCommandToEsp();
      }, 1000 / basic_config.frequency);
    }
  
    }, [basic_config, measurementState, dispatch]);

  return (
    <body>
      <header class="temperature-monitoring-header">
        <h1>Monitoramento de temperatura</h1>
      </header>
    
    <main>
      <Card bordered={false}>
        <LineGraph dataSource={measurements} frequency={basic_config.frequency} key="dsakmda"/>
      </Card>

      <SettingsModal 
        visible={modalVisibility.confiVisibility} 
        onCancel={()=> setModalVisibility({ confiVisibility: false })}/>

      <Button 
        key="set-config-btn" 
        size="large"
        onClick={()=> setModalVisibility({ confiVisibility: true })}
        >
          <SettingOutlined /> Configuração de uso
      </Button>
      
      {
        !measurementState ?
        <Button size="large" type="primary" onClick={()=> setMeasurementState(true)}>
          Iniciar aquisição <PlayCircleOutlined />
        </Button> 
        :
        <Button size="large" type="danger" onClick={()=> setMeasurementState(false)}>
          Pausar aquisição <PauseOutlined />
        </Button>
      }

    </main>
  </body>
  );
}

export default Dashboard;