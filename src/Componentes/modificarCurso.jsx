import { Button, CardActions, CardContent, CardHeader, Typography, Grid, TextField, Select, MenuItem, Menu } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import '../Principal/Principal.css'
import Arrow from '../assets/cerrar2.svg'
import Axios from 'axios';
import { API_URL } from '../util/Constantes.js';

function ModificarCurso({ onClose, nombreCurso, fecha, hora, modalidad, direccion, imparte, cupo, estatusCupo, estatusCurso, tipoCurso, curso, valorCurricular, ligaTeams, closePrev, onOpenPopupMsj }) {

    const [errors, setErrors] = useState({});
    const [dataTiposCurso, setDataTiposCurso] = useState([])
    const dateInputRef = useRef(null);
    const timeInputRef = useRef(null);
    const [formData, setFormData] = useState({
        nombreCurso: nombreCurso,
        fecha: fecha,
        hora: hora,
        imparte: imparte,
        cupo: cupo,
        estatusCupo: estatusCupo,
        estatusCurso: estatusCurso,
        modalidad: modalidad,
        direccion: direccion,
        correoSeguimiento: 'cursos.ivai@gmail.com',
        tipo: tipoCurso,
        curso: curso,
        ligaTeams: ligaTeams,
        valorCurricular: valorCurricular,
        idCurso: window.localStorage.getItem('id')
    });

    const getTiposCurso = async () => {
        try {
            const response = await fetch(`${API_URL}tipos`);
            const data = await response.json();
            setDataTiposCurso(data);
        } catch (error) {
            console.error('Error al obtener los tipos de curso:', error);
        }
    };

    useEffect(() => {
        const fetchTiposCurso = async () => {
            getTiposCurso();
        };

        fetchTiposCurso();
    }, []);

    const validateFields = () => {
        const newErrors = {};

        if (!formData.nombreCurso) newErrors.nombreCurso = "El nombre es obligatorio.";
        if (!formData.fecha) newErrors.fecha = "La fecha es obligatoria.";
        if (!formData.hora) newErrors.hora = "La hora es obligatoria.";
        if (!formData.imparte || formData.imparte.trim() === '') newErrors.imparte = "La persona que imparte el curso es obligatoria.";
        if (!formData.estatusCurso) newErrors.estatusCurso = "El estado del curso es obligatorio.";
        if (!formData.modalidad) newErrors.modalidad = "La modalidad es obligatoria.";
        if (!formData.tipo) newErrors.tipo = "El tipo de curso es obligatorio.";
        if (!formData.curso) newErrors.curso = "El curso es obligatorio.";
        if (!formData.valorCurricular) newErrors.valorCurricular = "El valor curricular es obligatorio.";

        return newErrors;
    };

    const handleSubmit = async () => {
        let finalFormData = { ...formData };

        if (formData.modalidad === 'Presencial') {
            finalFormData.ligaTeams = '';
        } else if (formData.modalidad === 'Virtual') {
            finalFormData.direccion = '';
        }

        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await Axios.put(`${API_URL}actualizar`, finalFormData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            closePrev();
            onOpenPopupMsj();
        } catch (error) {
            console.error('Error al actualizar el curso:', error);
            setIsPopupOpen(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value,
        }))

        setErrors(errors => ({
            ...errors,
            [name]: '',
        }))
    };

    const handleChangeInputNumbers =(e) => {
        const { name, value } = e.target;
        const regex = /^[0-9\s]*$/

        if(regex.test(value) || value === "") {
            setFormData((formData) => ({
                ...formData,
                [name]: value
            }));
        }
    }

    const handleInputText = (e) => {
        const { name, value } = e.target;
        
        const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]*$/;
        
        if (regex.test(value) || value === "") { 
            setFormData((formData) => ({
                ...formData,
                [name]: value
            }));
    
            setErrors((errors) => ({
                ...errors,
                [name]: ''
            }));
        }
    };

    const handleDateInputClick = () => {
        dateInputRef.current.showPicker();
    };

    const handleTimeInputClick = () => {
        timeInputRef.current.showPicker();
    };

    const commonStyles = {
        backgroundColor: '#FFFFFF',
        borderRadius: '15px',
        marginTop: 1,
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
        },
    };

    return (
        <div className='layout_Modificar_Curso'>
            <header className="header_Modificar_Curso">
                <CardHeader
                    title={
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>

                            </Grid>
                            <Grid item>

                            </Grid>


                            <Grid item sx={{ alignItems: 'start' }}>
                                <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '4vh', marginBottom: 0, textAlign: 'center', maxWidth: 'auto', maxHeight: 'auto', paddingRight: '3vw' }}>
                                    Modificar Curso
                                </Typography>
                            </Grid>


                            <Grid item sx={{ marginRight: "1vw" }}>

                                <img
                                    src={Arrow}
                                    alt="Web"
                                    className='IconoSalir'
                                    onClick={() => {
                                        onClose();
                                    }}
                                />
                            </Grid>
                        </Grid>
                    }
                />
            </header>
            <main className="main_Modificar_Curso">
                <div className='ScrollRegistro2'>
                    <CardContent>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Nombre del Curso: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="nombreCurso"
                                    value={formData.nombreCurso}
                                    onChange={handleInputText}
                                    error={!!errors.nombreCurso}
                                    helperText={errors.nombreCurso}
                                    sx={commonStyles}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Fecha: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name='fecha'
                                    type='date'
                                    value={formData.fecha}
                                    inputRef={dateInputRef}
                                    onClick={handleDateInputClick}
                                    onChange={handleChange}
                                    error={!!errors.fecha}
                                    helperText={errors.fecha}
                                    sx={{
                                        backgroundColor: '#FFFFFF', marginTop: 1, borderRadius: '15px', width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Hora: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name='hora'
                                    type='time'
                                    value={formData.hora}
                                    inputRef={timeInputRef}
                                    onClick={handleTimeInputClick}
                                    onChange={handleChange}
                                    error={!!errors.hora}
                                    helperText={errors.hora}
                                    sx={{
                                        backgroundColor: '#FFFFFF', marginTop: 1, borderRadius: '15px', width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Modalidad: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    name='modalidad'
                                    value={formData.modalidad}
                                    onChange={handleChange}
                                    error={!!errors.modalidad}
                                    helperText={errors.modalidad}
                                    sx={commonStyles}>
                                    <MenuItem value='Presencial'>Presencial</MenuItem>
                                    <MenuItem value='Virtual'>Virtual</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        {formData.modalidad === 'Presencial' && (
                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                        Direccion: *
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        value={formData.direccion}
                                        name='direccion'
                                        onChange={handleChange}
                                        sx={commonStyles}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {formData.modalidad === 'Virtual' && (
                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                        Liga Teams: *
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        value={formData.ligaTeams}
                                        name='ligaTeams'
                                        onChange={handleChange}
                                        sx={commonStyles}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Persona que Imparte el Curso: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="imparte"
                                    value={formData.imparte}
                                    error={!!errors.imparte}
                                    helperText={errors.imparte}
                                    onChange={handleInputText}
                                    sx={commonStyles}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Lugares Disponibles: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="cupo"
                                    value={formData.cupo}
                                    onChange={handleChangeInputNumbers}
                                    sx={commonStyles}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Correo de Seguimiento: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="cursos.ivai@gmail.com"
                                    disabled
                                    size="small"
                                    name="correoSeguimiento"
                                    value={formData.correoSeguimiento}
                                    sx={commonStyles}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Estatus del Curso: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="estatusCurso"
                                    value={formData.estatusCurso}
                                    onChange={handleChange}
                                    sx={commonStyles}
                                >
                                    <MenuItem value="Activo">Activo</MenuItem>
                                    <MenuItem value="Finalizado">Finalizado</MenuItem>
                                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Tipo del Curso: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                    sx={commonStyles}
                                >
                                    {['Conferencia', 'Curso', 'Foro', 'Jornada', 'Taller', 'Segundo Trimestre 2017', 'Otro'].map((tipo) => (
                                        <MenuItem key={tipo} value={tipo}>
                                            {tipo}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Curso: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="curso"
                                    value={formData.curso}
                                    onChange={handleChange}
                                    sx={commonStyles}
                                >
                                    {dataTiposCurso.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '2vh', fontWeight: 'bold' }}>
                                    Valor Curricular en Horas: *
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="valorCurricular"
                                    value={formData.valorCurricular}
                                    // error={!!errors.valorCurricular}
                                    // helperText={errors.valorCurricular}
                                    onChange={handleChange}
                                    sx={commonStyles}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </div>
            </main>
            <footer className="footer_Modificar_Curso">
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            width: '10vw',
                            backgroundColor: '#E7B756',
                            color: '#1E1E1E',
                            marginTop: 2,
                        }}
                    >
                        Guardar
                    </Button>
                </CardActions>
            </footer>
        </div>
    );

}

export default ModificarCurso;