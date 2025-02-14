import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './store'
import { router } from './pages'
import "dayjs/locale/en";
import "dayjs/locale/vi";
import { ContainerModal } from "./modal";
import { ConfigProvider } from 'antd'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#98E2BA"
          },
          Button: {
            colorPrimary: "#98E2BA",
            colorPrimaryHover: "#E0D816"
          }
        }
      }}
    >
          <Provider store={store}>
            {/* <AuthCheckWrapper> */}
              <RouterProvider router={router} />
              <ContainerModal />
            {/* </AuthCheckWrapper> */}
        </Provider>
    </ConfigProvider>
  </StrictMode>
)
