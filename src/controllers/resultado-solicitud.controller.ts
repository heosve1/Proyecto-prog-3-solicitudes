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
import {NotificacionCorreo, Resultadosolicitud} from '../models';
import {EvaluacionsolicitudRepository, JuradoRepository, ProponenteRepository, ResultadosolicitudRepository, SolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class ResultadoSolicitudController {
  constructor(
    @repository(ResultadosolicitudRepository)
    public resultadosolicitudRepository: ResultadosolicitudRepository,
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(EvaluacionsolicitudRepository)
    public evaluacionRepository: EvaluacionsolicitudRepository,
    @repository(JuradoRepository)
    public juradoreRepository: JuradoRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService
  ) { }

  @post('/resultadosolicitudes')
  @response(200, {
    description: 'Resultadosolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Resultadosolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {
            title: 'NewResultadosolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    resultadosolicitud: Omit<Resultadosolicitud, 'id'>,
  ): Promise<Resultadosolicitud> {
    let Evaluacionsolicitud = await this.evaluacionRepository.findById(resultadosolicitud.id_evaluacionsolicitud);
    let jurado = await this.juradoreRepository.findById(Evaluacionsolicitud.id_jurado);
    let solicitud = await this.solicitudRepository.findById(Evaluacionsolicitud.id_solicitud);
    let proponente = await this.proponenteRepository.findById(solicitud.id_proponente)

    if (Evaluacionsolicitud && jurado && solicitud && proponente) {
      let notificacionJurado = new NotificacionCorreo();
      notificacionJurado.destinatario = jurado.correo;
      notificacionJurado.asunto = "Evaluacion Solicitud";
      notificacionJurado.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${jurado.nombre}</h1></strong><br /> Has Calificado el trabajo <strong>${solicitud.nombre_trabajo}</strong>, a nombre de ${proponente.primer_nombre} ${proponente.primer_apellido}.`
      this.servicioNotificaciones.EnviarCorreo(notificacionJurado)
      console.log("Se ha notificado al jurado con exito")

      let notificacionProponente = new NotificacionCorreo();
      notificacionProponente.destinatario = jurado.correo;
      notificacionProponente.asunto = "Resultado Solicitud";
      notificacionProponente.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${proponente.primer_nombre}</h1></strong><br /> Tu solicitud <strong>${solicitud.nombre_trabajo}</strong>, a sido califcado por  ${jurado.nombre} ${jurado.apellidos}.<br /> Tu nota a sido ${resultadosolicitud.resultado}.`
      this.servicioNotificaciones.EnviarCorreo(notificacionProponente)
      console.log("Se ha notificado al proponente con exito")
    }
    return this.resultadosolicitudRepository.create(resultadosolicitud);
  }

  @get('/resultadosolicitudes/count')
  @response(200, {
    description: 'Resultadosolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Resultadosolicitud) where?: Where<Resultadosolicitud>,
  ): Promise<Count> {
    return this.resultadosolicitudRepository.count(where);
  }

  @get('/resultadosolicitudes')
  @response(200, {
    description: 'Array of Resultadosolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Resultadosolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Resultadosolicitud) filter?: Filter<Resultadosolicitud>,
  ): Promise<Resultadosolicitud[]> {
    return this.resultadosolicitudRepository.find(filter);
  }

  @patch('/resultadosolicitudes')
  @response(200, {
    description: 'Resultadosolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {partial: true}),
        },
      },
    })
    resultadosolicitud: Resultadosolicitud,
    @param.where(Resultadosolicitud) where?: Where<Resultadosolicitud>,
  ): Promise<Count> {
    return this.resultadosolicitudRepository.updateAll(resultadosolicitud, where);
  }

  @get('/resultadosolicitudes/{id}')
  @response(200, {
    description: 'Resultadosolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Resultadosolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Resultadosolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Resultadosolicitud>
  ): Promise<Resultadosolicitud> {
    return this.resultadosolicitudRepository.findById(id, filter);
  }

  @patch('/resultadosolicitudes/{id}')
  @response(204, {
    description: 'Resultadosolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultadosolicitud, {partial: true}),
        },
      },
    })
    resultadosolicitud: Resultadosolicitud,
  ): Promise<void> {
    await this.resultadosolicitudRepository.updateById(id, resultadosolicitud);
  }

  @put('/resultadosolicitudes/{id}')
  @response(204, {
    description: 'Resultadosolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resultadosolicitud: Resultadosolicitud,
  ): Promise<void> {
    await this.resultadosolicitudRepository.replaceById(id, resultadosolicitud);
  }

  @del('/resultadosolicitudes/{id}')
  @response(204, {
    description: 'Resultadosolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultadosolicitudRepository.deleteById(id);
  }
}
