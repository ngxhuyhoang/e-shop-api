import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { JwtAuthGuard } from '~/guards/jwt-auth.guard';
import { TransformInterceptor } from '~/interceptors/transform.interceptor';
import { AppModule } from './app.module';

const apiDocumentationCredentials = {
  name: 'admin',
  pass: 'Houzerd1@',
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
  });
  const httpAdapter = app.getHttpAdapter();

  httpAdapter.use('/docs', (req, res, next) => {
    const parseAuthHeader = (input: string): { name: string; pass: string } => {
      const [, encodedPart] = input.split(' ');
      const buff = Buffer.from(encodedPart, 'base64');
      const text = buff.toString('ascii');
      const [name, pass] = text.split(':');
      return { name, pass };
    };

    const unauthorizedResponse = () => {
      res.status(401);
      res.set('WWW-Authenticate', 'Basic');
      next();
    };

    if (!req.headers.authorization) {
      return unauthorizedResponse();
    }

    const credentials = parseAuthHeader(req.headers.authorization);
    if (
      credentials?.name !== apiDocumentationCredentials.name ||
      credentials?.pass !== apiDocumentationCredentials.pass
    ) {
      return unauthorizedResponse();
    }
    next();
  });

  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const nodeEnv = configService.get('NODE_ENV');

  app.enableCors();
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map(
          (error) => error.constraints[Object.keys(error.constraints)[0]],
        );
        const messageJoined = result.join(', ');
        return new BadRequestException(messageJoined);
      },
    }),
  );
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  const config = new DocumentBuilder()
    .setTitle('EShop API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      // Lưu lại authorization data và sẽ không bị mất khi refresh lại trang
      persistAuthorization: true,
    },
  });

  await app.listen(port, () => {
    console.info(`Environment: ${nodeEnv}`);
    console.info(`Server is running on port ${port}`);
    console.info(`OpenAPI Docs: http://localhost:${port}/docs`);
  });
}
bootstrap();
