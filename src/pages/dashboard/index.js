import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Form, 
  Input, 
  InputNumber, 
  Button, 
  Select,
  Card,
  notification,
  message,
} from 'antd';
import { PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';

import LineGraph from '../../components/graph';
import api from '../../services/api';
import { BasicConfigAction } from '../../actions';
import './styles.css';

function Dashboard() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { basic_config, measurements } = useSelector((state) => state.BasicConfigurationReducer);
  const [stop, setStop] = useState(0);
  const [measurementState, setMeasurementState] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  async function getMeasurements() {
    try {
      const { data } = await api.get(`/measurements/${5}`, {params: { measurement_type: 1 } })
      .then((response) => response);

      setDataSource(data);
    } catch (error) {
      notification.error({ message: 'Error' });
    }
  }

  async function sendCommandToEsp() {
    // 192.168.0.102
    const { 
      origin, 
      destiny, 
      command, 
      sensor_id, 
      extra_info, 
      device_ip,
      check_sum } = basic_config; 

    const message = `01${origin}${destiny}${command}${sensor_id}${extra_info}${check_sum}`;
    dispatch(BasicConfigAction.async_get_sensor_value(device_ip, message));
  }

  function saveConfig({ 
    origin = 251, destiny, sensor_id, device_ip, frequency=10 }) {
    // 84 is the command in decimal base.
    // 1 is the header value
    // 1530 is the rest
    const check_sum = (1 + origin + destiny + 84 + sensor_id + 1274) % 256;
    
    dispatch(BasicConfigAction.save_basic_config({
      origin: origin.toString(16).padStart(2, "0"),
      destiny: destiny.toString(16).padStart(2, "0"),
      sensor_id: sensor_id.toString(16).padStart(2, "0"),
      command: '54',
      device_ip,
      extra_info: 'FFFFFFFFFFFF',
      check_sum: check_sum.toString(16).padStart(2, "0"),
      frequency
    }));

    message.success('Configuração salva');
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

  console.log({measurementState})

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

      <Card title="Configuração">
        <Form title='Configuração' onFinish={saveConfig}>
          <Form.Item label="Origem" name='origin'>
            <InputNumber min={0} max={255} />
          </Form.Item>

          <Form.Item label="Dispositivo" name='destiny'>
            <Select>
              <Option value={1} key="device-01">Dispositivo 1</Option>
              <Option value={2} key="device-02">Dispositivo 2</Option>
              <Option value={3} key="device-03">Dispositivo 3</Option>
              <Option value={4} key="device-04">Dispositivo 4</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Sensor" name='sensor_id'>
            <Select>
              <Option value={1} key="sensor-01">Sensor 1</Option>
              <Option value={2} key="sensor-02">Sensor 2</Option>
              <Option value={3} key="sensor-03">Sensor 3</Option>
              <Option value={4} key="sensor-04">Sensor 4</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Frequência" name="frequency" key="frequency">
            <InputNumber min={1} max={1000} />
          </Form.Item>

          <Form.Item label="IP" name="device_ip">
            <Input placeholder="000.000.000.000"/>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form>
      </Card>

      <Button onClick={getMeasurements}>Get measurements</Button>
      
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