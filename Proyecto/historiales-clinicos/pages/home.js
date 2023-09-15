import { useState, useEffect, useRef } from 'react';
import { Box, VStack, Input, Button, Text, Heading, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await axios.get('http://localhost:3000/pacientes');
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }

        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(patient =>
        patient.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deletePatient = async (patientId) => {
        try {
            await axios.delete(`http://localhost:3000/pacientes/${patientId}`);
            setPatients(patients.filter(p => p.ID_Paciente !== patientId));
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    return (
        <Box p={8}>
            <VStack spacing={4} align="stretch" width="full">
                <Heading mb={4}>Lista de Pacientes</Heading>
                <Link href="/create">
                    <Button mt={4}>Crear nueva historia</Button>
                </Link>
                <Input
                    placeholder="Buscar paciente"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredPatients.map(patient => (
                    <Box p={4} bg="gray.200" borderRadius="md" display="flex" alignItems="center" justifyContent="space-between" key={patient.ID_Paciente}>
                        <Link href={`/${patient.ID_Paciente}`}>
                            <Box cursor="pointer">
                                <Text fontSize="xl" mb={2}>{patient.Nombre}</Text>
                                <Text>Email: {patient.Email}</Text>
                                <Text>Teléfono: {patient.Telefono}</Text>
                            </Box>
                        </Link>
                        <Button colorScheme="red" onClick={() => { setSelectedPatient(patient.ID_Paciente); setIsOpen(true); }}>Eliminar</Button>
                    </Box>
                ))}

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Eliminar Paciente
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                ¿Estás seguro? Esta acción eliminará al paciente y todas las entidades asociadas. No se puede deshacer.
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button colorScheme="red" onClick={() => { deletePatient(selectedPatient); onClose(); }} ml={3}>
                                    Eliminar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </VStack>
        </Box>
    );
}
