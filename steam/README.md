Simple API- Implemented basic CRUD

Learn: 
1 - nest g resource
        Cria os endpoints automagicamente para tudo menos update
        For more information: https://docs.nestjs.com/recipes/crud-generator

2 - Em app.module imports: [ TypeOrmModule.forRoot({ ...
        Usar autoLoadEntities: true simplifica o codigo e deixa de ser necessário uma nova linha para cada entidade
        For more information: https://docs.nestjs.com/techniques/database#auto-load-entities
        
2.1 - Existe autoLoadModels: true apenas funcionar para Sequelize Integration (Não foi implementado)
        For more information:https://docs.nestjs.com/techniques/database#sequelize-integration
