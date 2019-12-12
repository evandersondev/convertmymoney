const api = require("./api.bcb");
const axios = require("axios");

jest.mock("axios");

test("getCotacaoApi", () => {
  const res = {
    data: {
      value: [{ cotacaoVenda: 3.9 }]
    }
  };
  axios.get.mockResolvedValue(res);
  api.getCotacaoApi("url").then(resp => {
    expect(resp).toEqual(res);
    expect(axios.get.mock.calls[0][0]).toBe("url");
  });
});

test("extractCotacao", () => {
  const cotacao = api.extractCotacao({
    data: {
      value: [{ cotacaoVenda: 3.9 }]
    }
  });
  expect(cotacao).toBe(3.9);
});

describe("getToday", () => {
  const realDate = Date;

  function mockDate(date) {
    global.Date = class extends realDate {
      constructor() {
        return new realDate(date);
      }
    };
  }

  afterEach(() => {
    global.Date = realDate;
  });

  test("getToday", () => {
    mockDate("2019-01-01T12:00:00z");
    const today = api.getToday();
    expect(today).toBe("1-1-2019");
  });
});

test("getUrl", () => {
  const url = api.getUrl("MINHA-DATA");
  expect(url).toBe(
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao"
  );
});

test("getCotacao", () => {
  const res = {
    data: {
      value: [{ cotacaoVenda: 3.9 }]
    }
  };

  const getToday = jest.fn();
  getToday.mockReturnValue("01-01-2019");
  //_
  const getUrl = jest.fn();
  getUrl.mockReturnValue("url");
  //_
  const getCotacaoApi = jest.fn();
  getCotacaoApi.mockResolvedValue(res);
  //_
  const extractCotacao = jest.fn();
  extractCotacao.mockReturnValue(3.9);

  api.pure
    .getCotacao({ getToday, getUrl, getCotacaoApi, extractCotacao })()
    .then(res => {
      expect(res).toBe(3.9);
    });
});
