import {
    Box, VStack, Text, Button, Input, Textarea, FormControl, FormLabel, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
    Heading, HStack, Divider, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
    AlertDialogContent, AlertDialogOverlay, useToast, Link as ChakraLink
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PatientDetail() {
    const router = useRouter();
    const { patientId } = router.query;

    const {
        isOpen: isConsultationModalOpen,
        onOpen: onOpenConsultationModal,
        onClose: onCloseConsultationModal
    } = useDisclosure();

    const {
        isOpen: isExamModalOpen,
        onOpen: onOpenExamModal,
        onClose: onCloseExamModal
    } = useDisclosure();


    const [patient, setPatient] = useState({});
    const [antecedents, setAntecedents] = useState({});
    const [consultations, setConsultations] = useState([]);
    const [exams, setExams] = useState([]);
    const [newConsultation, setNewConsultation] = useState({
        Fecha: '',
        Motivo: '',
        Diagnostico: '',
        Tratamiento: ''
    });
    const [newExam, setNewExam] = useState({
        Presion_Arterial: '',
        Frecuencia_Cardiaca: '',
        Frecuencia_Respiratoria: '',
        Temperatura: ''
    });

    useEffect(() => {
        if (patientId) {
            axios.get(`http://localhost:3000/pacientes/${patientId}`)
                .then(response => setPatient(response.data))
                .catch(error => console.error(error));

            axios.get(`http://localhost:3000/consultas/${patientId}`)
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setConsultations(response.data);
                    } else {
                        // manejar error si response.data no es un array
                        console.error("Data received from API is not an array:", response.data);
                    }
                })
                .catch(error => {
                    console.error("API call error:", error);
                });


            axios.get(`http://localhost:3000/antecedentes/${patientId}`)
                .then(response => setAntecedents(response.data))
                .catch(error => console.error(error));

            axios.get(`http://localhost:3000/examenes/${patientId}`)
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setExams(response.data);
                    } else {
                        // manejar error si response.data no es un array
                        console.error("Data received from API is not an array:", response.data);
                    }
                })
                .catch(error => {
                    console.error("API call error:", error);
                });

        }
    }, [patientId]);

    const handleAddConsultation = async () => {
        try {
            await axios.post(`http://localhost:3000/consultas/${patientId}`, newConsultation);
            setConsultations(prev => [...prev, newConsultation]);
            setNewConsultation({
                Fecha: '',
                Motivo: '',
                Diagnostico: '',
                Tratamiento: ''
            });
            onCloseConsultation();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddExam = async () => {
        try {
            await axios.post(`http://localhost:3000/examenes/${patientId}`, newExam);
            setExams(prev => [...prev, newExam]);
            setNewExam({
                Presion_Arterial: '',
                Frecuencia_Cardiaca: '',
                Frecuencia_Respiratoria: '',
                Temperatura: ''
            });
            onCloseExam();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box p={8}>
            <VStack spacing={4}>
                <Heading>Detalle del Paciente</Heading>
                <Box w="100%" p={5} shadow="md" borderWidth="1px">
                    <HStack justifyContent="space-between">
                        <Text><strong>Nombre:</strong> {patient.Nombre}</Text>
                        <Text><strong>Email:</strong> {patient.Email}</Text>
                        <Text><strong>Teléfono:</strong> {patient.Telefono}</Text>
                    </HStack>
                    <Divider my={3} />
                    <Text><strong>Familiares:</strong> {antecedents.Familiares}</Text>
                    <Text><strong>Personales No Patológicos:</strong> {antecedents.Personales_No_Patologicos}</Text>
                    <Text><strong>Personales Patológicos:</strong> {antecedents.Personales_Patologicos}</Text>
                </Box>
                <Box w="100%">
                    <Heading size="md" mb={4}>Consultas</Heading>
                    {consultations.map(consulta => (
                        <Box key={consulta.ID_Consulta} w="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={3}>
                            <Text><strong>Fecha:</strong> {consulta.Fecha}</Text>
                            <Text><strong>Motivo:</strong> {consulta.Motivo}</Text>
                            <Text><strong>Diagnóstico:</strong> {consulta.Diagnostico}</Text>
                            <Text><strong>Tratamiento:</strong> {consulta.Tratamiento}</Text>
                        </Box>
                    ))}
                    <Button onClick={onOpenConsultationModal}>Agregar consulta</Button>
                </Box>
                <Box w="100%">
                    <Heading size="md" mb={4}>Exámenes Físicos</Heading>
                    {exams.map(exam => (
                        <Box key={exam.ID_Examen} w="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={3}>
                            <Text><strong>Presión Arterial:</strong> {exam.Presion_Arterial}</Text>
                            <Text><strong>Frecuencia Cardiaca:</strong> {exam.Frecuencia_Cardiaca}</Text>
                            <Text><strong>Frecuencia Respiratoria:</strong> {exam.Frecuencia_Respiratoria}</Text>
                            <Text><strong>Temperatura:</strong> {exam.Temperatura}</Text>
                        </Box>
                    ))}
                    <Button onClick={onOpenExamModal}>Agregar examen físico</Button>
                </Box>
                <Link href="/home">
                    <Button mt={4}>Regresar a la página principal</Button>
                </Link>
            </VStack>

            <Modal isOpen={isConsultationModalOpen} onClose={onCloseConsultationModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar Consulta</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Fecha" onChange={(e) => setNewConsultation({ ...newConsultation, Fecha: e.target.value })} />
                        <Textarea placeholder="Motivo" onChange={(e) => setNewConsultation({ ...newConsultation, Motivo: e.target.value })} />
                        <Textarea placeholder="Diagnóstico" onChange={(e) => setNewConsultation({ ...newConsultation, Diagnostico: e.target.value })} />
                        <Textarea placeholder="Tratamiento" onChange={(e) => setNewConsultation({ ...newConsultation, Tratamiento: e.target.value })} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleAddConsultation}>Guardar</Button>
                        <Button onClick={onCloseConsultationModal}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isExamModalOpen} onClose={onCloseExamModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar Examen Físico</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Presión Arterial" onChange={(e) => setNewExam({ ...newExam, Presion_Arterial: e.target.value })} />
                        <Input placeholder="Frecuencia Cardiaca" onChange={(e) => setNewExam({ ...newExam, Frecuencia_Cardiaca: e.target.value })} />
                        <Input placeholder="Frecuencia Respiratoria" onChange={(e) => setNewExam({ ...newExam, Frecuencia_Respiratoria: e.target.value })} />
                        <Input placeholder="Temperatura" onChange={(e) => setNewExam({ ...newExam, Temperatura: e.target.value })} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleAddExam}>Guardar</Button>
                        <Button onClick={onCloseExamModal}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );

}
