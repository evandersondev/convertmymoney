const axios = require("axios");

const getUrl = data =>
  `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

const getCotacaoApi = url => axios.get(url);
const extractCotacao = res => res.data.value[0].cotacaoVenda;
const getToday = () => {
  const today = new Date();
  return (
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear()
  );
};
const getCotacao = ({
  getToday,
  getUrl,
  getCotacaoApi,
  extractCotacao
}) => async () => {
  try {
    const today = getToday();
    const url = getUrl(today);
    const res = await getCotacaoApi(url);
    const cotacao = extractCotacao(res);
    return cotacao;
  } catch (err) {
    return "";
  }
};

module.exports = {
  getCotacaoApi,
  getCotacao: getCotacao({ getToday, getUrl, getCotacaoApi, extractCotacao }),
  extractCotacao,
  getToday,
  getUrl,
  pure: {
    getCotacao
  }
};
