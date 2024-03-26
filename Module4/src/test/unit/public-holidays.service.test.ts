import axios from 'axios';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from '../../services/public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL } from '../../config';
import { NL_PUBLIC_HOLIDAYS } from '../test-data';
import { shortenPublicHoliday } from '../../helpers';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('unit tests', () => {

  describe('tests for getListOfPublicHolidays', () => {
    it('should return a list of shortened public holidays', async () => {
      const year = 2024;
      const country = 'NL';
      mockedAxios.get.mockResolvedValue({ data: NL_PUBLIC_HOLIDAYS });

      const result = await getListOfPublicHolidays(year, country);
      expect(result).toEqual(NL_PUBLIC_HOLIDAYS.map(holiday => shortenPublicHoliday(holiday)));
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    });

    it('should return an empty list if an error occurs', async () => {
      const year = 2024;
      const country = 'NL';
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      const result = await getListOfPublicHolidays(year, country);
      expect(result).toEqual([]);
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    });
  });

  describe('tests for checkIfTodayIsPublicHoliday', () => {
    it('should return true in case today is a public holiday', async () => {
      const country = 'NL';
      mockedAxios.get.mockResolvedValue({ status: 200 });

      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBeTruthy();
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    });

    it('should return false in case today is not a public holiday', async () => {
      const country = 'NL';
      mockedAxios.get.mockResolvedValue({ status: 204 });

      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBeFalsy();
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    });

    it('should return false in case of error', async () => {
      const country = 'NL';
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBeFalsy();
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    });
  });

  describe('tests for getNextPublicHolidays', () => {
    it('should return a list of next shortened public holidays', async () => {
      const country = 'NL';
      const halfYearHolidays = NL_PUBLIC_HOLIDAYS.slice(5);
      mockedAxios.get.mockResolvedValue({ data: halfYearHolidays });

      const result = await getNextPublicHolidays(country);
      expect (result.length).toBe(6);
      expect(result).toEqual(halfYearHolidays.map(holiday => shortenPublicHoliday(holiday)));
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
    });

    it('should return an empty list if an error occurs', async () => {
      const country = 'NL';
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      const result = await getNextPublicHolidays(country);
      expect(result).toEqual([]);
      expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

