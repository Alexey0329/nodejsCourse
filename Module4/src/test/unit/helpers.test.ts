import { shortenPublicHoliday, validateInput } from '../../helpers';

describe('validateInput', () => {
  it('should return true when valid input is provided', () => {
    const input = {
      year: 2024,
      country: 'NL',
    };

    const result = validateInput(input);

    expect(result).toBe(true);
  });

  it('should throw an error when an unsupported country is provided', () => {
    const input = {
      year: 2024,
      country: 'InvalidCountry',
    };

    expect(() => validateInput(input)).toThrow('Country provided is not supported, received: InvalidCountry');
  });

  it('should throw an error when an invalid year is provided', () => {
    const input = {
      year: 2021,
      country: 'NL',
    };

    expect(() => validateInput(input)).toThrow('Year provided not the current, received: 2021');
  });

  it('should return a shortened public holiday', () => {
    const holiday = 	{
      "date": "2024-03-29",
      "localName": "Goede Vrijdag",
      "name": "Good Friday",
      "countryCode": "NL",
      "fixed": false,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": [
        "Public"
      ]
    }
    const result = shortenPublicHoliday(holiday);

    expect(result).toEqual({
      name: "Good Friday",
      localName: 'Goede Vrijdag',
      date: '2024-03-29',
    });
  });
});


