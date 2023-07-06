const xlsx = require('xlsx');

module.exports = {
  initialize: (options, testContext) => {
    // Inicializar as variáveis para armazenar as métricas
    testContext.metrics = [];
  },

  capture: (options, event, testContext) => {
    if (event.type === 'stats') {
      // Capturar as métricas relevantes
      const { timestamp, latency, rps, errors, scenario } = event.data;
      const metric = {
        timestamp: new Date(timestamp).toISOString(),
        scenario: { name: scenario.name },
        latency,
        rps,
        errors,
      };

      // Adicionar as métricas ao contexto do teste
      testContext.metrics.push(metric);
    }
  },

  teardown: (options, testContext) => {
    // Salvar as métricas em um arquivo XLS
    const workbook = xlsx.utils.book_new();
    const sheetName = 'Metrics';
    const worksheetData = [];

    // Converter as métricas em formato de matriz para o XLSX
    testContext.metrics.forEach((metric) => {
      const row = [
        metric.timestamp,
        metric.scenario.name,
        metric.latency.min,
        metric.latency.max,
        metric.latency.median,
        metric.rps.count,
        metric.errors.count,
      ];
      worksheetData.push(row);
    });

    // Criar a planilha do XLSX e adicionar os dados
    const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Salvar o arquivo XLS
    const xlsFilename = 'metrics.xlsx';
    xlsx.writeFile(workbook, xlsFilename);

    console.log(`As métricas foram salvas em ${xlsFilename}`);
  },
};
