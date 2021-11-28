// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as llaves} from '../config/keys';
import {Archivo, Foto} from '../models';
import {ArchivoRepository, FotoRepository} from '../repositories';


export class CargaArchivosController {
  constructor(
    @repository(FotoRepository)
    private fotoRepository: FotoRepository,
    @repository(ArchivoRepository)
    private archivoRepository: ArchivoRepository

  ) { }



  @post('/CargarImagenProponente/{id_proponente}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen de la persona.',
      },
    },
  })
  async cargarImagenProponente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("id_proponente") id: number
  ): Promise<object | false> {
    const rutaImagenProponente = path.join(__dirname, llaves.carpetaImagenProponente);
    let res = await this.StoreFileToPath(rutaImagenProponente, llaves.nombreCampoImagenProponente, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let foto = new Foto()
        foto.id_proponente = id
        foto.nombre = nombre_archivo
        await this.fotoRepository.save(foto);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }





  @post('/CargarFotografiaProponente', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la fotografia de la persona.',
      },
    },
  })
  async cargarFotografiaProponente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaImagenProponente = path.join(__dirname, llaves.carpetaImagenProponente);
    let res = await this.StoreFileToPath(rutaImagenProponente, llaves.nombreCampoImagenProponente, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarArchivoSolicitud/{id_solicitud}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de archivos a la solicitud.',
      },
    },
  })
  async DocumentosPersona(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("id_solicitud") id: number
  ): Promise<object | false> {
    const rutaDocumentoPersona = path.join(__dirname, llaves.carpetaDocumentoSolicitud);
    let res = await this.StoreFileToPath(rutaDocumentoPersona, llaves.nombreCampoDocumentoProponente, request, response, llaves.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let archivo = new Archivo()
        archivo.id_solicitud = id
        archivo.nombre = nombre_archivo
        await this.archivoRepository.save(archivo);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }


  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: llaves.tamMaxImagenProponente
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}
