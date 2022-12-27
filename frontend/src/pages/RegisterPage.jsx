import React, { useState, useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";
import Swal from "sweetalert2";
import "../style/registerPage.css";

import {
	Flex,
	Box,
	Center,
	FormControl,
	Input,
	FormLabel,
	HStack,
	RadioGroup,
	Radio,
	Button,
	Select,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const formStateEmpty = {
	name: '',
	email:'',
	cpf:'',
	phone:'',
	birthDate:'',
	address:'',
	city:'',
	status:'Ativo',
	genre:'Feminino',
};

function RegisterPage() {
	const { setDataPatients, dataPatients } = useContext(PatientsContext);
	const [form, setForm] = useState(
		formStateEmpty
	);

	const handleOnChangeGenre = (value) => {
		setForm({
			...form,
			genre: value
		})
	}

	const handleOnChange = (event) => {
		console.log(event)
		setForm({
			...form,
			[event.target.name]: event.target.value
		})
	}

	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	// const [cpf, setCpf] = useState("");
	// const [phone, setPhone] = useState("");
	// const [birthDate, setBirthDate] = useState("");
	// const [adress, setAddress] = useState("");
	// const [city, setCity] = useState("");
	// const [status, setStatus] = useState("Ativo");
	// const [genre, setGenre] = useState("Masculino");

	const [isValid, setIsValid] = useState(false);

	function validateForm(newPatient) {
		if (newPatient.nome !== "") {
			setIsValid(true);
		} else {
			setIsValid(false);
			console.log("NOME VAZIO");
		}

		if (newPatient.email !== "") {
			setIsValid(true);
		}

		if (
			newPatient.cpf !== "" ||
			newPatient.cpf.length === 11 ||
			newPatient.cpf !== dataPatients.map((patient) => patient.cpf)
		) {
			setIsValid(true);
		}

		if (newPatient.telefone !== "") {
			setIsValid(true);
		}

		if (newPatient.dataDeNascimento === "") {
			setIsValid(true);
		}

		if (newPatient.cidade === "") {
			setIsValid(true);
		}

		if (isValid) {
			const newData = [...dataPatients, ...[newPatient]];
			localStorage.setItem("patients", JSON.stringify(newData));
			setDataPatients(newData);
		}

		if (isValid) {
			Swal.fire({
				title: "Paciente Cadastrado com Sucesso!",
				icon: "success",
				confirmButtonText: "OK",
				confirmButtonColor: "#2D9CDB",
			});

			setForm(formStateEmpty);

		}
	}

	function handleSubmitForm() {

		//id: dataPatients.length + 1,

	
		validateForm(form);
	}

	return (
		<>
			<Center className="header" as="header">
				Cadastro de Pacientes
			</Center>
			<NavBar />
			<Box className="box-form">
				<Flex className="form-container">
					<FormControl className="form">
						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="nome">Nome</FormLabel>
								<Input
									name="name"
									variant="filled"
									placeholder="Informe o nome completo"
									onChange={handleOnChange}
									value={form.name}
								/>
								{/* {name === "" ? (
									<p>{`* Por favor informe um nome`}</p>
								) : null} */}
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="email">E-mail</FormLabel>
								<Input
									name="email"
									variant="filled"
									type="email"
									placeholder="exemplo@interprocess.com"
									onChange={handleOnChange}
									value={form.email}
								/>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="nasc">
									Data de Nascimento
								</FormLabel>
								<Input
									name="nasc"
									variant="filled"
									type="date"
									onChange={handleOnChange}
									value={form.birthDate}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="cpf">CPF</FormLabel>
								<Input
									name="cpf"
									variant="filled"
									type="number"
									placeholder="000-000.000-00"
									onChange={handleOnChange}
									value={form.cpf}
								/>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="endereco">
									Endereço
								</FormLabel>
								<Input
									name="address"
									variant="filled"
									placeholder="Rua Brasil 1"
									onChange={handleOnChange}
									value={form.address}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="city">Cidade</FormLabel>
								<Input
									name="city"
									variant="filled"
									placeholder="Porto Alegre"
									onChange={handleOnChange}
									value={form.city}
								/>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="phone">Celular</FormLabel>
								<Input
									name="phone"
									variant="filled"
									type="number"
									placeholder="(51) 99999-9999"
									onChange={handleOnChange}
									value={form.phone}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel>Sexo</FormLabel>
								<RadioGroup name="genre" onChange={handleOnChangeGenre} value={form.genre}>
									<HStack>
										<Radio value="Masculino">
											Masculino
										</Radio>
										<Radio value="Feminino">Feminino</Radio>
										<Radio value="Outro">Outro</Radio>
									</HStack>
								</RadioGroup>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="status">Status</FormLabel>
								<Select
									variant="flushed"
									onChange={handleOnChange}
									value={form.status}
								>
									<option value="Ativo">Ativo</option>
									<option value="Inativo">Inativo</option>
								</Select>
							</Box>
						</HStack>

						<HStack>
							<Button
								className="submit-button"
								type="button"
								colorScheme="rgb(18, 7, 88)"
								isDisabled={
									false
								}
								onClick={handleSubmitForm}
							>
								Enviar
							</Button>
						</HStack>
					</FormControl>
				</Flex>
			</Box>
		</>
	);
}

export default RegisterPage;
