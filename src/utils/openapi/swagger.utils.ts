// Path: src/utils/openapi/https/https-swagger.utils.ts
// DESC: This file contains the utility functions for the HTTPS Swagger UI.
'use strict';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as YAML from 'yaml';
import {
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_NAME,
  SWAGGER_API_ROOT,
} from './swagger.constant';

export async function setupSwagger(app: INestApplication, host: string, port: number) {
  // Create options for the Swagger document
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .setContact('name', 'url', 'email')
    .build();

  // Generate the Swagger document
  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

  // Customize the Swagger document to include user input for host and port
  const swaggerCustomizationOptions = {
    swaggerOptions: {
      servers: [
        {
          url: '{protocol}://{host}:{port}',
          variables: {
            protocol: {
              enum: ['http', 'https'],
              default: 'https',
            },
            host: {
              default: host,
            },
            port: {
              default: port,
            },
          },
        },
      ],
      swaggerOptions: {
        docExpansion: 'none',
      },
    },
    explorer: true,
    swaggerPath: 'https-api-docs',
    swaggerDocument: document,
  };

  const dir: string = SWAGGER_API_ROOT;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save the Swagger JSON document to a file
  fs.writeFileSync(`${dir}/api-doc.json`, JSON.stringify(document));
  fs.writeFileSync(`${dir}/api-doc.yaml`, YAML.stringify(document, {}));

  // Configure Swagger to serve the document at the specified route
  SwaggerModule.setup(dir, app, document, swaggerCustomizationOptions);

  return document;
}
