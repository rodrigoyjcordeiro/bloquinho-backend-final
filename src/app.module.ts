/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

// 🔥 Logs detalhados
mongoose.set('debug', true);
mongoose.set('strictQuery', false);

const MONGO_URI =
  'mongodb://rodrigoyjcordeiro_db_user:hAzZcfmp9NFtgGNC@ac-dcnduum-shard-00-00.gvu0blw.mongodb.net:27017,ac-dcnduum-shard-00-01.gvu0blw.mongodb.net:27017,ac-dcnduum-shard-00-02.gvu0blw.mongodb.net:27017/?ssl=true&replicaSet=atlas-jr7kh6-shard-0&authSource=admin&appName=bloquinhodb';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, {
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
