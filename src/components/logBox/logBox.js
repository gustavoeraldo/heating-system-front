import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    Timeline,
} from 'antd';

function LogBox({ visible }) {

  const { logsMessages } = useSelector((state) => state.BasicConfigurationReducer);

  useEffect(() => {}, [logsMessages]);

  console.log({logsMessages});

  return (
      <Card bodyStyle={{
          visibility: visible ? 'visible': 'hidden',
          height: '300px',
          overflow: 'scroll'
          }}>
        <Timeline>
            {   
                logsMessages.length < 1 ?
                <Timeline.Item color="gray">Nenhum log registrado</Timeline.Item>
                : 
                logsMessages.map((log) => (
                    <Timeline.Item color={log.type === 'success' ? 'green': 'red'}>
                        <p>{log.message}</p>
                    </Timeline.Item>
                ))
            }
        </Timeline>
      </Card>
  );
}

LogBox.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default LogBox;