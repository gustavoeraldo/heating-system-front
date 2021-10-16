import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Space } from 'antd';
import { 
  PauseOutlined, 
  PlayCircleOutlined, 
  SettingOutlined ,
  EyeOutlined,
  EyeInvisibleOutlined,
  BarChartOutlined,
  ClearOutlined,
} from '@ant-design/icons';

import LineGraph from '../../components/graph';
import { SettingsModal, LogBox } from '../../components';
import { BasicConfigAction } from '../../actions';
import './styles.css';

function Dashboard() {
  const dispatch = useDispatch();
  const { basic_config, measurements, stop_measuring, failures } = useSelector((state) => state.BasicConfigurationReducer);
  const [measurementState, setMeasurementState] = useState(false);
  const [viewLogs, setViewLogs] = useState(false);
  const [modalVisibility, setModalVisibility] = useState({ confiVisibility: false });

  const [teste, setTest] = useState();

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

  function refreshRate() {
    console.log('testando');
    sendCommandToEsp();
  }

  useEffect(() => {
    if(measurementState && !stop_measuring){
      setTest(
        setInterval(refreshRate, 1000 / basic_config.frequency)
      );
    }else {
      clearInterval(teste);
    }
  
    }, [basic_config, measurementState, dispatch, stop_measuring]);

  useEffect(() => {}, [failures])
  
  console.log({failures})

  return (
    <body>
      <header class="temperature-monitoring-header">
        <h1>Monitoramento de temperatura</h1>
      </header>
    
    <main>
      <Card
        extra={[
          <Space>
            <Button 
            key="set-config-btn" 
            size="large"
            onClick={()=> setModalVisibility({ confiVisibility: true })}
            >
              <SettingOutlined /> Configurações
          </Button>
        
          {
            !measurementState ?
            <Button size="large" type="primary" onClick={()=> {
              setMeasurementState(true); 
              dispatch(BasicConfigAction.clear_errors());
              }}>
              Iniciar aquisição <PlayCircleOutlined />
            </Button> 
            :
            <Button size="large" type="danger" onClick={()=> setMeasurementState(false)}>
              Pausar aquisição <PauseOutlined />
            </Button>
          }

          {/* <Button size="large" type="primary">Extrair dados <BarChartOutlined /></Button> */}

          { !viewLogs?
            <Button 
            onClick={() => setViewLogs(true)} size="large" type="primary">
              Visualizar logs <EyeOutlined />
            </Button>
            :
            <Button
            onClick={() => setViewLogs(false)} size="large" type="primary">
              Desabilitar logs <EyeInvisibleOutlined />
            </Button>
          }
          </Space>
        ]}
        bordered 
        bodyStyle={{ border: '1px solid', width: '1000px' }}
        >
          <Card bordered={false}>
            <LineGraph dataSource={measurements} frequency={basic_config.frequency} key="dsakmda"/>
          </Card>

          {viewLogs && 
            <Card bordered={false} extra={
              <Button danger onClick={() => dispatch(BasicConfigAction.clear_logs())} >
                Limpar logs <ClearOutlined />
              </Button>
            }>
              <LogBox visible={viewLogs}/>
            </Card>
          }
        
      </Card>

      <SettingsModal 
        visible={modalVisibility.confiVisibility} 
        onCancel={()=> setModalVisibility({ confiVisibility: false })}
      />

    </main>
  </body>
  );
}

export default Dashboard;