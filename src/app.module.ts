/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';

mongoose.set('debug', true);
mongoose.set('strictQuery', false);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string, {
      connectionFactory: (connection) => {
        console.log('🔥 connectionFactory executado');

        connection.on('connecting', () => {
          console.log('⏳ Tentando conectar ao MongoDB...');
        });

        connection.on('connected', () => {
          console.log('✅ Mongoose conectado ao MongoDB!');
        });

        connection.on('error', (err) => {
          console.error('❌ Erro na conexão Mongoose:', err);
        });

        connection.on('disconnected', () => {
          console.warn('⚠️ Mongoose desconectado do MongoDB!');
        });

        return connection;
      },
    }),

    UserModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
