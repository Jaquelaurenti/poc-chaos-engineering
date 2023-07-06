## Chaos Engineering POC - Aplicação Node.js

A POC consiste em introduzir diferentes cenários de falhas controladas na aplicação para testar sua resiliência. A aplicação utiliza o framework Express.js e pode ser facilmente testada e executada localmente.

### Rotas e Cenários de Teste
A aplicação possui as seguintes rotas, cada uma correspondendo a um cenário de teste de Chaos Engineering:

#### Rota: / (GET)

Descrição: Retorna uma mensagem de "Hello, World!".
Aplicação: Esta é uma rota de teste básica para verificar se a aplicação está em execução corretamente.

#### Rota: /delay (GET)

Descrição: Introduz um atraso de 5 segundos na resposta.
Aplicação: Esse cenário simula um atraso na resposta do servidor, testando a capacidade da aplicação de lidar com atrasos na comunicação.

#### Rota: /error (GET)

Descrição: Retorna um erro 500 (Internal Server Error).
Aplicação: Este cenário simula uma falha interna na aplicação, permitindo testar a capacidade da aplicação de lidar com erros e fornecer uma resposta adequada.

#### Rota: /database-read (GET)

Descrição: Simula uma leitura no banco de dados MongoDB e introduz uma falha simulada na conexão com o banco de dados.
Aplicação: Este cenário testa a resiliência da aplicação em relação a falhas na conexão com o banco de dados.

#### Rota: /database-write (GET)

Descrição: Simula uma gravação no banco de dados MongoDB e introduz uma falha simulada na conexão com o banco de dados.
Aplicação: Este cenário testa a resiliência da aplicação em relação a falhas na conexão com o banco de dados.

#### Rota: /external-api (GET)

#### Rota: /slow (GET)

#### Pilares do Chaos Engineering abordado nessa POC


- Introdução de Atraso: A rota /delay introduz um atraso de 5 segundos na resposta, simulando um cenário em que a comunicação com o servidor é lenta. Isso permite testar a capacidade daaplicação de lidar com atrasos e garantir uma resposta adequada aos clientes.

- Introdução de Erro: A rota /error retorna um erro 500 (Internal Server Error), simulando uma falha interna na aplicação. Esse cenário permite testar a capacidade da aplicação de lidar com erros e fornecer uma resposta apropriada, como uma página de erro personalizada ou uma mensagem informativa.

- Introdução de Falha no Banco de Dados: As rotas /database-read e /database-write simulam falhas na conexão com o banco de dados MongoDB. Esses cenários permitem testar a resiliência da aplicação em relação a falhas de conexão com o banco de dados, garantindo que a aplicação possa lidar adequadamente com essas situações e fornecer uma resposta apropriada aos clientes.

### Libs de apoio

Delay: A biblioteca "delay" permite introduzir atrasos ou pausas em sua aplicação. Ela é útil para simular atrasos na execução de tarefas ou operações, como atrasar uma resposta HTTP ou pausar um código por um determinado período de tempo. A biblioteca "delay" pode ser utilizada para testar o comportamento da aplicação em situações de latência ou lentidão na comunicação.

Loadtest: A biblioteca "loadtest" é utilizada para realizar testes de carga em aplicações web. Ela permite simular uma carga de requisições intensiva para verificar o desempenho e a escalabilidade da aplicação sob carga máxima. Com o "loadtest", é possível especificar a taxa de requisições, o número de usuários virtuais e outros parâmetros para avaliar o comportamento da aplicação sob estresse.

Throttle: A biblioteca "throttle" é utilizada para controlar a taxa de requisições em uma aplicação. Ela permite definir limites para o número de requisições por segundo que a aplicação pode processar. Com o "throttle", é possível evitar picos de tráfego e proteger a aplicação contra sobrecarga.

Artillery:  é uma poderosa ferramenta de teste de carga e desempenho para aplicações web. Ele permite que você simule cargas de tráfego realistas e avalie o desempenho da sua aplicação em diferentes cenários. O Artillery é altamente configurável e fácil de usar, e pode ser integrado facilmente a fluxos de trabalho de automação.


### Passo a passo do main.tf