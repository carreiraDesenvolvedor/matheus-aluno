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
import FormErrorMessage from "../components/Form/ErrorMessage";

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

	const [formValidation, setFormValidation] = useState({});

	const handleOnChangeGenre = (value) => {
		setForm({
			...form,
			genre: value
		})
	}

	const handleOnChange = (event) => 
		setForm({
			...form,
			[event.target.name]: event.target.value
		})
	

	function validateForm(newPatient) {
		
		if (
			newPatient.cpf !== "" ||
			newPatient.cpf.length === 11 ||
			newPatient.cpf !== dataPatients.map((patient) => patient.cpf)
		) {
			// setIsValid(true);
		}

		
	}

	const isFormValid = () => {
		let result = true;
		let validationMessages = {}
		//Check if any input is empty
		Object.keys(form).map((attributeName) => {
			if(form[attributeName] === ""){
				result = false;
				validationMessages[attributeName] = "Esse campo é obrigatório!";
			}
		});

		//check if is a valid cpf
		if(form.cpf.length !== 11){
			validationMessages.cpf = "Esse CPF é inválido!";
			result = false;
		}

		//Check if CPF already exists
		if(dataPatients.find((patient) => patient.cpf === form.cpf)){
			validationMessages.cpf = "Esse CPF já foi cadastrado para outro usuário!";
			result = false;
		}

		setFormValidation(validationMessages)
		return result;
	}

	function handleSubmitForm() {
		
		if(isFormValid()){

			const newData = [...dataPatients, ...[
				{
					...form,
					id: dataPatients.length + 1
				}
			]];
			
			localStorage.setItem("patients", JSON.stringify(newData));
			setDataPatients(newData);
			setForm(formStateEmpty);

			Swal.fire({
				title: "Paciente Cadastrado com Sucesso!",
				icon: "success",
				confirmButtonText: "OK",
				confirmButtonColor: "#2D9CDB",
			});

		}
		
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
								<FormErrorMessage errors={formValidation} fieldName='name' />
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
								<FormErrorMessage errors={formValidation} fieldName='email' />
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="nasc">
									Data de Nascimento
								</FormLabel>
								<Input
									name="birthDate"
									variant="filled"
									type="date"
									onChange={handleOnChange}
									value={form.birthDate}
								/>
								<FormErrorMessage errors={formValidation} fieldName='birthDate' />
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
								<FormErrorMessage errors={formValidation} fieldName='cpf' />
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
								<FormErrorMessage errors={formValidation} fieldName='address' />
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
								<FormErrorMessage errors={formValidation} fieldName='city' />
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
								<FormErrorMessage errors={formValidation} fieldName='phone' />
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
									name="status"
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
