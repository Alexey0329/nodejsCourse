import * as request from 'supertest'

const PUBLIC_HOLIDAYS_API_URL = 'https://date.nager.at/api/v3';

describe('Public Holidays API', () => {
  describe('/CountryInfo', () => {
    it('should return 200 and country info for the given country', async () => {
      const year = 2024;
      const country = 'NL';

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL)
        .get(`/CountryInfo/${country}`)

      expect(status).toEqual(200);
      expect(body).toEqual(
        expect.objectContaining(
          {
            commonName: expect.any(String),
            officialName: expect.any(String),
            countryCode: expect.any(String),
            region: expect.any(String),
            borders: expect.anything()
          })
      )
      expect(body.borders.length).toBe(2);
    });
  });

  describe('/PublicHolidays', () => {
    it('should return 200 and list of public holidays for the given year/country', async () => {
      const year = 2024;
      const country = 'NL';

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL)
        .get(`/PublicHolidays/${year}/${country}`)

      expect(status).toEqual(200);
      expect(body).toBeInstanceOf(Array);
      expect(body[0]).toEqual({
        date: expect.any(String),
        localName: expect.any(String),
        name: expect.any(String),
        countryCode: expect.any(String),
        fixed: expect.any(Boolean),
        global: expect.any(Boolean),
        counties: null,
        launchYear: null,
        types: expect.any(Array),
      });
      expect(body.length).toBe(11);
    });

    it('should return 400 in case of validation failure', async () => {
      const year = "NewYear";
      const country = 'NL';

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL)
        .get(`/PublicHolidays/${year}/${country}`)

      expect(status).toEqual(400);
      expect(body).toEqual(
        expect.objectContaining({ status: 400, errors: { year: ["The value 'NewYear' is not valid."] } })
      )
    });

    it('should return 404	for unknown country', async () => {
      const year = 2024;
      const country = 'UnknownCountry';

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL)
        .get(`/PublicHolidays/${year}/${country}`)

      expect(status).toEqual(404);
      expect(body).toEqual(
        expect.objectContaining({ status: 404, title: "Not Found" })
      )
    });
  });
});

