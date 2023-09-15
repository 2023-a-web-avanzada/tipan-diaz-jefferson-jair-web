import { Box, VStack, Input, Button, FormControl, FormLabel, Radio, RadioGroup, Stack, Textarea } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

export default function CreatePatient() {
    const [patientData, setPatientData] = useState({
        Nombre: '',
        Fecha_Nacimiento: '',
        Genero: '',
        Direccion: '',
        Telefono: '',
        Email: '',
        Antecedentes_Familiares: '',
        Antecedentes_Personales_No_Patologicos: '',
        Antecedentes_Personales_Patologicos: ''
    });

    async function handleSave() {
        try {
            await axios.post('http://localhost:3000/pacientes', patientData);
            // Aquí puedes redireccionar a la página principal o mostrar un mensaje de éxito.
        } catch (error) {
            console.error("Error creating patient:", error);
        }
    }

    return (
        <Box p={8}>
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input placeholder="Nombre" onChange={(e) => setPatientData({ ...patientData, Nombre: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <Input type="date" onChange={(e) => setPatientData({ ...patientData, Fecha_Nacimiento: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Género</FormLabel>
                    <RadioGroup onChange={(value) => setPatientData({ ...patientData, Genero: value })}>
                        <Stack direction="row">
                            <Radio value="Masculino">Masculino</Radio>
                            <Radio value="Femenino">Femenino</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Dirección</FormLabel>
                    <Input placeholder="Dirección" onChange={(e) => setPatientData({ ...patientData, Direccion: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Teléfono</FormLabel>
                    <Input placeholder="Teléfono" onChange={(e) => setPatientData({ ...patientData, Telefono: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Email" type="email" onChange={(e) => setPatientData({ ...patientData, Email: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Antecedentes Familiares</FormLabel>
                    <Textarea placeholder="Antecedentes Familiares" onChange={(e) => setPatientData({ ...patientData, Antecedentes_Familiares: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Antecedentes Personales No Patológicos</FormLabel>
                    <Textarea placeholder="Antecedentes Personales No Patológicos" onChange={(e) => setPatientData({ ...patientData, Antecedentes_Personales_No_Patologicos: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Antecedentes Personales Patológicos</FormLabel>
                    <Textarea placeholder="Antecedentes Personales Patológicos" onChange={(e) => setPatientData({ ...patientData, Antecedentes_Personales_Patologicos: e.target.value })} />
                </FormControl>

                <Button onClick={handleSave}>Guardar</Button>
                <Link href="/home">
                    <Button>Volver a la página principal</Button>
                </Link>
            </VStack>
        </Box>
    );
}
