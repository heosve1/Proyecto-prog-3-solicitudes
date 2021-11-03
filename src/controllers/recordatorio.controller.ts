import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Recordatorio,NotificacionCorreo} from '../models';
import {RecordatorioRepository,EvaluacionsolicitudRepository,ResultadosolicitudRepository,JuradoRepository,SolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';
export class RecordatorioController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository : RecordatorioRepository,
    @repository(EvaluacionsolicitudRepository)
    public evaluacionsolicitudRepository : EvaluacionsolicitudRepository,
    @repository(ResultadosolicitudRepository)
    public resultadosolicitudRepository : ResultadosolicitudRepository,
    @repository(JuradoRepository)
    public juradoRepository : JuradoRepository,
    @repository(SolicitudRepository)
    public solicitudRepository : SolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) {}

  @post('/recordatorios')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recordatorio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {
            title: 'NewRecordatorio',
            exclude: ['id'],
          }),
        },
      },
    })
    recordatorio: Omit<Recordatorio, 'id'>,
  ): Promise<void> {//Se cambia el promise <recordatorio> por un void para poder no realizar el post con return
    let resultado= await this.resultadosolicitudRepository.findById(recordatorio.id_resultadosolicitud);
    let evaluacion= await this.evaluacionsolicitudRepository.findById(recordatorio.id_evaluacionsolicitud);
    let solicitud= await this.solicitudRepository.findById(evaluacion.id_solicitud)
    let jurado=await this.juradoRepository.findById(evaluacion.id_jurado)
    if (resultado.resultado=="Sin calificar"){
      if(evaluacion.respuesta=="Aceptado"){
      if (jurado && solicitud) {
        let notificacionJurado = new NotificacionCorreo();
        notificacionJurado.destinatario = jurado.correo;
        notificacionJurado.asunto = "Recordatorio Solicitud";
        notificacionJurado.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${jurado.nombre}</h1><br /> ${recordatorio.resumen} ${solicitud.nombre_trabajo} `
        this.servicioNotificaciones.EnviarCorreo(notificacionJurado)
        console.log("Se ha notificado al jurado con exito")
      }
         await this.recordatorioRepository.create(recordatorio);//Se cambia el return por el await
      }
    }
  }

  @get('/recordatorios/count')
  @response(200, {
    description: 'Recordatorio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recordatorio) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.recordatorioRepository.count(where);
  }

  @get('/recordatorios')
  @response(200, {
    description: 'Array of Recordatorio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recordatorio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recordatorio) filter?: Filter<Recordatorio>,
  ): Promise<Recordatorio[]> {
    return this.recordatorioRepository.find(filter);
  }

  @patch('/recordatorios')
  @response(200, {
    description: 'Recordatorio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Recordatorio,
    @param.where(Recordatorio) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.recordatorioRepository.updateAll(recordatorio, where);
  }

  @get('/recordatorios/{id}')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recordatorio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recordatorio, {exclude: 'where'}) filter?: FilterExcludingWhere<Recordatorio>
  ): Promise<Recordatorio> {
    return this.recordatorioRepository.findById(id, filter);
  }

  @patch('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Recordatorio,
  ): Promise<void> {
    await this.recordatorioRepository.updateById(id, recordatorio);
  }

  @put('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recordatorio: Recordatorio,
  ): Promise<void> {
    await this.recordatorioRepository.replaceById(id, recordatorio);
  }

  @del('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recordatorioRepository.deleteById(id);
  }

}
