import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal,
    Tabs,
    Form,
    Card,
    Select,
    InputNumber,
    Input,
    Button,
    message,
} from 'antd';
import { CloseCircleOutlined, ControlOutlined } from '@ant-design/icons';

import { BasicConfigAction, UsersAction } from '../../actions';

function SettingsModal({ visible, onCancel }) {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { users_list } = useSelector((state) => state.UsersReducer);

  function saveUserSettings({ user_id, measurement_type }) {
    dispatch(UsersAction.save_user_info(user_id, measurement_type));
    message.success('Configuração salva');
  }

  function saveConfig({ 
    origin = 251, destiny, sensor_id, device_ip, frequency=0.1 }) {
    // 84 is the command in decimal base.
    // 1 is the header value
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
    // setModalVisibility({ confiVisibility: false });
  }  
  
  useEffect(() => {
      if (users_list.length < 1) {
        dispatch(UsersAction.async_get_users());
      }
      
  }, [users_list, dispatch]);

  return (
    <Modal 
        key="test"
        visible={visible} 
        onCancel={onCancel}
        footer={null}
        keyboard
        width={600}
        bodyStyle={{ height: '450px' }}
        closeIcon={<CloseCircleOutlined style={{ color: 'red' }} />}
        >
        <Tabs defaultActiveKey="1" tabPosition="left" onChange={()=> {}}>
            <TabPane tab="Configuração de usuário" key="connection-tab">
                <Card bordered={false}>
                    <Form form={form} onFinish={saveUserSettings}>
                        <Form.Item label="Usuário" name="user_id">
                            <Select>
                                {
                                    users_list.map((user) => (
                                        <Option value={user.usr_id} key={`usr-${user.usr_id}`}>{user.username}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item label="Tipo de medição" name="measurement_type">
                            <Select>
                                <Option value={1} key="temperature">Temperatura</Option>
                            </Select>
                        </Form.Item>

                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            Salvar
                        </Button>
                    </Form>
                </Card>

            </TabPane>

            <TabPane 
                key="user-tab"
                tab={
                    <span>
                        <ControlOutlined />
                        Configuração de conexão
                    </span>    
                }
                >
                <Card bordered={false}>
                    <Form form={form} onFinish={saveConfig}>
                        <Form.Item label="Origem" name='origin'>
                            <InputNumber min={0} max={255} style={{width: '100%'}} />
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
                            <InputNumber min={1} max={100} style={{width: '100%'}} />
                        </Form.Item>

                        <Form.Item label="IP" name="device_ip">
                            <Input placeholder="000.000.000.000"/>
                        </Form.Item>

                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            Salvar
                        </Button>
                    </Form>
                </Card>
            </TabPane>
        </Tabs>
    </Modal>
  );
}

SettingsModal.propTypes = {
    visible: PropTypes.bool.isRequired, 
    onCancel: PropTypes.func.isRequired,
};

export default SettingsModal;