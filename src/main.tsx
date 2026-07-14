import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from "./components/Context/AppContext.tsx";
import {BrowserRouter} from "react-router"


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter basename="/currebcy-market">
		<AppProvider>
			<App />
 		</AppProvider>
		</BrowserRouter>
	</StrictMode>,
)
