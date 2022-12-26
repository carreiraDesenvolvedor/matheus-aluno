import React from "react";
import ReactDOM from "react-dom/client";
import PatientsContextProvider from "./context/PatientsContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<ChakraProvider>
			<PatientsContextProvider>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</PatientsContextProvider>
		</ChakraProvider>
	</BrowserRouter>
);