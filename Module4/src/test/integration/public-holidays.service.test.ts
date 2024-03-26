import axios from 'axios';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from '../../services/public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL } from '../../config';
import { NL_PUBLIC_HOLIDAYS } from '../test-data';
import { shortenPublicHoliday } from '../../helpers';


describe('integration tests', () => {

  const axiosGetSpy = jest.spyOn(axios, 'get');

  it('should return a list of shortened public holidays', async () => {
    const year = 2024;
    const country = 'NL';
    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual(NL_PUBLIC_HOLIDAYS.map(holiday => shortenPublicHoliday(holiday)));
    expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
  });


  it('should return true or false and have been called for the specified country', async () => {
    const country = 'NL'; 
    const result = await checkIfTodayIsPublicHoliday(country);

    expect(typeof result).toBe('boolean');
    expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
  });


  it('should return an array and have been called for the specified country', async () => {
    const country = 'NL';
    const result = await getNextPublicHolidays(country);

    expect(result).toBeInstanceOf(Array);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
  });


});

