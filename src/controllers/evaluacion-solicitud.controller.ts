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
import {Evaluacionsolicitud, NotificacionCorreo} from '../models';
import {EvaluacionsolicitudRepository, JuradoRepository, ProponenteRepository, SolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';


export class EvaluacionSolicitudController {
  constructor(
    @repository(EvaluacionsolicitudRepository)
    public evaluacionsolicitudRepository: EvaluacionsolicitudRepository,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository

  ) { }

  @post('/evaluacionsolicitudes')
  @response(200, {
    description: 'Evaluacionsolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Evaluacionsolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluacionsolicitud, {
            title: 'NewEvaluacionsolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    evaluacionsolicitud: Omit<Evaluacionsolicitud, 'id'>,
  ): Promise<Evaluacionsolicitud> {
    let jurado = await this.juradoRepository.findById(evaluacionsolicitud.id_jurado);
    let solicitud = await this.solicitudRepository.findById(evaluacionsolicitud.id_solicitud);
    if (jurado && solicitud) {
      let notificacion = new NotificacionCorreo();
      notificacion.destinatario = jurado.correo;
      notificacion.asunto = "Invitación Solicitud";
      notificacion.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${jurado.nombre}</h1></strong><br /> Se te ha hecho la solicitud de evaluar el trabajo <strong>${solicitud.nombre_trabajo}</strong>. <br /> Para aceptar evaluar este trabajo, ingresa al siguiente link: <a href="https://www.ucaldas.edu.co/portal/">Aceptar</a><br />Si deseas rechazar la evaluación, ingresa al siguiente link: <a href="https://tenor.com/view/shitpost-gun-gif-21896048">Rechazar</a> <br />Fecha:${solicitud.fecha}`
      this.servicioNotificaciones.EnviarCorreo(notificacion)
      console.log("Se ha notificado al usuario con exito")
    }
    return this.evaluacionsolicitudRepository.create(evaluacionsolicitud);
  }

  @get('/evaluacionsolicitudes/count')
  @response(200, {
    description: 'Evaluacionsolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Evaluacionsolicitud) where?: Where<Evaluacionsolicitud>,
  ): Promise<Count> {
    return this.evaluacionsolicitudRepository.count(where);
  }

  @get('/evaluacionsolicitudes')
  @response(200, {
    description: 'Array of Evaluacionsolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Evaluacionsolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Evaluacionsolicitud) filter?: Filter<Evaluacionsolicitud>,

  ): Promise<Evaluacionsolicitud[]> {
    return this.evaluacionsolicitudRepository.find(filter);
  }

  @patch('/evaluacionsolicitudes')
  @response(200, {
    description: 'Evaluacionsolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluacionsolicitud, {partial: true}),
        },
      },
    })
    evaluacionsolicitud: Evaluacionsolicitud,
    @param.where(Evaluacionsolicitud) where?: Where<Evaluacionsolicitud>,

  ): Promise<Count> {
    return this.evaluacionsolicitudRepository.updateAll(evaluacionsolicitud, where);
  }

  @get('/evaluacionsolicitudes/{id}')
  @response(200, {
    description: 'Evaluacionsolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Evaluacionsolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,

    @param.filter(Evaluacionsolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Evaluacionsolicitud>
  ): Promise<Evaluacionsolicitud> {
    return this.evaluacionsolicitudRepository.findById(id, filter);
  }

  @patch('/evaluacionsolicitudes/{id}')
  @response(204, {
    description: 'Evaluacionsolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluacionsolicitud, {partial: true}),
        },
      },
    })
    evaluacionsolicitud: Evaluacionsolicitud,
  ): Promise<void> {
    await this.evaluacionsolicitudRepository.updateById(id, evaluacionsolicitud);
    let evaluacionsolicitud1 = await this.evaluacionsolicitudRepository.findById(id)
    let respuestaAntigua = "En proceso..."
    let respuestaNueva = evaluacionsolicitud1.respuesta
    let jurado = await this.juradoRepository.findById(evaluacionsolicitud1.id_jurado);
    let solicitud = await this.solicitudRepository.findById(evaluacionsolicitud1.id_solicitud);
    let proponente = await this.proponenteRepository.findById(solicitud.id_proponente);

    if (respuestaAntigua == "En proceso..." && respuestaNueva == "Aceptado") {

      if (jurado && solicitud && proponente) {
        let notificacionJurado = new NotificacionCorreo();
        notificacionJurado.destinatario = jurado.correo;
        notificacionJurado.asunto = "Evaluacion Solicitud";
        notificacionJurado.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${jurado.nombre}</h1></strong><br /> Has aceptado evaluar la solicitud del trabajo <strong>${solicitud.nombre_trabajo}</strong>, a nombre de ${proponente.primer_nombre} ${proponente.primer_apellido}. <br /> Para ir a la pagina de evaluacion, ingresa al siguiente link: <a href="https://tenor.com/view/bob-esponja-dancando-mt-gif-19768741">Evaluar</a><br /><br />Fecha:${evaluacionsolicitud.fecha_resultado}`
        this.servicioNotificaciones.EnviarCorreo(notificacionJurado)
        console.log("Se ha notificado al jurado con exito")

        let notificacionProponente = new NotificacionCorreo();
        notificacionProponente.destinatario = jurado.correo;
        notificacionProponente.asunto = "Solicitud Aceptada";
        notificacionProponente.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${proponente.primer_nombre}</h1></strong><br /> Tu solicitud <strong>${solicitud.nombre_trabajo}</strong>,ha sido aceptada y sera evaluada por el jurado ${jurado.nombre} ${jurado.apellidos}.<br /> Se te notificara del proceso de evaluacion proximamente.`
        this.servicioNotificaciones.EnviarCorreo(notificacionProponente)
        console.log("Se ha notificado al proponente con exito")
      }

    }

    if (respuestaAntigua == "En proceso..." && respuestaNueva == "Rechazado") {

      if (jurado && solicitud && proponente) {

        let notificacionJurado = new NotificacionCorreo();
        notificacionJurado.destinatario = jurado.correo;
        notificacionJurado.asunto = "Evaluacion Solicitud";
        notificacionJurado.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${jurado.nombre}</h1></strong><br /> Has rechazado evaluar la solicitud del trabajo <strong>${solicitud.nombre_trabajo}</strong>, a nombre de ${proponente.primer_nombre} ${proponente.primer_apellido}. <br /> Lamentamos que no puedieras evaluar esta solicitud, esperamos encarecidamente que nos ayudes a evaluar futuras solicitudes.`
        this.servicioNotificaciones.EnviarCorreo(notificacionJurado)
        console.log("Se ha notificado al jurado con exito")

        let notificacionProponente = new NotificacionCorreo();
        notificacionProponente.destinatario = jurado.correo;
        notificacionProponente.asunto = "Solicitud Rechazada";
        notificacionProponente.mensaje = `<strong><h1 style = "font-size:150%;">Hola ${proponente.primer_nombre}</h1></strong><br /> Tu solicitud <strong>${solicitud.nombre_trabajo}</strong>,fue rechazada por el jurado ${jurado.nombre} ${jurado.apellidos}.<br /> Se te notificara del proceso de evaluacion proximamente.`
        this.servicioNotificaciones.EnviarCorreo(notificacionProponente)
        console.log("Se ha notificado al proponente con exito")
      }

    }


  }

  @put('/evaluacionsolicitudes/{id}')
  @response(204, {
    description: 'Evaluacionsolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evaluacionsolicitud: Evaluacionsolicitud,
  ): Promise<void> {
    await this.evaluacionsolicitudRepository.replaceById(id, evaluacionsolicitud);
  }

  @del('/evaluacionsolicitudes/{id}')
  @response(204, {
    description: 'Evaluacionsolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evaluacionsolicitudRepository.deleteById(id);
  }
}
