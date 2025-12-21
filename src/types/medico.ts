export interface SolicitudConsulta {
  id: string;
  fechaSolicitud: Date;
  datosPersonales: DatosPersonales;
  motivoConsulta: MotivoConsulta;
  antecedentesMedicos: AntecedentesMedicos;
  contacto: DatosContacto;
  estado: EstadoSolicitud;
  notas?: string;
}

export interface DatosPersonales {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: 'masculino' | 'femenino' | 'otro';
  documentoIdentidad: string;
  tipoDocumento: 'cedula' | 'pasaporte' | 'otro';
}

export interface MotivoConsulta {
  especialidad: EspecialidadMedica;
  sintomas: string;
  tiempoEvolucion: string;
  urgencia: NivelUrgencia;
  descripcionDetallada: string;
}

export interface AntecedentesMedicos {
  alergias: string;
  medicamentosActuales: string;
  cirugiasPrevias: string;
  enfermedadesCronicas: string;
  antecedenteFamiliar: string;
}

export interface DatosContacto {
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  preferenciaContacto: 'telefono' | 'email' | 'whatsapp';
}

export type EstadoSolicitud = 
  | 'pendiente' 
  | 'en_revision' 
  | 'contactado' 
  | 'cita_agendada' 
  | 'completado' 
  | 'cancelado';

export type EspecialidadMedica = 
  | 'medicina_general'
  | 'cardiologia'
  | 'dermatologia'
  | 'ginecologia'
  | 'pediatria'
  | 'neurologia'
  | 'traumatologia'
  | 'psiquiatria'
  | 'oftalmologia'
  | 'otorrinolaringologia'
  | 'urologia'
  | 'endocrinologia';

export type NivelUrgencia = 'baja' | 'media' | 'alta' | 'urgente';