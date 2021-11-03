import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {NotificacionCorreo, Solicitud} from '../models';
import {ProponenteRepository, SolicitudRepository,EvaluacionsolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class SolicitudController {
  constructor(
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(SolicitudRepository)
    public evaluacionsolicitudRepository: EvaluacionsolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService
  ) { }

  @post('/solicitudes')
  @response(200, {
    description: 'Solicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    let proponente = await this.proponenteRepository.findById(solicitud.id_proponente);
    if (proponente) {
      let notificacion = new NotificacionCorreo();
      notificacion.destinatario = proponente.correo;
      notificacion.asunto = "Envio Solicitud";
      notificacion.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${proponente.primer_nombre}</h1></strong><br /> Su trabajo <strong>${solicitud.nombre_trabajo}</strong>, se ha subido a la plataforma con exito. <br /> Será notificado con actualizaciones proximamente.<br /><br />Fecha:${solicitud.fecha}`
      this.servicioNotificaciones.EnviarCorreo(notificacion)
      console.log("Se ha notificado al usuario con exito")
    }
    return this.solicitudRepository.create(solicitud);

  }

  @get('/solicitudes/count')
  @response(200, {
    description: 'Solicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.count(where);
  }

  @get('/solicitudes')
  @response(200, {
    description: 'Array of Solicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solicitud) filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.solicitudRepository.find(filter);
  }

  @patch('/solicitudes')
  @response(200, {
    description: 'Solicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Solicitud,
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.updateAll(solicitud, where);
  }

  @get('/solicitudes/{id}')
  @response(200, {
    description: 'Solicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Solicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Solicitud>
  ): Promise<Solicitud> {
    return this.solicitudRepository.findById(id, filter);
  }

  @patch('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Solicitud,
  ): Promise<void> {
    await this.solicitudRepository.updateById(id, solicitud);
  }

  @put('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitud: Solicitud,
  ): Promise<void> {
    await this.solicitudRepository.replaceById(id, solicitud);
  }

  @del('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudRepository.deleteById(id);
  }
}
