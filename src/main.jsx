import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#d4920a',
          colorBgBase: '#0f0600',
          fontFamily: "'Outfit', sans-serif",
          borderRadius: 12,
          colorLink: '#d4920a',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
